import multer from "multer";
import { fileFilters } from "../middlewares/file-filter.middleware.mjs";
import path from "path";

const storageImage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/images/");
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const name = file.originalname.split(".")[0];
    cb(null, `${name}-${Date.now()}${ext}`);
  },
});

const imageUpload = multer({
  storage: storageImage,
  limits: { fileSize: 100000000 },
  fileFilter: fileFilters.image,
});


const storageVideo = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/videos/");
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const name = file.originalname.split(".")[0];
    cb(null, `${name}-${Date.now()}${ext}`);
  },
});


const videoUpload = multer({
  storage: storageVideo,
  limits: { fileSize: 100000000 },
  fileFilter: fileFilters.video,
});

export { videoUpload, imageUpload };
