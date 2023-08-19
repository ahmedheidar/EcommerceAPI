"use client";

import React, { useState } from 'react';

const MultipleImageUpload = () => {
  const [message, setMessage] = useState('');

  const handleUpload = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    const images = e.target.elements.images.files;

    for (let i = 0; i < images.length; i++) {
      formData.append('images', images[i]);
    }

    try {
      const response = await fetch('http://localhost:5000/coach/uploadImages', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      if (response.ok) {
        setMessage(data.message);
      } else {
        setMessage(data.error);
      }
    } catch (error) {
      console.error('Error uploading images:', error);
    }
  };

  return (
    <div>
      <h2>Upload Multiple Images</h2>
      <form onSubmit={handleUpload}>
        <input type="file" name="images" accept="image/*" multiple />
        <button type="submit">Upload Images</button>
      </form>
      <div>{message}</div>
    </div>
  );
};

export default MultipleImageUpload;
