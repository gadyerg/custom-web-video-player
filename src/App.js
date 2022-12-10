import './App.css';
import React, { useState } from 'react';
import VideoPlayer from './components/VideoPlayer';
import SelectVideo from './components/SelectVideo';

function App() {
  const [currentVideo, setCurrentVideo] = useState(null)

  return (
    <React.Fragment>
      <SelectVideo changeVid={setCurrentVideo} />
      <VideoPlayer link={currentVideo} />
    </React.Fragment>
 );
}

export default App;
