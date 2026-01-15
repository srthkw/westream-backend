import cloudinary from "../utils/cloudinary.js";
import Audio from "../models/Audio.js";
import mongoose from "mongoose";

export const uploadAudio = async (req, res) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ message: "No files uploaded" });
    }

    const uploads = await Promise.all(
      req.files.map(async (file, index) => {
        const result = await cloudinary.uploader.upload(file.path, {
          resource_type: "video",
        });
    
        return {
          title: file.originalname,
          url: result.secure_url,
          publicId: result.public_id,
          order: index,
        };
      })
    );
    
    const saved = await Audio.insertMany(uploads);

    res.status(201).json(uploads);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


export const getAllAudios = async (req, res) => {
  try {
    const audios = await Audio.find().sort({ createdAt: -1 });
    res.status(200).json(audios);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const deleteAudio = async (req, res) => {
  try {
    const audio = await Audio.findById(req.params.id);

    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: "Invalid audio ID" });
    }

    if (!audio) {
      return res.status(404).json({ message: "Audio not found" });
    }

    await cloudinary.uploader.destroy(audio.publicId, {
      resource_type: "video",
    });

    await audio.deleteOne();

    res.status(200).json({ message: "Audio deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};