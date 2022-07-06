import React, { useEffect, useState } from "react";
import {
  Typography,
  FormControl,
  TextField,
  Select,
  MenuItem,
  Box,
  InputLabel,
  FormHelperText,
  Button,
} from "@mui/material";
import { moneyFormatter } from "../../tools/moneyFormatter";

export function Formulario({ dispatch, cuentas, setCuentas, user, transf }) {
  const [values, setValues] = useState({
    valor: "0",
    bolsillo: "Principal",
    cuenta: "-",
  });
  const [errores, setErrores] = useState({});
  const [disabled, setDisabled] = useState({ add: true, end: true });
  // functions
  const getBolsilloAvailableState = () => {
    const currentExpense = transf
      .filter((t) => t.bolsillo === values.bolsillo)
      .map((tf) => tf.valor)
      .reduce((partialValue, i) => partialValue + i, 0);
    return (
      user.bolsillos.find((b) => b.nombre === values.bolsillo).balance -
      currentExpense
    );
  };

  // Handlers
  const handdleChange = (e) => {
    const prop = e.target.name;
    const value = e.target.value;
    setValues({ ...values, [prop]: value });
  };

  // Validation
  const validateBalance = (e) => {
    const currentExpense = transf
      .filter((t) => t.bolsillo === values.bolsillo)
      .map((tf) => tf.valor)
      .reduce((partialValue, i) => partialValue + i, 0);
    const selectedBolsillo = user.bolsillos.find(
      (b) => b.nombre === values.bolsillo
    );
    if (selectedBolsillo.balance - currentExpense - parseInt(values.valor) < 0)
      return false;
    return true;
  };

  const validate = () => {
    const misErrores = {};
    // Validate
    if (!validateBalance())
      misErrores.valor =
        "No tienes saldo suficiente en el bolsillo seleccionado";
    if (parseInt(values.valor <= 0) || values.valor === "")
      misErrores.valor = "Debes ingresar un numero mayor que cero";
    if (values.cuenta === "-")
      misErrores.cuenta = "Debes seleccionar una cuenta";

    // Validacion total
    if (Object.keys(misErrores).length === 0) {
      setErrores({});
      setDisabled({ ...disabled, add: false });
      return true;
    }
    setErrores(misErrores);
    setDisabled({ ...disabled, add: true });
    return false;
  };

  // Action
  const agregar = () => {
    if (validate()) {
      dispatch({
        action: "add",
        values: { ...values, valor: parseInt(values.valor) },
      });
      setValues({ ...values, valor: "" });
    }
  };

  const transferencia = () => {
    const cuentasAfectadas = transf.map((transf) => transf.cuenta);
    const cuentasActualizadas = [
      ...cuentas.filter((c) => !cuentasAfectadas.includes(c.numCuenta)),
      cuentasAfectadas.map((codigoCuenta) => {
        const cuenta = cuentas.find((it) => it.numCuenta === codigoCuenta);
        const movimientosCuenta = [
          ...cuenta.movimientos,
          transf
            .filter((t) => t.cuenta === cuenta.numCuenta)
            .map((mov) => {
              return {
                fecha: new Date().toString().slice(0, 10),
                movimiento: "incomingTransfer",
                valor: mov.valor,
                bolsillo: "Principal",
              };
            })[0],
        ];
        const totalTransferido = transf
          .filter((tf) => tf.cuenta === cuenta.numCuenta)
          .reduce((partialValue, i) => (partialValue += i.valor), 0);
        const bolsillos = [
          ...cuenta.bolsillos.filter((b) => b.nombre != "Principal"),
          {
            nombre: "Principal",
            balance:
              cuenta.bolsillos.find((bN) => bN.nombre == "Principal").balance +
              totalTransferido,
          },
        ];
        const balance = bolsillos.reduce(
          (partialValue, i) => (partialValue += i.balance),
          0
        );
        return {
          ...cuenta,
          movimientos: movimientosCuenta,
          bolsillos,
          balance,
        };
      }),
    ];
  };

  // Set up validation
  useEffect(() => {
    validate();
  }, [values]);

  // Track transfer button state
  useEffect(() => {
    if (transf.length > 0) setDisabled({ ...disabled, end: false });
  }, [transf]);

  return (
    <Box sx={{ margin: "auto", maxWidth: "30vw" }}>
      <FormControl>
        <FormControl>
          <Typography variant="h3" color="primary">
            Transferencias
          </Typography>
          <Typography variant="subtitle">
            Realiza transferencias a otras cuentas
          </Typography>
        </FormControl>
        <FormControl margin="normal">
          <TextField
            label="Valor"
            name="valor"
            type="number"
            value={values.valor}
            onChange={(e) => handdleChange(e)}
            error={errores.valor !== undefined ? true : false}
            helperText={errores.valor}
          ></TextField>
        </FormControl>
        <FormControl>
          <InputLabel>Bolsillo</InputLabel>
          <Select
            label="bolsillo"
            value={values.bolsillo}
            name="bolsillo"
            onChange={(e) => {
              handdleChange(e);
            }}
          >
            {user.bolsillos.map((bolsillo, index) =>
              React.createElement(
                MenuItem,
                { key: `mnItmBls${index}`, value: bolsillo.nombre },
                `${bolsillo.nombre} - ${moneyFormatter(
                  getBolsilloAvailableState().toString()
                )}`
              )
            )}
          </Select>
        </FormControl>
        <FormControl margin="normal">
          <InputLabel error={errores.cuenta !== undefined ? true : false}>
            Cuenta a transferir
          </InputLabel>
          <Select
            label="Cuenta a transferir"
            name="cuenta"
            value={values.cuenta}
            onChange={(e) => handdleChange(e)}
            error={errores.cuenta !== undefined ? true : false}
          >
            <MenuItem value="-">Seleccione una cuenta</MenuItem>
            {cuentas.map((cuenta, index) =>
              React.createElement(
                MenuItem,
                {
                  key: `menItm${index}`,
                  value: cuenta.numCuenta,
                },
                `${cuenta.numCuenta} - ${cuenta.nombre} ${cuenta.apellido}`
              )
            )}
          </Select>
          <FormHelperText error={errores.cuenta !== undefined ? true : false}>
            {errores.cuenta}
          </FormHelperText>
        </FormControl>
        <FormControl>
          <Button onClick={() => agregar()} disabled={disabled.add}>
            Agregar
          </Button>
        </FormControl>
        <FormControl>
          <Button disabled={false} onClick={() => transferencia()}>
            Transferir
          </Button>
        </FormControl>
      </FormControl>
    </Box>
  );
}
