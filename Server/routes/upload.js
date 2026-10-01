const express = require("express");
const router = express.Router();
const upload = require("../middleware/upload");
const {
  uploadBufferToCloudinary,
  deleteFromCloudinary,
  cloudinary,
} = require("../config/cloudinary");

/**
 * @route   POST /api/upload
 * @desc    Upload a single file (image or document) to Cloudinary
 * @access  Public / Authenticated
 */
router.post("/", upload.single("file"), async (req, res, next) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        error: {
          code: "MISSING_FILE",
          message: "Please select a file to upload.",
          timestamp: new Date().toISOString(),
          path: "/api/upload",
        },
      });
    }

    // Determine target folder (defaults to college-nexus/general)
    const folder = req.body.folder || req.query.folder || "college-nexus/uploads";
    const resourceType = req.file.mimetype.startsWith("image/") ? "image" : "auto";

    // Upload buffer to Cloudinary
    const result = await uploadBufferToCloudinary(req.file.buffer, {
      folder,
      resource_type: resourceType,
      public_id: req.body.custom_name ? `${req.body.custom_name}-${Date.now()}` : undefined,
    });

    return res.status(200).json({
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
        original_filename: req.file.originalname,
        created_at: result.created_at,
      },
    });
  } catch (error) {
    next(error);
  }
});

/**
 * @route   POST /api/upload/multiple
 * @desc    Upload multiple files (up to 5) to Cloudinary
 * @access  Public / Authenticated
 */
router.post("/multiple", upload.array("files", 5), async (req, res, next) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({
        success: false,
        error: {
          code: "MISSING_FILES",
          message: "Please select at least one file to upload.",
          timestamp: new Date().toISOString(),
          path: "/api/upload/multiple",
        },
      });
    }

    const folder = req.body.folder || req.query.folder || "college-nexus/batch-uploads";

    const uploadPromises = req.files.map((file) => {
      const resourceType = file.mimetype.startsWith("image/") ? "image" : "auto";
      return uploadBufferToCloudinary(file.buffer, {
        folder,
        resource_type: resourceType,
      }).then((result) => ({
        url: result.secure_url,
        secure_url: result.secure_url,
        public_id: result.public_id,
        format: result.format,
        resource_type: result.resource_type,
        bytes: result.bytes,
        original_filename: file.originalname,
      }));
    });

    const results = await Promise.all(uploadPromises);

    return res.status(200).json({
      success: true,
      count: results.length,
      message: `${results.length} file(s) uploaded successfully to Cloudinary.`,
      data: results,
    });
  } catch (error) {
    next(error);
  }
});

/**
 * @route   POST /api/upload/document
 * @desc    Upload an academic document / PYQ / syllabus PDF to Cloudinary Campus Vault
 * @access  Public / Authenticated
 */
router.post("/document", upload.single("document"), async (req, res, next) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        error: {
          code: "MISSING_DOCUMENT",
          message: "Please provide a document file (PDF, DOCX, PPTX).",
          timestamp: new Date().toISOString(),
          path: "/api/upload/document",
        },
      });
    }

    const department = req.body.department || "general";
    const semester = req.body.semester || "misc";
    const folder = `college-nexus/vault/${department}/${semester}`;

    const result = await uploadBufferToCloudinary(req.file.buffer, {
      folder,
      resource_type: "auto",
      use_filename: true,
    });

    return res.status(200).json({
      success: true,
      message: "Academic document uploaded to Campus Vault repository.",
      data: {
        url: result.secure_url,
        secure_url: result.secure_url,
        public_id: result.public_id,
        format: result.format,
        bytes: result.bytes,
        original_filename: req.file.originalname,
        department,
        semester,
      },
    });
  } catch (error) {
    next(error);
  }
});

/**
 * @route   DELETE /api/upload/:public_id
 * @desc    Delete an asset from Cloudinary
 * @access  Public / Authenticated
 */
router.delete("/:public_id(*)", async (req, res, next) => {
  try {
    const publicId = req.params.public_id;
    const resourceType = req.query.resource_type || "image";

    if (!publicId) {
      return res.status(400).json({
        success: false,
        error: {
          code: "MISSING_PUBLIC_ID",
          message: "Asset public_id is required for deletion.",
          timestamp: new Date().toISOString(),
          path: "/api/upload/:public_id",
        },
      });
    }

    const result = await deleteFromCloudinary(publicId, resourceType);

    if (result.result !== "ok" && result.result !== "not found") {
      return res.status(400).json({
        success: false,
        message: "Could not delete asset from Cloudinary.",
        details: result,
      });
    }

    return res.status(200).json({
      success: true,
      message: `Asset '${publicId}' removed successfully.`,
      result: result.result,
    });
  } catch (error) {
    next(error);
  }
});

/**
 * @route   GET /api/upload/signature
 * @desc    Generate signed parameters for secure direct client-to-Cloudinary uploads
 * @access  Public / Authenticated
 */
router.get("/signature", (req, res) => {
  const timestamp = Math.round(new Date().getTime() / 1000);
  const folder = req.query.folder || "college-nexus/direct";

  const config = cloudinary.config();
  const signature = cloudinary.utils.api_sign_request(
    { timestamp, folder },
    config.api_secret
  );

  res.status(200).json({
    success: true,
    data: {
      signature,
      timestamp,
      folder,
      cloud_name: config.cloud_name,
      api_key: config.api_key,
    },
  });
});

module.exports = router;
