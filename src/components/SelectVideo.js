function SelectVideo(props) {
  function changeCurrentVid(evt) {
    props.changeVid(window.URL.createObjectURL(evt.target.files[0]));
  }
  return (
    <input
      type="file"
      onChange={changeCurrentVid}
      accept="video/mp4,video/x-m4v,video/*"
    ></input>
  );
}

export default SelectVideo;
