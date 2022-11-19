import React, { useState, useEffect, useRef } from "react";
import { Navbar } from "../../components";
const PostForm = () => {
  const dirRef = useRef(null);
  const [state, setState] = useState({
    name: "",
    Location: "",
    Description: "",
    files: null,
  });
  const initialState = {
    name: "",
    Location: "",
    Description: "",
    files: null,
  };
  const [disabled, setDisabled] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [filename, setFilename] = useState("");
  function onChangeSetState(e) {
    if (e.target.name !== "files") {
      let updated = { ...state };
      updated[e.target.name] = e.target.value;
      setState(updated);
    }
    if (e.target.name === "files") {
      let updated = { ...state };
      updated[e.target.name] = e.target.files;
      let dirName = dirRef.current.value;
      setFilename(() => dirName);
      setState(updated);
    }
  }
  useEffect(() => {
    let setCondtion = false;
    for (let i of Object.keys(state)) {
      if (state[i] === "" || state[i] === null) {
        setCondtion = false;
        setDisabled(() => true);
        break;
      } else {
        setCondtion = true;
      }
    }
    if (setCondtion) {
      setDisabled(() => false);
    }
  }, [state]);
  // console.log("path",window)
  function postToServer(e) {
    setUploading(true);
    e.preventDefault();
    const formData = new FormData();
    formData.append("images", state.files[0]);

    for (let i of Object.keys(state)) {
      if (i !== "files") {
        if (state[i] === "") {
          console.log(state[i], "checking");
          setUploading(() => false);
          return;
        }
        formData.append(i, state[i]);
      }
    }

    fetch("https://instaclonebackendproject.herokuapp.com/posts", {
      method: "POST",
      body: formData,
    })
      .then((response) => {
        setUploading(false);
        return response.json();
      })
      .then(() => {
        // console.log("data in front end", data);
        setState(initialState);
        setFilename("");
        window.location.href = "/Postview";
      });
  }
  const { name, Location, Description } = state;
  return (
    <div>
      <Navbar />
      {<div style={{visibility:uploading?"visible":"hidden"}} className="uploader-message">{uploading &&<h4 className="uploading-text">Uploading.................pls wait</h4>}</div>}
      <form className="form-container" onSubmit={postToServer}>
        <div className="inside-form">
          <div className="file-component-container">
          <input className="dir-text" readOnly type="text" style={{color:(filename!=="")?"#000000":"#707070"}} value={filename===""?"No File Chosen":filename} />
          <div className="btn-browse">
            <label className="label" htmlFor="files">
              Browse
            </label>
          </div>
          </div>
          <input
            ref={dirRef}
            id="files"
            type="file"
            className="hidden-file"
            onChange={(e) => onChangeSetState(e)}
            name="files"
          />
         <div className="space-between-container">
         <input
          type="text"
          autoComplete="off"
          className="space-between-children"
          value={name}
          onChange={(e) => onChangeSetState(e)}
          placeholder="Author"
          name="name"
        />
          <input
          type="text"
          className="space-between-children"
          value={Location}
          autoComplete="off"
          onChange={(e) => onChangeSetState(e)}
          placeholder="Location"
          name="Location"
        />
         </div>
         <div className="desc-container">
         <input
          type="text"
          className="desc-input"
          autoComplete="off"
          value={Description}
          onChange={(e) => onChangeSetState(e)}
          placeholder="Description"
          name="Description"
        />
         </div>

        <button className={`${!disabled?"btn-post":""}`} disabled={disabled}>Post</button>
        </div>
      </form>
    </div>
  );
};

export default PostForm;
