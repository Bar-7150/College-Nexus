import { v2 as cloudinary } from "cloudinary";

// Configure Cloudinary using CLOUDINARY_URL or individual credentials
if (process.env.CLOUDINARY_URL) {
  cloudinary.config();
} else {
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
    secure: true,
  });
}

/**
 * Upload a Buffer to Cloudinary (Next.js server-side route handlers)
 */
export async function uploadBufferToCloudinary(
  buffer: Buffer,
  options: {
    folder?: string;
    resource_type?: "image" | "raw" | "video" | "auto";
    public_id?: string;
    upload_preset?: string;
  } = {}
): Promise<any> {
  return new Promise((resolve, reject) => {
    const uploadOptions: any = {
      folder: options.folder || "college-nexus",
      resource_type: options.resource_type || "auto",
      ...options,
    };

    if (process.env.CLOUDINARY_UPLOAD_PRESET && !uploadOptions.upload_preset) {
      uploadOptions.upload_preset = process.env.CLOUDINARY_UPLOAD_PRESET;
    }

    const uploadStream = cloudinary.uploader.upload_stream(
      uploadOptions,
      (error, result) => {
        if (error) return reject(error);
        resolve(result);
      }
    );

    uploadStream.end(buffer);
  });
}

/**
 * Delete asset from Cloudinary
 */
export async function deleteFromCloudinary(
  publicId: string,
  resourceType: "image" | "raw" | "video" = "image"
) {
  return cloudinary.uploader.destroy(publicId, { resource_type: resourceType });
}

/**
 * Ping Cloudinary API
 */
export async function testCloudinaryConnection() {
  try {
    const ping = await cloudinary.api.ping();
    const config = cloudinary.config();
    return {
      ok: ping.status === "ok",
      cloudName: config.cloud_name,
      message: "Cloudinary credentials verified successfully.",
    };
  } catch (err: any) {
    return {
      ok: false,
      cloudName: cloudinary.config().cloud_name,
      message: err?.message || "Failed to connect to Cloudinary.",
    };
  }
}

export default cloudinary;
