import './App.css';
import React, { useState } from 'react';
import Video from './trailer.mp4'
import VideoPlayer from './components/VideoPlayer';

function App() {
  const [currentVideo, setCurrentVideo] = useState("../trailer.mp4")

  return (
    <React.Fragment>
      <VideoPlayer link={Video} />
    </React.Fragment>
 );
}

export default App;
