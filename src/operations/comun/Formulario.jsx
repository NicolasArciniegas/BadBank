import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  FormControl,
  TextField,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
  Button,
} from "@mui/material";
export function Formulario({
  cuenta,
  setCuenta,
  titulo,
  subtitulo,
  action,
  actionLabel,
}) {
  const [values, setValues] = useState({
    valor: 0,
    bolsillo: "Principal",
  });
  const [errores, setErrores] = useState({});
  const [disabled, setDisabled] = useState(true);
  // Handlers

  const handleChange = (e) => {
    const prop = e.target.name;
    const value = e.target.value;
    setValues({ ...values, [prop]: value });
  };

  const handleAction = () => {
    if (action === "deposit" || cuenta.balance >= parseInt(values.valor)) {
      setCuenta({
        action: action,
        bolsillo: values.bolsillo,
        valor: parseInt(values.valor),
      });
      setValues({ ...values, valor: 0 });
    }
  };

  // Validation
  const negativeNumberValidation = (value) => {
    if (parseInt(value) <= 0 || value === "") return false;
    return true;
  };
  const validateBalance = (action, value, balance) => {
    if (action === "deposit" || balance >= value) return true;
    return false;
  };

  const totalValidation = () => {
    const misErrores = {};
    // Validacion
    if (!negativeNumberValidation(values.valor))
      misErrores.valor = "Valor invalido. Debe ser un numero mayor a 0";
    if (!validateBalance(action, values.valor, cuenta.balance))
      misErrores.valor = "No cuentas con suficiente saldo para esta operacion";
    // Validacion total
    if (Object.keys(misErrores).length === 0) {
      setErrores({});
      setDisabled(false);
    } else {
      setErrores({ ...misErrores });
      setDisabled(true);
    }
  };
  // Set up validation

  useEffect(() => {
    totalValidation();
  }, [values]);

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
          <Box sx={{ margin: "0 auto", textAlign: "center" }}>
            <Typography variant="h3" sx={{ color: "rgb(49, 108, 244)" }}>
              {titulo}
            </Typography>
            <Typography variant="subtitle">{subtitulo}</Typography>
          </Box>
        </FormControl>
        <FormControl margin="normal">
          <TextField
            type="number"
            label="valor"
            name="valor"
            error={errores.valor !== undefined ? true : false}
            onChange={(e) => handleChange(e)}
            value={values.valor}
          ></TextField>
          <FormHelperText error>{errores.valor}</FormHelperText>
        </FormControl>
        <FormControl margin="normal">
          <InputLabel>Bolsillo</InputLabel>
          <Select
            value={values.bolsillo}
            name="bolsillo"
            onChange={(e) => handleChange(e)}
          >
            {cuenta.bolsillos.map((item, index) =>
              React.createElement(
                MenuItem,
                { value: item.nombre, key: index },
                item.nombre
              )
            )}
          </Select>
          <FormHelperText>
            Los bolsillos son espacios que te ayudan a organizar tu dinero
          </FormHelperText>
        </FormControl>
        <FormControl>
          <Button disabled={disabled} onClick={() => handleAction()}>
            {actionLabel}
          </Button>
        </FormControl>
      </FormControl>
    </Box>
  );
}
