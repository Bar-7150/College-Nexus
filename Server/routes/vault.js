const express = require("express");
const crypto = require("crypto");
const router = express.Router();
const upload = require("../middleware/upload");
const { requireAuth } = require("../middleware/auth");
const { getSupabaseAdmin } = require("../config/supabase");
const { uploadBufferToCloudinary, deleteFromCloudinary } = require("../config/cloudinary");

const ALLOWED_DEPARTMENTS = new Set(["CSE", "ECE", "EE", "ME", "IT"]);
const ALLOWED_RESOURCE_TYPES = new Set(["NOTES", "PYQ", "SYLLABUS"]);

router.get("/resources", requireAuth, async (req, res, next) => {
  try {
    const subjectCode = String(req.query.subject_code || "").trim().toUpperCase();
    const resourceId = String(req.query.id || "").trim();
    const supabase = getSupabaseAdmin();
    let query = supabase.from("vault_resources").select("*").order("created_at", { ascending: false });
    if (subjectCode) query = query.eq("subject_code", subjectCode);
    if (resourceId) query = query.eq("id", resourceId);
    const { data, error } = await query;
    if (error) return res.status(500).json({ success: false, error: { code: "DATABASE_READ_FAILED", message: error.message } });
    return res.json({ success: true, data: data || [] });
  } catch (error) {
    next(error);
  }
});

router.post("/resources", requireAuth, upload.single("file"), async (req, res, next) => {
  let cloudinaryAsset = null;
  try {
    const title = String(req.body.title || "").trim();
    const subjectCode = String(req.body.subject_code || "").trim().toUpperCase();
    const subjectName = String(req.body.subject_name || "").trim();
    const department = String(req.body.department || "").trim().toUpperCase();
    const semester = Number(req.body.semester || 0);
    const resourceType = String(req.body.resource_type || "NOTES").trim().toUpperCase();

    if (!req.file || !title || !subjectCode || !subjectName || !department || !semester) {
      return res.status(400).json({ success: false, error: { code: "INVALID_INPUT", message: "File, title, subject, department, and semester are required." } });
    }
    if (!ALLOWED_DEPARTMENTS.has(department) || !Number.isInteger(semester) || semester < 1 || semester > 8) {
      return res.status(400).json({ success: false, error: { code: "ACADEMIC_TAXONOMY_INVALID", message: "Choose a valid department and semester." } });
    }
    if (!ALLOWED_RESOURCE_TYPES.has(resourceType)) {
      return res.status(400).json({ success: false, error: { code: "RESOURCE_TYPE_INVALID", message: "Choose Notes, PYQ, or Syllabus." } });
    }

    const fileHash = crypto.createHash("sha256").update(req.file.buffer).digest("hex");
    const supabase = getSupabaseAdmin();
    const { data: duplicate } = await supabase.from("vault_resources").select("id").eq("file_hash", fileHash).maybeSingle();
    if (duplicate) return res.status(409).json({ success: false, error: { code: "DUPLICATE_FILE", message: "This file has already been submitted to the Vault." } });

    cloudinaryAsset = await uploadBufferToCloudinary(req.file.buffer, {
      folder: `college-nexus/vault/${department}/${semester}/${subjectCode}`,
      resource_type: "auto",
    });

    const { data: resource, error } = await supabase.from("vault_resources").insert({
      title,
      subject_code: subjectCode,
      subject_name: subjectName,
      department,
      semester,
      resource_type: resourceType,
      contributor_id: req.user.id,
      contributor_name: req.student.name,
      contributor_roll: req.student.rollNumber,
      file_url: cloudinaryAsset.secure_url,
      cloudinary_public_id: cloudinaryAsset.public_id,
      file_size_bytes: cloudinaryAsset.bytes,
      file_hash: fileHash,
      is_cr_verified: false,
      status: "PENDING",
    }).select().single();

    if (error) {
      await deleteFromCloudinary(cloudinaryAsset.public_id, "raw");
      return res.status(500).json({ success: false, error: { code: "DATABASE_INSERT_FAILED", message: error.message } });
    }
    return res.status(201).json({ success: true, data: resource });
  } catch (error) {
    if (cloudinaryAsset?.public_id) await deleteFromCloudinary(cloudinaryAsset.public_id, "raw").catch(() => undefined);
    next(error);
  }
});

router.delete("/resources/:id", requireAuth, async (req, res, next) => {
  try {
    const resourceId = req.params.id?.trim();
    if (!resourceId) {
      return res.status(400).json({ success: false, error: { code: "INVALID_INPUT", message: "Resource ID is required." } });
    }

    const supabase = getSupabaseAdmin();

    // Fetch the resource to verify ownership and get Cloudinary public_id
    const { data: resource, error: fetchError } = await supabase
      .from("vault_resources")
      .select("id, contributor_id, cloudinary_public_id, file_url")
      .eq("id", resourceId)
      .maybeSingle();

    if (fetchError) {
      return res.status(500).json({ success: false, error: { code: "DATABASE_READ_FAILED", message: fetchError.message } });
    }
    if (!resource) {
      return res.status(404).json({ success: false, error: { code: "NOT_FOUND", message: "Resource not found." } });
    }

    // Only the contributor who uploaded it can delete it
    if (resource.contributor_id !== req.user.id) {
      return res.status(403).json({ success: false, error: { code: "FORBIDDEN", message: "You can only delete resources you uploaded." } });
    }

    // Delete from Cloudinary first (best-effort — don't block DB delete if Cloudinary fails)
    if (resource.cloudinary_public_id) {
      await deleteFromCloudinary(resource.cloudinary_public_id, "raw").catch((err) =>
        console.warn(`⚠️ Cloudinary delete failed for ${resource.cloudinary_public_id}:`, err.message)
      );
    }

    // Delete from Supabase
    const { error: deleteError } = await supabase
      .from("vault_resources")
      .delete()
      .eq("id", resourceId);

    if (deleteError) {
      return res.status(500).json({ success: false, error: { code: "DATABASE_DELETE_FAILED", message: deleteError.message } });
    }

    return res.status(200).json({ success: true, message: "Resource deleted successfully from Vault and Cloudinary." });
  } catch (error) {
    next(error);
  }
});

module.exports = router;