import React from "react";
import { useNavigate } from "react-router";
import { Typography, Box, Button, FormControl } from "@mui/material";

export function GoToLogin() {
  const navigate = useNavigate();
  return (
    <Box
      sx={{
        maxWidth: "30vw",
        margin: "auto",
        marginTop: "5vw",
        textAlign: "center",
      }}
    >
      <FormControl>
        <FormControl>
          <Typography variant="h3" color="primary">
            No estas loggeado
          </Typography>
          <Typography variant="subtitle">
            Parece que no estas loggueado.
          </Typography>
          <Typography>Haz login para acceder a esta funcion!</Typography>
        </FormControl>
        <FormControl>
          <Button
            onClick={() => {
              navigate("/login");
            }}
          >
            Ir a Login
          </Button>
        </FormControl>
      </FormControl>
    </Box>
  );
}
