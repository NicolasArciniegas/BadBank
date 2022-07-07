import React, { useContext } from "react";
import { LoggedUserContext } from "../../LoggedUserContext";
import { Formulario } from "../comun/Formulario";
import { Balance } from "../../display/Balance";
import { Movimientos } from "../../display/Movimientos";
import { GoToLogin } from "../comun/GoToLogin";

export function Retirar() {
  const [cuenta, setCuenta] = useContext(LoggedUserContext);
  if (Object.keys(cuenta).length > 0) {
    return (
      <div style={{ display: "flex", marginTop: "2vw" }}>
        <div style={{ marginRight: "auto", marginLeft: "auto" }}>
          <Formulario
            cuenta={cuenta}
            setCuenta={setCuenta}
            titulo="Realizar Retiro"
            subtitulo="Retira de tu cuenta"
            action="withdraw"
            actionLabel="Retirar"
          />
        </div>
        <div
          style={{ display: "flex", flexDirection: "column", margin: "auto" }}
        >
          <Balance cuenta={cuenta} />
          <Movimientos
            cuenta={cuenta}
            mensaje={"Tus ultimos retiros:"}
            tipoMov="withdraw"
          />
        </div>
      </div>
    );
  } else {
    return <GoToLogin />;
  }
}
