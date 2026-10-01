const { v2: cloudinary } = require("cloudinary");
const streamifier = require("stream");
require("dotenv").config();

// Ensure Cloudinary is configured with either CLOUDINARY_URL or individual credentials
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
 * Upload a Buffer directly to Cloudinary using upload_stream
 * @param {Buffer} buffer - File buffer from multer
 * @param {Object} options - Cloudinary upload options (folder, resource_type, upload_preset, etc.)
 * @returns {Promise<Object>} Cloudinary upload result
 */
function uploadBufferToCloudinary(buffer, options = {}) {
  return new Promise((resolve, reject) => {
    const uploadOptions = {
      folder: options.folder || "college-nexus",
      resource_type: options.resource_type || "auto",
      ...options,
    };

    // If an upload preset is configured in environment or options, apply it
    if (process.env.CLOUDINARY_UPLOAD_PRESET && !uploadOptions.upload_preset) {
      uploadOptions.upload_preset = process.env.CLOUDINARY_UPLOAD_PRESET;
    }

    const uploadStream = cloudinary.uploader.upload_stream(
      uploadOptions,
      (error, result) => {
        if (error) {
          // Provide friendly diagnostic guidance if Cloudinary access key lacks 'create' action
          if (error.message && error.message.includes('actions=["create"]')) {
            error.userGuide =
              "Cloudinary Access Key lacks 'create' permission. In Cloudinary Console -> Settings -> Access Keys, edit this key to enable 'Create' / 'Write' permissions, or create an unsigned upload preset.";
          }
          return reject(error);
        }
        resolve(result);
      }
    );

    const bufferStream = new streamifier.PassThrough();
    bufferStream.end(buffer);
    bufferStream.pipe(uploadStream);
  });
}

/**
 * Delete an asset from Cloudinary by public ID
 * @param {string} publicId - Cloudinary public ID
 * @param {string} resourceType - "image" | "raw" | "video"
 * @returns {Promise<Object>} Result from Cloudinary destroy
 */
async function deleteFromCloudinary(publicId, resourceType = "image") {
  return cloudinary.uploader.destroy(publicId, { resource_type: resourceType });
}

/**
 * Test Cloudinary API connection by performing a ping
 * @returns {Promise<{ ok: boolean, cloudName: string, message: string }>}
 */
async function testCloudinaryConnection() {
  try {
    const ping = await cloudinary.api.ping();
    const config = cloudinary.config();
    return {
      ok: ping.status === "ok",
      cloudName: config.cloud_name,
      message: "Cloudinary credentials verified successfully.",
    };
  } catch (err) {
    return {
      ok: false,
      cloudName: cloudinary.config().cloud_name,
      message: err.message || "Failed to connect to Cloudinary.",
    };
  }
}

module.exports = {
  cloudinary,
  uploadBufferToCloudinary,
  deleteFromCloudinary,
  testCloudinaryConnection,
};
