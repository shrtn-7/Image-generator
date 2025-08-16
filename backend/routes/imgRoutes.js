import express from 'express';
import * as dotenv from 'dotenv';
import axios from 'axios';

dotenv.config();

const router = express.Router();

router.route('/').get((req, res) => {
  res.status(200).json({ message: 'The image generation service is running!' });
});

router.route('/').post(async (req, res) => {
  try {
    const { prompt } = req.body;

    const deepAiResponse = await axios.post(
      'https://api.deepai.org/api/text2img',
      {
        text: prompt,
      },
      {
        headers: {
          'api-key': process.env.DEEPAI_API_KEY,
        },
      }
    );

    if (!deepAiResponse.data || !deepAiResponse.data.output_url) {
      console.error('DeepAI API response missing output_url:', deepAiResponse.data);
      return res.status(500).send('DeepAI API did not return an image URL.');
    }

    const imageUrl = deepAiResponse.data.output_url;

    const imageResponse = await axios.get(imageUrl, {
      responseType: 'arraybuffer',
    });

    if (!imageResponse.data) {
      console.error('Failed to fetch image from DeepAI URL:', imageUrl);
      return res.status(500).send('Failed to retrieve image data from DeepAI URL.');
    }

    const imageBase64 = Buffer.from(imageResponse.data, 'binary').toString('base64');
    res.status(200).json({ photo: imageBase64 });
  } catch (error) {
    console.error('Error generating or fetching image:', error);
    let errorMessage = 'Something went wrong with image generation.';
    if (error.response) {
      console.error('DeepAI API Error Response Data:', error.response.data);
      console.error('DeepAI API Error Status:', error.response.status);
      console.error('DeepAI API Error Headers:', error.response.headers);
      errorMessage = `Error from image API: ${error.response.status} - ${JSON.stringify(error.response.data)}`;
    } else if (error.request) {
      console.error('No response received from image API:', error.request);
      errorMessage = 'No response received from the image generation service. Please try again.';
    } else {
      console.error('Error setting up image generation request:', error.message);
      errorMessage = `An unexpected error occurred: ${error.message}`;
    }

    res.status(500).send(errorMessage);
  }
});

export default router;
