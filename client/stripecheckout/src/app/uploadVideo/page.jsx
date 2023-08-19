"use client";
import React, { useState } from 'react';

const SingleVideoUpload = () => {
  const [message, setMessage] = useState('');

  const handleUpload = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    const video = e.target.elements.video.files[0];

    formData.append('video', video);

    console.log('formData:', formData);

    try {
      const response = await fetch('http://localhost:5000/coach/upload', {
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
      console.error('Error uploading video:', error);
    }
  };

  return (
    <div>
      <h2>Upload Single Video</h2>
      <form onSubmit={handleUpload}>
        <input type="file" name="video" accept="video/*" />
        <button type="submit">Upload Video</button>
      </form>
      <div>{message}</div>
    </div>
  );
};

export default SingleVideoUpload;
