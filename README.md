# AI Image Generator

A full-stack AI image generation application built with React, Node.js, and DeepAI API.

## Features

- 🎨 AI-powered image generation from text prompts
- 🚀 Modern React frontend with Tailwind CSS
- 🔧 Node.js backend with Express
- 📱 Responsive design for all devices
- 💾 Image download functionality
- 🔄 Generate multiple images

## Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- DeepAI API key

## Setup

### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the backend directory with your DeepAI API key:
   ```env
   DEEPAI_API_KEY=your_deepai_api_key_here
   MONGODB_URL=your_mongodb_connection_string
   ```

4. Start the backend server:
   ```bash
   npm start
   ```

   The backend will run on `http://localhost:8080`

### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

   The frontend will run on `http://localhost:5173`

## Usage

1. Open your browser and go to `http://localhost:5173`
2. Click the "Start Creating Now" button to go to the image generation page
3. Enter a text prompt describing the image you want to generate
4. Click "Generate" to create your image
5. Once generated, you can download the image or generate another one

## API Endpoints

- `GET /api/v1/img` - Health check
- `POST /api/v1/img` - Generate image from text prompt

## Technologies Used

- **Frontend**: React 19, Vite, Tailwind CSS
- **Backend**: Node.js, Express, MongoDB
- **AI Service**: DeepAI Text-to-Image API
- **Styling**: Tailwind CSS with custom animations

## Troubleshooting

- Make sure both backend and frontend are running
- Ensure your DeepAI API key is valid and has sufficient credits
- Check the browser console for any error messages
- Verify the backend is accessible at `http://localhost:8080`

## License

This project is open source and available under the [MIT License](LICENSE).
