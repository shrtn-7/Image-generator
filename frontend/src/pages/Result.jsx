import React, { useState } from 'react';
import { assets } from '../assets/assets';

const Result = () => {
  const [image, setImage] = useState(assets.sample_img_1);
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [input, setInput] = useState("");

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setImage(null);
    setIsImageLoaded(false);

    try {
      const res = await fetch("http://localhost:5000/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ input }),
      })

      const data = await res.json();
      setImage(data.imageUrl);
      setIsImageLoaded(true);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <form onSubmit={onSubmitHandler} className="flex flex-col min-h-[90vh] justify-center items-center gap-12 py-10">
      {/* Image Display Card */}
      <div className="relative bg-gradient-to-br from-gray-800/80 to-black/80 rounded-3xl shadow-2xl p-6 sm:p-10 flex flex-col items-center max-w-lg w-full">
        <div className="relative w-full flex justify-center items-center">
          <img
            src={image}
            alt="Generated"
            className="rounded-2xl shadow-lg max-h-96 object-contain border-4 border-white/10 bg-black/30 transition-all duration-500"
            style={{ filter: isLoading ? 'blur(8px) grayscale(60%)' : 'none', opacity: isLoading ? 0.7 : 1 }}
          />
          {/* Animated Loader Bar */}
          {isLoading && (
            <span className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-yellow-400 via-orange-500 to-pink-500 animate-loader w-full rounded-b-2xl" style={{ animationDuration: '2.5s' }} />
          )}
        </div>
        {/* Loader Text */}
        {isLoading && (
          <div className="flex flex-col items-center mt-6">
            <svg className="animate-spin h-8 w-8 text-yellow-400 mb-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path>
            </svg>
            <p className="text-yellow-300 font-semibold text-lg tracking-wide animate-pulse">Generating your image...</p>
          </div>
        )}
      </div>

      {/* Prompt Input or Actions */}
      <div className="w-full max-w-xl flex flex-col items-center gap-6">
        {!isImageLoaded && (
          <div className="flex w-full bg-white/10 backdrop-blur-md text-white text-base p-2 rounded-2xl shadow-lg border border-white/10">
            <input
              onChange={e => setInput(e.target.value)}
              value={input}
              type="text"
              placeholder="Describe what to generate..."
              className="flex-1 bg-transparent outline-none px-4 py-3 rounded-l-2xl text-white placeholder-gray-300 font-medium"
              autoFocus
            />
            <button
              type="submit"
              className="bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-300 hover:to-orange-400 text-black font-bold px-8 py-3 rounded-2xl ml-2 shadow-md transition-all duration-300"
            >
              Generate
            </button>
          </div>
        )}
        {isImageLoaded && (
          <div className="flex w-full gap-4 justify-center mt-2">
            <button
              type="button"
              onClick={() => {
                setIsImageLoaded(false);
                setImage(null);
                setInput("");
              }}
              className="flex-1 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-400 hover:to-purple-500 text-white font-bold px-8 py-3 rounded-2xl shadow-md transition-all duration-300"
            >
              Generate Another
            </button>
            <a
              href={image}
              download
              className="flex-1 bg-gradient-to-r from-green-400 to-emerald-500 hover:from-green-300 hover:to-emerald-400 text-white font-bold px-8 py-3 rounded-2xl shadow-md text-center transition-all duration-300"
            >
              Download
            </a>
          </div>
        )}
      </div>
    </form>
  );
}


export default Result;
