import React, { useState, useEffect, useContext } from "react";
import { LoggedUserContext } from "../../LoggedUserContext";
import { Typography, Box, FormControl, TextField, Button } from "@mui/material";

export function CrearBolsillo() {
  const [cuenta, setCuenta] = useContext(LoggedUserContext);
  const [values, setValues] = useState({ bolsillo: "" });
  const [errors, setErrors] = useState({});

  // Handlers
  const handleChange = (e) => {
    const prop = e.target.name;
    const value = e.target.value;
    setValues({ ...values, prop: value });
  };

  // Validation

  // Crear
  const createBolsillo = () => {};

  return (
    <Box
      sx={{
        width: 300,
        height: 300,
        margin: "auto",
      }}
    >
      <FormControl>
        <FormControl>
          <Typography variant="h3" color={"primary"}>
            Crear bolsillo
          </Typography>
          <Typography variant="body">
            Los bolsillos te ayudan a organizar tu dinero para ayudarte a
            ahorrar
          </Typography>
        </FormControl>
        <FormControl margin="normal">
          <TextField
            name="bolsillo"
            label="bolsillo"
            onChange={(e) => handleChange(e)}
            error={errors.bolsillo !== undefined ? true : false}
            value={values.bolsillo}
          ></TextField>
        </FormControl>
        <FormControl>
          <Button>Crear bolsillo</Button>
        </FormControl>
      </FormControl>
    </Box>
  );
}
