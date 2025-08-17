import express from "express";
import { Client } from "@gradio/client";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

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

app.listen(5000, () => {
  console.log("Backend running on http://localhost:5000");
});
