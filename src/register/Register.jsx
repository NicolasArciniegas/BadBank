import React, { useContext } from "react";
import { Formulario } from "./Formulario";
import { CardPublicidad } from "../display/CardPublicidad";
import { AllAccountsContext } from "../AllAccountsContext";

const TITULOPUBLICIDAD = "Tu informacion esta segura!";
const MENSAJEPUBLICIDAD = `Tus datos e informacion personal, asi como los registros de tu
          actividad dentro de nuestra plataforma, no son compartidos nunca a
          terceros y son utilizados solamente en pro de tu experiencia en
          nuestro sistema`;
const ACCIONPUBLICIDAD = `Leer politica de tratamiento de datos`;

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
          <CardPublicidad
            titulo={TITULOPUBLICIDAD}
            mensaje={MENSAJEPUBLICIDAD}
            accionMsj={ACCIONPUBLICIDAD}
            accion={() => alert("Nada por aqui aun")}
            imagen="/cyberSecurity.jpg"
          />
        </div>
      </div>
    </>
  );
}
