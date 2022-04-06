import React from "react";
import ReactDOM from "react-dom";
import "normalize.css";
import { Canvas } from "@react-three/fiber";

import "./index.css";
import { App } from "./App";
import reportWebVitals from "./reportWebVitals";

ReactDOM.render(
  <React.StrictMode>
    <div id="app">
      <Canvas id="canvas" dpr={[1, 2]}>
        <App />
      </Canvas>
    </div>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
