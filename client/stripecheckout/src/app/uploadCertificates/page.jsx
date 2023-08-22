"use client";

import React, { useState } from 'react';

const MultipleCertificateUpload = () => {
  const [message, setMessage] = useState('');

  const handleUpload = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    const certificates = e.target.elements.certificates.files;

    for (let i = 0; i < certificates.length; i++) {
      formData.append('certificates', certificates[i]);
    }

    try {
      const response = await fetch('http://localhost:5000/coach/uploadCertificates', {
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
      console.error('Error uploading certificates:', error);
    }
  };

  return (
    <div>
      <h2>Upload Multiple Certificates</h2>
      <form onSubmit={handleUpload}>
        <input type="file" name="certificates" accept=".pdf,.jpg,.png,.docx,.xlsx" multiple />
        <button type="submit">Upload Certificates</button>
      </form>
      <div>{message}</div>
    </div>
  );
};

export default MultipleCertificateUpload;
