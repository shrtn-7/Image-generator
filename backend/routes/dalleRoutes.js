import express from 'express';
import * as dotenv from 'dotenv';
import axios from 'axios';

dotenv.config();

const router = express.Router();

router.route('/').get((req, res) => {
  res.status(200).json({ message: 'Hello from Stable Diffusion!' });
});

router.route('/').post(async (req, res) => {
  try {
    const { prompt } = req.body;

    const response = await axios.post(
      'https://api-inference.huggingface.co/models/CompVis/stable-diffusion-v1-4',
      {
        inputs: prompt,
        parameters: {
          num_inference_steps: 50,
          guidance_scale: 7.5,
        },
        options: { wait_for_model: true },
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.HUGGINGFACE_API_KEY}`,
        },
        responseType: 'arraybuffer', // ensure we get binary data
      }
    );

    const imageBase64 = Buffer.from(response.data, 'binary').toString('base64');
    res.status(200).json({ photo: imageBase64 });
  } catch (error) {
    console.error(error);
    res.status(500).send(error?.response?.data || 'Something went wrong');
  }
});

export default router;
