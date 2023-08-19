"use client";
import React, { useState } from 'react';

const MultipleVideoUpload = () => {
  const [message, setMessage] = useState('');

  const handleUpload = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    const videos = e.target.elements.videos.files;

    for (let i = 0; i < videos.length; i++) {
      formData.append('videos', videos[i]);
    }
    console.log('formData:', formData);
    try {
      const response = await fetch('http://localhost:5000/coach/uploadVideos', {
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
      console.error('Error uploading videos:', error);
    }
  };

  return (
    <div>
      <h2>Upload Multiple Videos</h2>
      <form onSubmit={handleUpload}>
        <input type="file" name="videos" accept="video/*" multiple />
        <button type="submit">Upload Videos</button>
      </form>
      <div>{message}</div>
    </div>
  );
};

export default MultipleVideoUpload;
