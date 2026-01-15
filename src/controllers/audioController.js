import cloudinary from "../utils/cloudinary.js";
import Audio from "../models/Audio.js";

export const uploadAudio = async (req, res) => {
  try {
    if (!process.env.MONGO_URI) {
      throw new Error("MongoDB not configured");
    }
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const result = await cloudinary.uploader.upload(req.file.path, {
      resource_type: "video", // audio counts as video in Cloudinary
    });

    const audio = await Audio.create({
      title: req.body.title || req.file.originalname,
      url: result.secure_url,
    });

    res.status(201).json(audio);
  } catch (err) {
    res.status(500).json({ error: err.message});
  }
};
