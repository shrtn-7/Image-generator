import express from "express";
import { Client } from "@gradio/client";
import cors from "cors";
import * as dotenv from 'dotenv'; 
import connectDB from "./mongodb/connect.js";
import PostSchema from "./mongodb/models/post.js";

dotenv.config(); 

const app = express();
app.use(cors());
app.use(express.json());

// Connect to MongoDB - using default local connection if no env variable
const MONGODB_URL = process.env.MONGODB_URL || "mongodb://localhost:27017/image-generator";

// Your Hugging Face Space
const SPACE_ID = "shrtn-74/my_txt2img";

app.post("/generate", async (req, res) => {
  const { input } = req.body;

  try {
    const client = await Client.connect(SPACE_ID);
    const result = await client.predict("/predict", { prompt: input });

    const imageUrl = result.data[0].url;
    console.log("Generated Image URL:", imageUrl);
    res.json({ imageUrl });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to generate image" });
  }
});

// Save image to library
app.post("/save-image", async (req, res) => {
  try {
    const { prompt, photo, name } = req.body;
    
    if (!prompt || !photo) {
      return res.status(400).json({ error: "Prompt and photo are required" });
    }

    const newPost = await PostSchema.create({
      name: name || "Guest",
      prompt,
      photo,
    });

    res.status(201).json(newPost);
  } catch (error) {
    console.error("Error saving image:", error);
    res.status(500).json({ error: "Failed to save image" });
  }
});

// Get all saved images
app.get("/get-images", async (req, res) => {
  try {
    const posts = await PostSchema.find({})
      .sort({ createdAt: -1 })
      .select('-__v'); // Exclude version key
    
    if (!posts || posts.length === 0) {
      return res.status(200).json([]); // Return empty array instead of error
    }
    
    res.status(200).json(posts);
  } catch (error) {
    console.error("Error fetching images:", error);
    res.status(500).json({ 
      error: "Failed to fetch images",
      details: error.message 
    });
  }
});
// Delete image from library
app.delete("/delete-image/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deletedPost = await PostSchema.findByIdAndDelete(id);
    
    if (!deletedPost) {
      return res.status(404).json({ error: "Image not found" });
    }
    
    res.status(200).json({ message: "Image deleted successfully" });
  } catch (error) {
    console.error("Error deleting image:", error);
    res.status(500).json({ error: "Failed to delete image" });
  }
});

const PORT = process.env.PORT || 5000;
const startServer = async () => {
  try {
    await connectDB(MONGODB_URL);
    console.log("MongoDB connected successfully");
    
    app.listen(PORT, () => {
      console.log(`Backend running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("Error starting server:", error);
  }
};

startServer();
