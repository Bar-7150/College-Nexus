import { NextRequest, NextResponse } from "next/server";
import { createHash } from "crypto";
import { deleteFromCloudinary, uploadBufferToCloudinary } from "@/lib/cloudinary";
import { createClient } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

const MAX_FILE_SIZE = 25 * 1024 * 1024;
const ALLOWED_TYPES = new Set([
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  "application/vnd.ms-powerpoint",
  "application/vnd.openxmlformats-officedocument.presentationml.presentation",
]);
const ALLOWED_DEPARTMENTS = new Set(["CSE", "ECE", "EE", "ME", "IT"]);
const ALLOWED_RESOURCE_TYPES = new Set(["NOTES", "PYQ", "SYLLABUS"]);

function errorResponse(code: string, message: string, status: number) {
  return NextResponse.json({ success: false, error: { code, message } }, { status });
}

export async function GET(request: NextRequest) {
  const supabase = await createClient();
  const searchParams = new URL(request.url).searchParams;
  const subjectCode = searchParams.get("subject_code")?.toUpperCase();
  const department = searchParams.get("department")?.toUpperCase();
  const semester = searchParams.get("semester");

  let query = supabase.from("vault_resources").select("*").order("created_at", { ascending: false });
  if (subjectCode) query = query.eq("subject_code", subjectCode);
  if (department && department !== "ALL" && ALLOWED_DEPARTMENTS.has(department)) {
    query = query.eq("department", department);
  }
  if (semester && Number(semester) >= 1 && Number(semester) <= 8) {
    query = query.eq("semester", Number(semester));
  }
  const { data, error } = await query;
  if (error) return errorResponse("DATABASE_READ_FAILED", error.message, 500);
  return NextResponse.json({ success: true, data: data || [] });
}

export async function POST(request: NextRequest) {
  const supabase = await createClient();
  const { data: { user }, error: userError } = await supabase.auth.getUser();

  if (userError || !user) {
    return NextResponse.json({ success: false, error: { code: "AUTH_REQUIRED", message: "Sign in before uploading a Vault resource." } }, { status: 401 });
  }

  try {
    const formData = await request.formData();
    const file = formData.get("file");
    const title = String(formData.get("title") || "").trim();
    const subjectCode = String(formData.get("subject_code") || "").trim().toUpperCase();
    const subjectName = String(formData.get("subject_name") || "").trim();
    const department = String(formData.get("department") || "").trim().toUpperCase();
    const semester = Number(formData.get("semester") || 0);
    const resourceType = String(formData.get("resource_type") || "NOTES").toUpperCase();

    if (!(file instanceof File) || !title || !subjectCode || !subjectName || !department || !semester) return errorResponse("INVALID_INPUT", "File, title, subject, department, and semester are required.", 400);
    if (file.size <= 0 || file.size > MAX_FILE_SIZE) return errorResponse("FILE_SIZE_INVALID", "Files must be between 1 byte and 25 MB.", 400);
    if (!ALLOWED_TYPES.has(file.type)) return errorResponse("FILE_TYPE_INVALID", "Only PDF, DOC, DOCX, PPT, and PPTX files are accepted.", 400);
    if (title.length > 180 || subjectCode.length > 30 || subjectName.length > 160) return errorResponse("FIELD_TOO_LONG", "One or more fields exceed the allowed length.", 400);
    if (!ALLOWED_DEPARTMENTS.has(department) || !Number.isInteger(semester) || semester < 1 || semester > 8) return errorResponse("ACADEMIC_TAXONOMY_INVALID", "Choose a valid department and semester.", 400);
    if (!ALLOWED_RESOURCE_TYPES.has(resourceType)) return errorResponse("RESOURCE_TYPE_INVALID", "Choose Notes, PYQ, or Syllabus.", 400);

    const bytes = Buffer.from(await file.arrayBuffer());
    const fileHash = createHash("sha256").update(bytes).digest("hex");
    const { data: duplicate } = await supabase.from("vault_resources").select("id").eq("file_hash", fileHash).maybeSingle();
    if (duplicate) return errorResponse("DUPLICATE_FILE", "This file has already been submitted to the Vault.", 409);

    const cloudinary = await uploadBufferToCloudinary(bytes, {
      folder: `college-nexus/vault/${department}/${semester}/${subjectCode}`,
      resource_type: "auto",
    });

    const { data: resource, error: insertError } = await supabase
      .from("vault_resources")
      .insert({
        title,
        subject_code: subjectCode,
        subject_name: subjectName,
        department,
        semester,
        resource_type: resourceType,
        contributor_id: user.id,
        contributor_name: user.user_metadata?.full_name || user.email?.split("@")[0] || "Student",
        contributor_roll: user.user_metadata?.roll_number || "",
        file_url: cloudinary.secure_url,
        cloudinary_public_id: cloudinary.public_id,
        file_size_bytes: cloudinary.bytes,
        file_hash: fileHash,
        is_cr_verified: false,
        status: "PENDING",
      })
      .select()
      .single();

    if (insertError) {
      await deleteFromCloudinary(cloudinary.public_id, cloudinary.resource_type === "image" ? "image" : "raw");
      return NextResponse.json({ success: false, error: { code: "DATABASE_INSERT_FAILED", message: insertError.message } }, { status: 500 });
    }

    return NextResponse.json({ success: true, data: resource }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: { code: "VAULT_UPLOAD_FAILED", message: error?.message || "Vault upload failed." } }, { status: 500 });
  }
}