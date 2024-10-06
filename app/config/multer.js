import multer from "multer";
import { fileFilters } from "../middlewares/file-filter.middleware.js";
import path from "path"

const storageImage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'uploads/images/');
    },
    filename: (req, file, cb) => {
      const ext = path.extname(file.originalname);
      cb(null, `${file.fieldname}-${Date.now()}${ext}`);
    }
  });
  
  const storageVideo = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'uploads/videos/');
    },
    filename: (req, file, cb) => {
      const ext = path.extname(file.originalname); 
      cb(null, `${file.fieldname}-${Date.now()}${ext}`); 
    }
  });



const imageUpload = multer({
    storage: storageImage,
    dest: 'uploads/images/',
    limits: { fileSize: 100000000 },
    fileFilter: fileFilters.image 
});
  

const videoUpload = multer({
    storage: storageVideo,
    dest: 'uploads/videos/',
    limits: { fileSize: 100000000 },
    fileFilter: fileFilters.video 
});

export {
    videoUpload, 
    imageUpload
}