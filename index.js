import React from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { Widget } from "./components/Widget";
import { Counters } from "./components/Counters";

// Find all widget divs
const widgetDivs = document.querySelectorAll(".testwidget");

// Inject our React App into each class
widgetDivs.forEach((element) => {
  createRoot(element).render(
    <React.StrictMode>
      <Widget {...element.dataset} />
    </React.StrictMode>
  );
});

// Find all counters divs
const countersDivs = document.querySelectorAll(".testcounters");

// Inject our React App into each class
countersDivs.forEach((element) => {
  createRoot(element).render(
    <React.StrictMode>
      <Counters {...element.dataset} />
    </React.StrictMode>
  );
});
