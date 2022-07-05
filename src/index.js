import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";

// Mis componentens
// Home
import { App } from "./App";

// Paginas
import { Register } from "./register/Register";
import { Login } from "./usrhandling/Login";
import { Abonar } from "./operations/abonar/Abonar";
import { AccountCreated } from "./register/AccountCreated";
import { Retirar } from "./operations/retirar/Retirar";
import { CrearBolsillo } from "./operations/crearbolsillo/CrearBolsillo";
import { AllData } from "./alldata/AllData";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />}>
        <Route path="/register" element={<Register />}></Route>
        <Route path="/login" element={<Login />} />
        <Route path="/register/accountCreated" element={<AccountCreated />} />
        <Route path="/abonar" element={<Abonar />} />
        <Route path="/retirar" element={<Retirar />} />
        <Route path="/allData" element={<AllData />} />
        <Route path="/crearBolsillo" element={<CrearBolsillo />} />
      </Route>
    </Routes>
  </BrowserRouter>
);
