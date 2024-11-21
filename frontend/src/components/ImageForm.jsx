import React, { useState } from 'react';
import axios from 'axios';

const ImageForm = ({ onImageAdded }) => {
    const [name, setName] = useState('');
    const [imageFile, setImageFile] = useState(null);
    const [rating, setRating] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('name', name);
        formData.append('imageFile', imageFile);
        formData.append('rating', rating);

        try {
            const res = await axios.post('http://localhost:5000/api/images', formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });
            onImageAdded(res.data);
            setName('');
            setImageFile(null);
            setRating('');
        } catch (err) {
            console.error('Error uploading image:', err);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="p-6 space-y-4 w-full felx">
            <div className='w-full'>
                <label className="block mb-2">Image Name:</label>
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full p-2 border rounded"
                />
            </div>
            <div>
                <label className="block mb-2">Select Image:</label>
                <input
                    type="file"
                    onChange={(e) => setImageFile(e.target.files[0])}
                    className="w-full p-2 border rounded"
                />
            </div>
            <div>
                <label className="block mb-2">Rating:</label>
                <input
                    type="number"
                    value={rating}
                    onChange={(e) => setRating(e.target.value)}
                    className="w-full p-2 border rounded"
                />
            </div>
            <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded">
                Upload
            </button>
        </form>
    );
};

export default ImageForm;
