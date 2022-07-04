import React, { useContext } from "react";
import { useOutletContext } from "react-router-dom";
import { Formulario } from "./Formulario";
import { CardPublicidad } from "./CardPublicidad";
import { AccountContext } from "../AccountContext";

const STYLE = {
  justiFyContent: "space-around",
  margin: "auto",
};

export function Register() {
  const [cuenta, setCuenta] = useContext(AccountContext);

  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginTop: "2vw",
        }}
      >
        <div style={{ marginRight: "auto", marginLeft: "auto" }}>
          <Formulario setCuenta={setCuenta} cuenta={cuenta} />
        </div>
        <div style={{ margin: "auto" }}>
          <CardPublicidad />
        </div>
      </div>
    </>
  );
}
