import React, { useState } from 'react';
import { assets } from '../assets/assets';

const Result = () => {
  const [image, setImage] = useState(null);
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [input, setInput] = useState("");
  const [isDownloading, setIsDownloading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    
    setIsLoading(true);
    setIsImageLoaded(false);

    try {
      const res = await fetch("http://localhost:8080/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ input }),
      })

      const data = await res.json();
      setImage(data.imageUrl);
      setIsImageLoaded(true);
    } catch (err) {
      console.error(err);
      // Reset to initial state on error
      setImage(null);
      setIsImageLoaded(false);
    } finally {
      setIsLoading(false);
    }
  }

  const handleGenerateAnother = () => {
    setIsImageLoaded(false);
    setImage(null);
    setInput("");
    setSaveSuccess(false);
  }

  const handleDownload = async () => {
    if (!image) return;
    
    setIsDownloading(true);
    try {
      // Fetch the image as a blob
      const response = await fetch(image);
      if (!response.ok) throw new Error('Failed to fetch image');
      
      const blob = await response.blob();
      
      // Create a download link
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      
      // Generate filename based on input or use timestamp
      const filename = input.trim() 
        ? `${input.trim().replace(/[^a-zA-Z0-9]/g, '_')}.png`
        : `generated_image_${Date.now()}.png`;
      
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      
      // Cleanup
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Download failed:', error);
      alert('Failed to download image. Please try again.');
    } finally {
      setIsDownloading(false);
    }
  }

  const handleSaveToLibrary = async () => {
    if (!image || !input.trim()) return;
    
    setIsSaving(true);
    try {
      const response = await fetch("http://localhost:8080/save-image", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          prompt: input.trim(),
          photo: image,
          name: "Guest"
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to save image');
      }

      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    } catch (error) {
      console.error('Save failed:', error);
      alert('Failed to save image to library. Please try again.');
    } finally {
      setIsSaving(false);
    }
  }

  return (
    <div className="flex flex-col min-h-[90vh] justify-center items-center gap-12 py-10">
      {/* Image Display Card */}
      <div className="relative bg-gradient-to-br from-gray-800/80 to-black/80 rounded-3xl shadow-2xl p-6 sm:p-10 flex flex-col items-center max-w-lg w-full">
        <div className="relative w-full flex justify-center items-center min-h-[300px]">
          {image ? (
            <div className="relative group">
              <img
                src={image}
                alt="Generated"
                className="rounded-2xl shadow-lg max-h-96 object-contain border-4 border-white/10 bg-black/30 transition-all duration-500"
                style={{ filter: isLoading ? 'blur(8px) grayscale(60%)' : 'none', opacity: isLoading ? 0.7 : 1 }}
              />
              {/* Image overlay effects */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              
              {/* Save Success Indicator */}
              {saveSuccess && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="bg-green-500/20 backdrop-blur-sm rounded-full p-8 animate-pulse">
                    <svg className="w-16 h-16 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="text-center text-gray-400">
              <div className="w-32 h-32 mx-auto mb-4 bg-gray-700/50 rounded-2xl flex items-center justify-center">
                <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <p className="text-lg">No image generated yet</p>
              <p className="text-sm">Enter a description below to get started</p>
            </div>
          )}
          
          {/* Animated Loader Bar */}
          {isLoading && (
            <span className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-yellow-400 via-orange-500 to-pink-500 animate-pulse w-full rounded-b-2xl"></span>
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
        {/* Always show input form when no image is loaded or when generating another */}
        {(!isImageLoaded || !image) && (
          <form onSubmit={onSubmitHandler} className="flex w-full bg-white/10 backdrop-blur-md text-white text-base p-2 rounded-2xl shadow-lg border border-white/10">
            <input
              onChange={e => setInput(e.target.value)}
              value={input}
              type="text"
              placeholder="Describe what to generate..."
              className="flex-1 bg-transparent outline-none px-4 py-3 rounded-l-2xl text-white placeholder-gray-300 font-medium"
              autoFocus
              disabled={isLoading}
            />
            <button
              type="submit"
              disabled={!input.trim() || isLoading}
              className="bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-300 hover:to-orange-400 disabled:from-gray-500 disabled:to-gray-600 text-black font-bold px-8 py-3 rounded-2xl ml-2 shadow-md transition-all duration-300 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Generating...' : 'Generate'}
            </button>
          </form>
        )}
        
        {/* Show action buttons when image is loaded */}
        {isImageLoaded && image && (
          <div className="flex flex-col gap-4 justify-center">
            {/* Primary Actions */}
            <div className="flex w-full gap-4 justify-center">
              <button
                type="button"
                onClick={handleGenerateAnother}
                className="flex-1 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-bold px-8 py-4 rounded-xl shadow-lg transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                Generate Another
              </button>
              <button
                type="button"
                onClick={handleSaveToLibrary}
                disabled={isSaving || saveSuccess}
                className="flex-1 bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 disabled:from-purple-400 disabled:to-pink-500 text-white font-bold px-8 py-4 rounded-xl shadow-lg transition-all duration-300 transform hover:scale-105 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isSaving ? (
                  <>
                    <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path>
                    </svg>
                    Saving...
                  </>
                ) : saveSuccess ? (
                  <>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Saved!
                  </>
                ) : (
                  <>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" />
                    </svg>
                    Save to Library
                  </>
                )}
              </button>
            </div>
            
            {/* Download Button */}
            <button
              type="button"
              onClick={handleDownload}
              disabled={isDownloading}
              className="w-full bg-gradient-to-r from-green-400 to-emerald-500 hover:from-green-300 hover:to-emerald-400 disabled:from-green-300 disabled:to-emerald-400 text-white font-bold px-8 py-4 rounded-xl shadow-lg transition-all duration-300 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isDownloading ? (
                <>
                  <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path>
                  </svg>
                  Downloading...
                </>
              ) : (
                <>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  Download Image
                </>
              )}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Result;
