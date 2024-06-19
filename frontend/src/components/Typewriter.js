import React, { useState, useEffect } from "react";
import "./styles/typewriter.css";
const Typewriter = ({ text, speed = 100 }) => {
  const [displayedText, setDisplayedText] = useState("");

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      setDisplayedText((prev) => prev + text.charAt(index));
      index++;
      if (index === text.length) {
        clearInterval(interval);
      }
    }, speed);

    return () => clearInterval(interval);
  }, [text, speed]);

  return (
    <p className="typewriter">
      <span className="typewriter">{displayedText}</span>
      <span className="caret">|</span>
      {/* {displayedText} */}
    </p>
  );
};

export default Typewriter;
