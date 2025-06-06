const multer = require('multer');
const path = require('path');
const ErrorResponse = require('./errorResponse');

// Set storage engine
const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, process.env.FILE_UPLOAD_PATH);
  },
  filename: function(req, file, cb) {
    cb(
      null,
      `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
    );
  }
});

// Check file type
function checkFileType(file, cb) {
  const filetypes = /pdf/;
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = filetypes.test(file.mimetype);

  if (extname && mimetype) {
    return cb(null, true);
  } else {
    cb(new ErrorResponse('Please upload PDF files only', 400));
  }
}

// Init upload
const upload = multer({
  storage: storage,
  limits: { fileSize: parseInt(process.env.FILE_UPLOAD_SIZE) },
  fileFilter: function(req, file, cb) {
    checkFileType(file, cb);
  }
}).array('documents', parseInt(process.env.MAX_FILE_UPLOAD));

module.exports = upload;