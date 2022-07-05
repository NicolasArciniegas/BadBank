import React, { useContext } from "react";
import { Formulario } from "./Formulario";
import { CardPublicidad } from "./CardPublicidad";
import { AllAccountsContext } from "../AllAccountsContext";

const STYLE = {
  justiFyContent: "space-around",
  margin: "auto",
};

export function Register() {
  const [cuentas, setCuentas] = useContext(AllAccountsContext);

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
          <Formulario cuentas={cuentas} setCuentas={setCuentas} />
        </div>
        <div style={{ margin: "auto" }}>
          <CardPublicidad />
        </div>
      </div>
    </>
  );
}
