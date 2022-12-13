import React from "react";
import classes from "./SelectVideo.module.css";

function SelectVideo(props) {
  function changeCurrentVid(evt) {
    props.changeVid(window.URL.createObjectURL(evt.target.files[0]));
  }
  return (
    <React.Fragment>
      <label htmlFor="videobutton" className={classes.label}>
        Select
      </label>
      <input
        id="videobutton"
        type="file"
        onChange={changeCurrentVid}
        accept="video/mp4,video/x-m4v,video/*"
        className={classes.videobutton}
      ></input>
    </React.Fragment>
  );
}

export default SelectVideo;
