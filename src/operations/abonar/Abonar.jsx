import React, { useContext } from "react";
import { Formulario } from "../comun/Formulario";
import { LoggedUserContext } from "../../LoggedUserContext";
import { Movimientos } from "../../display/Movimientos";
import { Balance } from "../../display/Balance";
import { GoToLogin } from "../comun/GoToLogin";

export function Abonar() {
  const [cuenta, setCuenta] = useContext(LoggedUserContext);
  if (Object.keys(cuenta).length > 0) {
    return (
      <div style={{ display: "flex", marginTop: "2vw" }}>
        <div style={{ marginRight: "auto", marginLeft: "auto" }}>
          <Formulario
            cuenta={cuenta}
            setCuenta={setCuenta}
            titulo="Realizar Abono"
            subtitulo="Abona a tu cuenta"
            action="deposit"
            actionLabel="Depositar"
          />
        </div>
        <div
          style={{ display: "flex", flexDirection: "column", margin: "auto" }}
        >
          <Balance cuenta={cuenta} />
          <Movimientos
            cuenta={cuenta}
            mensaje={"Tus ultimos depositos:"}
            tipoMov="deposit"
          />
        </div>
      </div>
    );
  } else {
    return <GoToLogin />;
  }
}
