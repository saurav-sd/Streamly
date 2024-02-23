import React, { useState } from 'react';
import { Container,Button } from 'react-bootstrap';
import ReactPlayer from 'react-player';
import { useParams,useLocation } from 'react-router-dom';

const VideoPlayer = () => {
  const [selectedResolution, setSelectedResolution] = useState('high');
  const {videoName} = useParams();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const title = searchParams.get("title");
  const video = videoName.split(".")[0];

  const videoURLs = {
    low: `https://utoob-output.s3.ap-south-1.amazonaws.com/${video}_480x360.mp4`,
    medium: `https://utoob-output.s3.ap-south-1.amazonaws.com/${video}_840x480.mp4`,
    high: `https://utoob-output.s3.ap-south-1.amazonaws.com/${video}_1280x720.mp4`,
  };

  const switchResolution = (resolution) => {
    setSelectedResolution(resolution);
  };

  return (
    <Container className="justify-content-center">
    <div className="ms-3 mt-3">
      <ReactPlayer
        url={videoURLs[selectedResolution]}
        controls
        width="65%"
        height="auto"
        
      />
      <div>
        <Button variant="dark" size="sm" onClick={() => switchResolution('low')}>360p</Button>{"  "}
        <Button variant="dark" size="sm" onClick={() => switchResolution('medium')}>480p</Button>{"  "}
        <Button variant="dark" size="sm" onClick={() => switchResolution('high')}>720p</Button>{"  "}
      </div>
      <h1>{title}</h1>
    </div>
    </Container>
  );
};

export default VideoPlayer;
