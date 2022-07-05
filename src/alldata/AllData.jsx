import React, { useContext } from "react";
import { AllAccountsContext } from "../AllAccountsContext";
import { Usuarios } from "./Usuarios";
import { Typography } from "@mui/material";

export function AllData() {
  const [accounts, setAccounts] = useContext(AllAccountsContext);
  return (
    <>
      <div style={{ maxWidth: "70%", margin: "auto" }}>
        <Typography variant="h3" color="primary">
          All Data
        </Typography>
        <Usuarios
          cuentas={accounts}
          mensaje="Informacion de los usuarios registrados"
        />
      </div>
    </>
  );
}
