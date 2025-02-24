const multer = require('multer');
const fs = require('fs');

// Define the upload directory path
const uploadDir = './uploads';

// Ensure the 'uploads' directory exists; if not, create it
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });  // Create the directory and any missing parent directories
}

// Set storage engine
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './uploads');  // Specify the folder where files will be stored
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);  // Rename the file to avoid name conflicts
  },
});

// Initialize multer with file size limits and storage settings
const upload = multer({
  storage: storage,
  limits: { fileSize: 10 * 1024 * 1024 },  // Max file size: 10MB
  fileFilter: (req, file, cb) => {
    const fileTypes = /pdf/; // Allow certain file types (e.g., images or PDFs)
    const extname = fileTypes.test(file.mimetype);
    const mimetype = fileTypes.test(file.mimetype);

    if (extname && mimetype) {
      return cb(null, true);
    }
    cb(new Error('Only image or PDF files are allowed.'));
  },
});

module.exports = upload;
