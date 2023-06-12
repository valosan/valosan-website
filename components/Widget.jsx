import React, { useEffect, useState, useMemo, useCallback } from "react";
import globe from "../public/globe.svg";
import "../index.css";
import { Tooltip } from "react-tooltip";

export const Widget = ({ ...props }) => {
  const scale = props.scale || 1;
  return (
    <div
      className="hero"
      style={{
        transform: "scale(" + scale + ")",
      }}
    >
      <img src={globe} width="693" />
      <div class="dot" id="anchor1" style={{ left: "221px", top: "247px" }}></div>
      <div class="dot" style={{ left: "524px", top: "283px" }}></div>
      <div class="dot" style={{ left: "522px", top: "370px" }}></div>
      <Tooltip
        anchorSelect="#anchor1"
        content="You have a new media hit!"
        variant="light"
        style={{
          boxShadow: "0px 1.8px 8.1px rgba(0, 0, 0, 0.25)",
          borderRadius: "4px",
          padding: "8px 16px",
        }}
        isOpen={true}
      />
    </div>
  );
};
