import multer from "multer";

const storage = multer.diskStorage({});

const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    if (!file.mimetype.startsWith("audio")) {
      cb(new Error("Not an audio file"), false);
    }
    cb(null, true);
  },
});

export default upload;
