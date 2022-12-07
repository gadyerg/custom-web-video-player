import classes from "./VideoPlayer.module.css";
import { useRef, useState } from "react";
import Controls from "./Controls";

function VideoPlayer(props) {
  const vidRef = useRef(null);
  const containerRef = useRef(null);
  const [isPlaying, SetIsPlaying] = useState(false);
  const [layoutIsVisible, setLayoutIsVisible] = useState(false);
  const [currentTime, setCurrentTime] = useState(0)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [timer, setTimer] = useState(false);

  function playVideo() {
    vidRef.current.play();
    SetIsPlaying(true);
  }
  function pauseVideo() {
    vidRef.current.pause();
    SetIsPlaying(false);
  }

  function toggle() {
    if (isPlaying === true) {
      pauseVideo();
    } else {
      playVideo();
    }
  }
  function toggleLayout() {
    clearTimeout(timer);
    if (!layoutIsVisible) {
      setLayoutIsVisible(true);
    }
    setTimer(
      setTimeout(() => {
        setLayoutIsVisible(false);
      }, 300000)
    );
  }

  function updateVolume(num) {
    vidRef.current.volume = num;
  }

  function updatePlaybackSpeed(num) {
    vidRef.current.playbackRate = num;
  }

  function updateTimer() {
    setCurrentTime(vidRef.current.currentTime)
    if(vidRef.current.currentTime === vidRef.current.duration) {
      pauseVideo();
    }
  }

  function changeTime(time) {
    vidRef.current.currentTime = time;
  }

  function muteToggle() {
    vidRef.current.volume = 0
  }

  function fullScreen() {
    if(isFullscreen) {
      document.exitFullscreen();
      setIsFullscreen(false)
    } else {
      containerRef.current.requestFullscreen();
      setIsFullscreen(true)
    }
  }

  return (
    <div onMouseMove={toggleLayout} className={classes.container} ref={containerRef}>
      {layoutIsVisible && (
        <Controls
          isPlaying={isPlaying}
          onVolumeChange={updateVolume}
          onPlaybackSpeedChange={updatePlaybackSpeed}
          videoLength={vidRef.current.duration}
          currentTime={currentTime}
          changeTime={changeTime}
          pause={pauseVideo}
          play={playVideo}
          mute={muteToggle}
          fullScreen={fullScreen}
          fullScreenState={isFullscreen}
        />
      )}
      <video
        ref={vidRef}
        src={props.link}
        typeof="video/mp"
        className={classes.video}
        onClick={toggle}
        onTimeUpdate={updateTimer}
        onDoubleClick={fullScreen}
      ></video>
    </div>
  );
}

export default VideoPlayer;
