import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";

// Mis componentens
// Home
import { App } from "./App";

// Context
import { AccountContext } from "./AccountContext";

// Paginas
import { Register } from "./register/Register";
import { Abonar } from "./operations/abonar/Abonar";
import { AccountCreated } from "./register/AccountCreated";
import { Retirar } from "./operations/retirar/Retirar";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />}>
        <Route path="/register" element={<Register />}></Route>
        <Route path="/register/accountCreated" element={<AccountCreated />} />
        <Route path="/abonar" element={<Abonar />} />
        <Route path="/retirar" element={<Retirar />} />
      </Route>
    </Routes>
  </BrowserRouter>
);
