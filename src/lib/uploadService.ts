/**
 * Frontend Cloudinary Upload Service
 * Handles uploading files to either the standalone Express server (http://localhost:5000)
 * or the native Next.js API route (/api/upload).
 */

export interface UploadResult {
  url: string;
  secure_url: string;
  public_id: string;
  format: string;
  resource_type: string;
  bytes: number;
  width?: number | null;
  height?: number | null;
  original_filename: string;
}

export interface UploadOptions {
  folder?: string;
  custom_name?: string;
  serverType?: "express" | "nextjs" | "auto";
}

const EXPRESS_SERVER_URL =
  process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:5000";

/**
 * Upload any image or document to Cloudinary
 */
export async function uploadToCloudinary(
  file: File,
  options: UploadOptions = {}
): Promise<{ success: boolean; data?: UploadResult; error?: string; instruction?: string }> {
  const formData = new FormData();
  formData.append("file", file);

  if (options.folder) {
    formData.append("folder", options.folder);
  }
  if (options.custom_name) {
    formData.append("custom_name", options.custom_name);
  }

  // Determine endpoint: prefer Express server if "express", or fallback to native Next.js "/api/upload"
  const preferredServer = options.serverType || "auto";

  let targetUrl = "/api/upload";
  if (preferredServer === "express") {
    targetUrl = `${EXPRESS_SERVER_URL}/api/upload`;
  }

  try {
    let response = await fetch(targetUrl, {
      method: "POST",
      body: formData,
    });

    // If auto mode and Express server fails/is offline, try Next.js API route fallback
    if (!response.ok && preferredServer === "auto" && targetUrl !== "/api/upload") {
      response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });
    }

    const json = await response.json();

    if (!response.ok || !json.success) {
      return {
        success: false,
        error: json?.error?.message || "Cloudinary upload failed.",
        instruction: json?.error?.instruction,
      };
    }

    return {
      success: true,
      data: json.data,
    };
  } catch (err: any) {
    // If Express server was unreachable in auto mode, try Next.js route
    if (preferredServer === "auto" && targetUrl !== "/api/upload") {
      try {
        const fallbackRes = await fetch("/api/upload", {
          method: "POST",
          body: formData,
        });
        const fallbackJson = await fallbackRes.json();
        if (fallbackRes.ok && fallbackJson.success) {
          return { success: true, data: fallbackJson.data };
        }
      } catch (e) {
        // ignore
      }
    }

    return {
      success: false,
      error: err?.message || "Network error while connecting to upload server.",
    };
  }
}

/**
 * Delete asset from Cloudinary
 */
export async function deleteFromCloudinary(
  publicId: string,
  resourceType: string = "image"
): Promise<{ success: boolean; message: string }> {
  try {
    const res = await fetch(
      `/api/upload?public_id=${encodeURIComponent(publicId)}&resource_type=${resourceType}`,
      { method: "DELETE" }
    );
    const json = await res.json();
    return {
      success: json.success,
      message: json.message || "Asset deleted.",
    };
  } catch (err: any) {
    return {
      success: false,
      message: err.message || "Failed to delete asset.",
    };
  }
}
