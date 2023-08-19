import React from 'react';

function VideoPlayer() {
  const videoUrl = 'https://standefy-test-bucket.s3.eu-west-3.amazonaws.com/v09044g40000chsfdajc77ubrioh4tqg.mov'; // Replace with your video URL

  return (
    <div>
      <h2>Video Player</h2>
      <video controls style={{ maxWidth: '100%' }}>
        <source src={videoUrl} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  );
}

export default VideoPlayer;
