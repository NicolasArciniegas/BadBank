import React, { useContext } from "react";
import { AccountContext } from "../../AccountContext";
import { Formulario } from "../comun/Formulario";
import { Balance } from "../../display/Balance";
import { Movimientos } from "../../display/Movimientos";

export function Retirar() {
  const [cuenta, setCuenta] = useContext(AccountContext);
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
      <div style={{ display: "flex", flexDirection: "column", margin: "auto" }}>
        <Balance cuenta={cuenta} />
        <Movimientos
          cuenta={cuenta}
          mensaje={"Tus ultimos retiros:"}
          tipoMov="withdraw"
        />
      </div>
    </div>
  );
}
