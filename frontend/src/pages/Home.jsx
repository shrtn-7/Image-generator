import React from 'react';
import { Card, Loader } from '../components';

const Home = () => {
  const [images, setImages] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/v1/post');
        const data = await response.json();
        setImages(data.data);
      } catch (err) {
        console.error('Failed to fetch images:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchImages();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader />
      </div>
    );
  }

  return (
    <section className="max-w-7xl mx-auto">
      <h1 className="font-extrabold text-[#222328] text-[32px]">Community Showcase</h1>
      <p className="mt-2 text-[#666e75] text-[14px]">Browse through a collection of imaginative images shared by the community</p>

      <div className="mt-10">
        {images.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {images.map((image) => (
              <Card key={image._id} image={image} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <p className="text-gray-500 text-lg">No images shared yet. Be the first to share!</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default Home;
