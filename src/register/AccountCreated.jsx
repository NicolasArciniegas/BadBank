import React from "react";
import { useNavigate } from "react-router";
import { Typography, Button } from "@mui/material";

export function AccountCreated() {
  const navigate = useNavigate();
  return (
    <div style={{ margin: "auto", textAlign: "center", marginTop: "5vw" }}>
      <div>
        <Typography variant="h2" color="primary">
          Cuenta creada!!!
        </Typography>
        <Typography variant="subtitle">
          En hora buena!!! Has creado tu cuenta en BadBank
        </Typography>
      </div>
      <div>
        <Typography variant="body">
          Ya puedes empezar a hacer uso de nuestros servicios
        </Typography>
      </div>
      <div style={{ marginTop: "5vw" }}>
        <Button
          onClick={() => {
            navigate("/login");
          }}
        >
          Ir a mi cuenta
        </Button>
        <Button
          onClick={() => {
            navigate("/register");
          }}
        >
          Crear otra cuenta
        </Button>
      </div>
    </div>
  );
}
