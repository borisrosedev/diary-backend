import express from "express"
import authMiddleware from "../middlewares/auth.middleware.js"
import fileController from "../controllers/file.controller.js"
import fileValidatorsMiddleware from "../middlewares/file-validators.middleware.js"
import multer from "multer"
import path from "path"
import { imageUpload, videoUpload } from "../config/multer.js"



const route = express.Router()

route.post("/image",imageUpload.fields([{ name: "singleFile", maxCount: 1 }]), fileController.uploadOneImage)
route.post("/images",imageUpload.fields([{ name: "files", maxCount: 2 }]), fileController.uploadMultipleImages)
route.post("/video",videoUpload.fields([{ name: "singleFile", maxCount: 1 }]), fileController.uploadOneVideo)
route.post("/videos",videoUpload.fields([{ name: "files", maxCount: 2 }]), fileController.uploadMultipleVideos)

export default route