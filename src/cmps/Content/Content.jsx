import React, { useState, useEffect, useRef } from "react";
import "./Content.scss";
import { Footer } from "../Footer";

export const Content = ({ imgUrl }) => {
  const canvas = useRef(null);
  const demoImg = useRef(null);
  const dataURL = useRef(null);
  const [degrees, setDegrees] = useState(0);
  const drawRotated = () => {
    const ctx = canvas.current.getContext("2d");
    let { offsetWidth, offsetHeight } = demoImg.current;
    ctx.clearRect(0, 0, canvas.current.width, canvas.current.height);
    ctx.save();
    ctx.translate(canvas.current.width / 2, canvas.current.height / 2);
    ctx.rotate((degrees * Math.PI) / 180);
    ctx.drawImage(
      demoImg.current,
      -offsetWidth / 2,
      -offsetHeight / 2,
      offsetWidth,
      offsetHeight
    );
    ctx.restore();
  };
  useEffect(() => {
    if (imgUrl && canvas) {
      demoImg.current.onload = drawRotated;
    }
  }, [imgUrl, canvas]);
  const onRotate = () => {
    setDegrees(degrees + 90);
  };
  useEffect(() => {
    // console.log("rotation change detected...");
    if (imgUrl && canvas) {
      drawRotated();
    }
     dataURL.current = canvas.current.toDataURL();
  }, [degrees]);

  return (
    <div className="canvas-container">
      <img className="demo-image" src={imgUrl} ref={demoImg} alt="" />
      <h1>My image</h1>
      <canvas
        className="canvas"
        ref={canvas}
        width={400}
        height={400}
      ></canvas>{" "}
      <br />
      <button className="btn" onClick={onRotate}>
        Rotate
      </button>
      <Footer dataURL={dataURL} />
    </div>
  );
};
