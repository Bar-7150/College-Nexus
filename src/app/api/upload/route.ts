import { NextRequest, NextResponse } from "next/server";
import { uploadBufferToCloudinary, deleteFromCloudinary } from "@/lib/cloudinary";

export const dynamic = "force-dynamic";

/**
 * POST /api/upload
 * Next.js native Route Handler for Cloudinary file upload
 */
export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File | null;
    const folder = (formData.get("folder") as string) || "college-nexus/uploads";
    const customName = formData.get("custom_name") as string | null;

    if (!file) {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: "MISSING_FILE",
            message: "No file provided in form-data ('file').",
            timestamp: new Date().toISOString(),
            path: "/api/upload",
          },
        },
        { status: 400 }
      );
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const resourceType = file.type.startsWith("image/") ? "image" : "auto";

    const result = await uploadBufferToCloudinary(buffer, {
      folder,
      resource_type: resourceType,
      public_id: customName ? `${customName}-${Date.now()}` : undefined,
    });

    return NextResponse.json(
      {
        success: true,
        message: "File uploaded successfully to Cloudinary.",
        data: {
          url: result.secure_url,
          secure_url: result.secure_url,
          public_id: result.public_id,
          format: result.format,
          resource_type: result.resource_type,
          bytes: result.bytes,
          width: result.width || null,
          height: result.height || null,
          original_filename: file.name,
          created_at: result.created_at,
        },
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Next.js Cloudinary Upload Error:", error);

    const isPermissionError =
      error?.message && error.message.includes('actions=["create"]');

    return NextResponse.json(
      {
        success: false,
        error: {
          code: isPermissionError ? "CLOUDINARY_PERMISSION_DENIED" : "UPLOAD_FAILED",
          message: error?.message || "Failed to upload file to Cloudinary.",
          instruction: isPermissionError
            ? "Cloudinary Access Key lacks 'create' permission. In Cloudinary Console -> Settings -> Access Keys, edit this key to enable 'Create' / 'Write' permissions, or create an unsigned upload preset."
            : undefined,
          timestamp: new Date().toISOString(),
          path: "/api/upload",
        },
      },
      { status: error?.http_code || 500 }
    );
  }
}

/**
 * DELETE /api/upload
 * Deletes asset by public_id
 */
export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const publicId = searchParams.get("public_id");
    const resourceType = (searchParams.get("resource_type") as any) || "image";

    if (!publicId) {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: "MISSING_PUBLIC_ID",
            message: "Parameter 'public_id' is required for deletion.",
          },
        },
        { status: 400 }
      );
    }

    const result = await deleteFromCloudinary(publicId, resourceType);

    return NextResponse.json({
      success: true,
      message: `Asset '${publicId}' removed successfully.`,
      result: result.result,
    });
  } catch (error: any) {
    return NextResponse.json(
      {
        success: false,
        error: {
          code: "DELETE_FAILED",
          message: error?.message || "Failed to delete asset from Cloudinary.",
        },
      },
      { status: 500 }
    );
  }
}
