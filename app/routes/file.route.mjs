import express from "express";
import fileController from "../controllers/file.controller.mjs";
import { imageUpload, videoUpload } from "../config/multer.mjs";

const route = express.Router();

route.post(
  "/image",
  imageUpload.fields([{ name: "singleFile", maxCount: 1 }]),
  fileController.uploadOneImage,
);














route.post(
  "/images",
  imageUpload.fields([{ name: "files", maxCount: 2 }]),
  fileController.uploadMultipleImages,
);
route.post(
  "/video",
  videoUpload.fields([{ name: "singleFile", maxCount: 1 }]),
  fileController.uploadOneVideo,
);
route.post(
  "/videos",
  videoUpload.fields([{ name: "files", maxCount: 2 }]),
  fileController.uploadMultipleVideos,
);

export default route;
