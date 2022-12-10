import classes from "./Controls.module.css";
import Pause from "../pause.svg";
import Play from "../play.svg";
import Audio from "../audio.svg";
import Maximize from "../maximize.svg"
import Minimize from "../minimize.svg"
import { useRef }from "react";

function Controls(props) {
  const audioRef = useRef(null);

  function volumeUpdate(evt) {
    props.onVolumeChange(evt.target.value);
  }

  function mute() {
    audioRef.current.value = 0;
    props.onVolumeChange(0);
  }

  function unMute() {
    audioRef.current.value = props.previousAudio
    props.onVolumeChange(props.previousAudio);
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
    <div className={classes.timencon}>
      <input
        type="range"
        min={0}
        max={props.videoLength}
        value={props.currentTime}
        onChange={changeTime}
        onMouseDown={props.pause}
        onMouseUp={props.play}
        className={classes.timebar}
      />
      <div className={classes.controls}>
        <div className={classes.side}>
          {props.isPlaying ? (
            <img src={Pause} className={classes.pp} onClick={props.pause} alt='pause button' />
          ) : (
            <img src={Play} className={classes.pp} onClick={props.play} alt='play button' />
          )}
          {props.currentVolume > 0 ? (
            <img src={Audio} className={classes.pp} onClick={mute} alt='mute' />
          ) : (
            <img src={Audio} className={classes.pp} onClick={unMute} alt='unmute' />
          )}
          <input
            type="range"
            min="0"
            max="1"
            defaultValue={props.currentVolume}
            step=".01"
            onChange={volumeUpdate}
            ref={audioRef}
          />
        </div>
        <div>
          <span>
            {timeFormat(props.currentTime)} / {timeFormat(props.videoLength)}
          </span>
        </div>
        <div className={`${classes.side} ${classes.right}`}>
          <select
            defaultValue="1"
            onChange={playbackSpeedUpdate}
            className={classes.speed}
          >
            <option value="2">2x</option>
            <option value="1.5">1.5x</option>
            <option value="1">1x</option>
            <option value=".5">.5x</option>
            <option value=".25">.25x</option>
          </select>
          {!props.fullScreenState ? (
            <img src={Maximize} className={classes.screensize} onClick={props.fullScreen} alt='fullscreen' />
          ) : (
            <img src={Minimize} className={classes.screensize} onClick={props.fullScreen} alt='exit fullscreen' />
          )}
        </div>
      </div>
    </div>
  );
}

export default Controls;
