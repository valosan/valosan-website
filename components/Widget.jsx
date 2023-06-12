import React, { useEffect, useState, useMemo, useCallback } from "react";
import globe from "../public/globe.svg";
import "../index.css";
import { Tooltip } from "react-tooltip";

const messages = [
"You have a media hit!",
"Journalist is interested in your story!",
"Got 10 new followers!",
"Your story is trending!",
"10 likes on your post!",
]

export const Widget = ({ ...props }) => {
  const scale = props.scale || 1;
  const [anchor, setAnchor] = useState(null);
  const [message, setMessage] = useState(null);

  const showRandomMessage = useCallback(() => {
    const randomMessage = messages[Math.floor(Math.random() * messages.length)];
    setMessage(randomMessage);
    const randomAnchor = Math.floor(Math.random() * 7) + 1;
    setAnchor("anchor" + randomAnchor);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      showRandomMessage();
    }, 5000);

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
      <div class="dot" id="anchor1" style={{ left: "221px", top: "247px" }}></div>
      <div class="dot" id="anchor2" style={{ left: "524px", top: "283px" }}></div>
      <div class="dot" id="anchor3" style={{ left: "522px", top: "370px" }}></div>
      <div class="dot" id="anchor4" style={{ left: "417px", top: "145px" }}></div>
      <div class="dot" id="anchor5" style={{ left: "396px", top: "291px" }}></div>
      <div class="dot" id="anchor6" style={{ left: "435px", top: "485px" }}></div>
      <div class="dot" id="anchor7" style={{ left: "167px", top: "418px" }}></div>

      {anchor  ? <Tooltip
        anchorSelect={"#" + anchor}
        content={message || "Test message"}
        variant="light"
        style={{
          boxShadow: "0px 1.8px 8.1px rgba(0, 0, 0, 0.25)",
          borderRadius: "4px",
          padding: "8px 16px"
        }}
        isOpen
      /> : null}
    </div>
  );
};
