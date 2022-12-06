import { useState } from "react";
import classes from "./Controls.module.css";

function Controls(props) {
  function volumeUpdate(evt) {
    props.onVolumeChange(evt.target.value);
  }

  function mute() {
    props.onVolumeChange(0)
  }

  function playbackSpeedUpdate(evt) {
    props.onPlaybackSpeedChange(evt.target.value);
  }

  function timeFormat(time) {
    if (time < 3600) {
      const minutes = Math.floor(time / 60);
      const seconds = Math.floor(time % 60).toLocaleString("en-US", {
        minimumIntegerDigits: 2,
        useGrouping: false,
      });
      return `${minutes} : ${seconds}`;
    }
  }

  function changeTime(evt) {
    props.changeTime(evt.target.value);
  }

  return (
    <div className={classes.controls}>
      <div>
        {props.isPlaying ? <button>pause</button> : <button>play</button>}
        <button onClick={mute}>mute</button>
        <input
          type="range"
          min="0"
          max="1"
          defaultValue="1"
          step=".01"
          onChange={volumeUpdate}
        />
      </div>
      <div>
        <span>
          {timeFormat(props.currentTime)} / {timeFormat(props.videoLength)}
        </span>
        <input
          type="range"
          min={0}
          max={props.videoLength}
          value={props.currentTime}
          onChange={changeTime}
          onMouseDown={props.pause}
          onMouseUp={props.play}
        />
      </div>
      <div>
        <select defaultValue="1" onChange={playbackSpeedUpdate}>
          <option value="2">2x</option>
          <option value="1.5">1.5x</option>
          <option value="1">1x</option>
          <option value=".5">.5x</option>
          <option value=".25">.25x</option>
        </select>
        <button>Fullscreen</button>
      </div>
    </div>
  );
}

export default Controls;
