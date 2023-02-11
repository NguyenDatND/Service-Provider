import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import AddNew from "./Elements/AddNew";
import Del from "./Elements/Del";
import Edit from "./Elements/Edit";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { Route, Routes, Link, Outlet } from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    {/* <React.StrictMode> */}
    <Routes>
      {/* <Route path="/" element={<App />} />
        <Route path="/AddNew" element={<AddNew />} />
        <Route path="/Del/:id" element={<Del />} />
        <Route path="/Edit/:id" element={<Edit />} />{" "} */}
      <Route path="/" element={<App />}>
        <Route path="/AddNew" element={<AddNew />} />
        <Route path="/Del/:index" element={<Del />} />
        <Route path="/Edit/:index" element={<Edit />} />{" "}
      </Route>
    </Routes>
    {/* </React.StrictMode> */}
  </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
