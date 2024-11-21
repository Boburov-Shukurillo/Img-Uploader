import React from 'react';

const ImageList = ({ images }) => {
    return (
        <div className="p-6 space-y-4">
            {images.map((image) => (
                <div key={image._id} className="border p-4 rounded">
                    <h2 className="text-xl font-bold">{image.name}</h2>
                    <img
                        src={`http://localhost:5000/${image.imageUrl}`}
                        alt={image.name}
                        className="w-full h-64 object-cover mt-2"
                    />
                    <p className="mt-2">Rating: {image.rating}</p>
                </div>
            ))}
        </div>
    );
};

export default ImageList;
