const multer = require("multer");

// Use in-memory storage to stream files directly to Cloudinary without writing to local disk
const storage = multer.memoryStorage();

// Allowed MIME types
const ALLOWED_MIME_TYPES = [
  // Images
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/gif",
  "image/svg+xml",
  // Documents & Study Resources
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  "application/vnd.ms-powerpoint",
  "application/vnd.openxmlformats-officedocument.presentationml.presentation",
  "application/zip",
  "application/x-zip-compressed",
  "text/plain",
];

const fileFilter = (req, file, cb) => {
  if (ALLOWED_MIME_TYPES.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(
      new Error(
        `Unsupported file type (${file.mimetype}). Allowed types: Images (JPG, PNG, WEBP, GIF, SVG) and Documents (PDF, DOC, DOCX, PPT, PPTX, ZIP, TXT).`
      ),
      false
    );
  }
};

// Max file size: 25MB (suitable for high-res PDF question papers and lecture slides)
const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 25 * 1024 * 1024, // 25MB
    files: 5, // Max 5 files simultaneously
  },
});

module.exports = upload;
