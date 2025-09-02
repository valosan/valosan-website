import React, { useEffect, useState, useMemo, useCallback } from "react";
import "../index.css";
import globe from "../src/globe.svg";
import { Tooltip } from "react-tooltip";

const messages = [
  "You have a media hit!",
  "Journalist is interested in your story!",
  "Got 10 new followers!",
  "Your story is trending!",
  "10 likes on your post!",
  "Journalist opened your email!",
  "Journalist clicked on your link!",
];

const TOOLTIPS = 7;

export const Widget = ({ ...props }) => {
  const scale = props.scale || 1;
  const [anchor, setAnchor] = useState(null);
  const [message, setMessage] = useState(null);
  const [tooltips, setTooltips] = useState(new Array(TOOLTIPS).fill(false));

  const showRandomMessage = useCallback(() => {
    const randomMessage = messages[Math.floor(Math.random() * messages.length)];
    setMessage(randomMessage);
    const randomAnchor = Math.floor(Math.random() * TOOLTIPS);
    setAnchor("anchor" + (randomAnchor + 1));
    console.log("randomAnchor", randomAnchor);
    setTooltips(tooltips.map((t, i) => (i === randomAnchor ? true : false)));
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      showRandomMessage();
    }, 3000 + Math.random() * 3000);

    showRandomMessage();
    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className="hero"
      style={{
        transform: "scale(" + scale + ")",
      }}
    >
      <img src={globe} width="693" />
      <div className="dot" id="anchor1" style={{ left: "221px", top: "247px" }}></div>
      <div className="dot" id="anchor2" style={{ left: "524px", top: "283px" }}></div>
      <div className="dot" id="anchor3" style={{ left: "522px", top: "370px" }}></div>
      <div className="dot" id="anchor4" style={{ left: "417px", top: "145px" }}></div>
      <div className="dot" id="anchor5" style={{ left: "396px", top: "291px" }}></div>
      <div className="dot" id="anchor6" style={{ left: "435px", top: "485px" }}></div>
      <div className="dot" id="anchor7" style={{ left: "167px", top: "418px" }}></div>

      {tooltips.map((show, index) => (
        <Tooltip
          key={index}
          anchorSelect={"#anchor" + (index + 1)}
          content={message || "Test message"}
          variant="light"
          className={show ? "fade-tooltip showing" : "fade-tooltip hidden"}
          style={{
            boxShadow: "0px 1.8px 8.1px rgba(0, 0, 0, 0.25)",
            borderRadius: "4px",
            padding: "8px 16px",
          }}
          isOpen
        />
      ))}
    </div>
  );
};
