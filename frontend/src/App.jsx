import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ImageForm from './components/ImageForm';
import ImageList from './components/ImageList';

const App = () => {
  const [images, setImages] = useState([]);

  useEffect(() => {
    async function fetchImages() {
      const res = await axios.get('https://img-uploader-iota.vercel.app/api/images');
      setImages(res.data);
    }
    fetchImages();
  }, []);

  const handleImageAdded = (newImage) => {
    setImages((prevImages) => [...prevImages, newImage]);
  };

  return (
    <div className="container mx-auto">
      <h1 className="text-3xl font-bold text-center mt-10">Image Upload App</h1>
      <ImageForm onImageAdded={handleImageAdded} />
      <ImageList images={images} />
    </div>
  );
};

export default App;
