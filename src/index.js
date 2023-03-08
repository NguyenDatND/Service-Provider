import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import DialogForm from "./Elements/Dialog_Form";
import ServiceProviderAdd from "./Elements/ServiceProviderAdd";
import ServiceProviderDel from "./Elements/ServiceProviderDel";
import ServiceProviderEdit from "./Elements/ServiceProviderEdit";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { Route, Routes } from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />}>
        <Route path="/serviceProviderAdd" element={<ServiceProviderAdd />} />
        <Route
          path="/serviceProviderEdit/:index"
          element={<ServiceProviderEdit />}
        />
        <Route
          path="/serviceProviderDel/:index"
          element={<ServiceProviderDel />}
        />
      </Route>
    </Routes>
  </BrowserRouter>
);
reportWebVitals();
