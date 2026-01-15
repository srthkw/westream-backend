import express from "express";
import upload from "../middleware/multer.js";
import { uploadAudio, getAllAudios, deleteAudio } from "../controllers/audioController.js";

const router = express.Router();

router.get("/", getAllAudios);
router.post("/upload", upload.array("audio", 10), uploadAudio);
router.delete("/:id", deleteAudio);

export default router;
