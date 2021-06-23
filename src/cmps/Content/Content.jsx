import React, { useState, useEffect, useRef } from "react";
import "./Content.scss";
export const Content = ({ imgUrl }) => {
  const canvas = useRef(null);
  const demoImg = useRef(null);
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
    console.log("rotation change detected...");
    if (imgUrl && canvas) {
      drawRotated();
    }
  }, [degrees]);
  return (
    <div>
      <img className="demo-image" src={imgUrl} ref={demoImg} alt="" />
      <h1>content</h1>
      <canvas ref={canvas} width={400} height={400} />
      <button onClick={onRotate}>Rotate</button>
    </div>
  );
};
