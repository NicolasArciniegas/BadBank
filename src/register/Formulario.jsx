import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router";
import {
  Box,
  FormControl,
  TextField,
  FormLabel,
  Button,
  RadioGroup,
  Radio,
  FormControlLabel,
  Typography,
  Input,
  InputLabel,
  InputAdornment,
  IconButton,
  FormHelperText,
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

export function Formulario({ setCuenta, cuenta }) {
  const [disabled, setDisabled] = useState(true);
  const [values, setValues] = useState({
    nombre: "",
    apellido: "",
    email: "",
    cuenta: "ahorros",
    password: "",
    password2: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [errores, setErrores] = useState({});
  const navigate = useNavigate();

  // Handlers

  const handleChange = (e) => {
    const prop = e.target.name;
    const value = e.target.value;
    setValues({ ...values, [prop]: value });
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (e) => {
    e.preventDefault();
  };

  const handleCreateAccount = (e) => {
    setCuenta({ action: "set", values });
    navigate("/register/accountCreated");
  };

  // Validacion

  const nameValidation = (value) => {
    const specialCharacters = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
    const numbers = /\d/;
    if (specialCharacters.test(value) || numbers.test(value)) return false;
    return true;
  };

  const safePasswordValidation = (value) => {
    const specialCharacters = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
    const numbers = /\d/;
    const checkUpperCaseLetter = (v) => {
      for (let i of v) {
        if (!/[a-z]/.test(i)) {
          return true;
        }
      }
      return false;
    };
    const checkLowerCaseLetter = (v) => {
      for (let i of v) {
        if (!/[A-Z]/.test(i)) {
          return true;
        }
      }
      return false;
    };
    if (
      (specialCharacters.test(value) &&
        numbers.test(value) &&
        checkLowerCaseLetter(value) &&
        checkUpperCaseLetter(value) &&
        value.length >= 8) ||
      value === ""
    )
      return true;
    return false;
  };

  const equalPasswordValidation = (passwd1, passwd2) => {
    if (passwd1 === passwd2) return true;
    return false;
  };

  const emailValidation = (value) => {
    return (
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
      value === ""
    );
  };

  const fieldValidation = (obj) => {
    let validate = true;
    Object.keys(obj).forEach((key) => {
      if (obj[key] === "") {
        validate = false;
      }
    });
    return validate;
  };

  const validacionTotal = (valBlanco = false) => {
    /*/
    Todas las validaciones pasan si los valores se encuentran en blanco por defecto
    /*/

    const misErrores = {};
    // Validar nombres
    for (let field of ["nombre", "apellido"]) {
      if (!nameValidation(values[field])) misErrores[field] = "Valor invalido";
    }
    // Validar contrasena
    if (equalPasswordValidation(values.password, values.password2)) {
      if (!safePasswordValidation(values.password))
        misErrores.password =
          "La contraseña debe tener mas de 8 caracteres, una letra mayuscula, una letra minuscula, un numero y un caracter especial";
    } else {
      misErrores.password = "Las contraseñas no coinciden";
    }
    // Validar email
    if (!emailValidation(values.email)) misErrores.email = "Email invalido";
    // Validar en blanco
    if (valBlanco) {
      Object.keys(values).forEach((key) => {
        if (values[key] === "") misErrores[key] = "Campo requerido";
      });
    }

    // Set Errores
    setErrores({ ...misErrores });
    // Enable
    if (Object.keys(misErrores).length === 0 && fieldValidation(values)) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  };

  // Setear validacion
  useEffect(() => {
    validacionTotal();
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
        <Box sx={{ margin: "0 auto", textAlign: "center" }}>
          <Typography variant="h3" sx={{ color: "rgb(49, 108, 244)" }}>
            Create Account
          </Typography>
          <Typography variant="subtitle">
            Es muy facil! Solo llena este formulario
          </Typography>
        </Box>
        <FormControl margin="normal">
          <TextField
            label="Nombre"
            variant="outlined"
            name="nombre"
            value={values.nombre}
            error={errores.nombre !== undefined ? true : false}
            helperText={errores.nombre}
            onChange={(e) => handleChange(e)}
          ></TextField>
        </FormControl>
        <FormControl>
          <TextField
            label="Apellido"
            variant="outlined"
            name="apellido"
            value={values.apellido}
            error={errores.apellido !== undefined ? true : false}
            helperText={errores.apellido}
            onChange={(e) => handleChange(e)}
          ></TextField>
        </FormControl>
        <FormControl margin="dense">
          <FormLabel
            id="demo-radio-buttons-group-label"
            sx={{ margin: "auto" }}
          >
            Tipo de cuenta
          </FormLabel>
          <RadioGroup
            aria-labelledby="demo-radio-buttons-group-label"
            defaultValue="ahorros"
            name="cuenta"
            row
            sx={{ margin: "auto" }}
            onChange={(e) => handleChange(e)}
            value={values.cuenta}
          >
            <FormControlLabel
              value="ahorros"
              control={<Radio />}
              label="Ahorros"
            />
            <FormControlLabel
              value="corriente"
              control={<Radio />}
              label="Corriente"
            />
          </RadioGroup>
        </FormControl>
        <FormControl>
          <TextField
            label="Email"
            value={values.email}
            name="email"
            error={errores.email !== undefined ? true : false}
            helperText={errores.email}
            onChange={(e) => handleChange(e)}
          ></TextField>
          <FormHelperText>
            Nos comunicaremos contigo a este email
          </FormHelperText>
        </FormControl>
        <FormControl margin="normal">
          <InputLabel htmlFor="standard-adornment-password">
            Password
          </InputLabel>
          <Input
            type={showPassword ? "text" : "password"}
            value={values.password}
            onChange={(e) => handleChange(e)}
            name="password"
            error={errores.password !== undefined ? true : false}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
          />
          <FormHelperText error={errores.password}>
            {errores.password}
          </FormHelperText>
        </FormControl>
        <FormControl margin="normal">
          <InputLabel htmlFor="standard-adornment-password">
            Repeat password
          </InputLabel>
          <Input
            type={showPassword ? "text" : "password"}
            value={values.password2}
            onChange={(e) => handleChange(e)}
            name="password2"
            error={errores.password !== undefined ? true : false}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
          />
          <FormHelperText error={errores.password}>
            {errores.password}
          </FormHelperText>
        </FormControl>
        <FormControl>
          <Button
            sx={{ width: "100%", margin: "0 auto" }}
            disabled={disabled}
            onClick={() => handleCreateAccount()}
          >
            Create Account
          </Button>
        </FormControl>
      </FormControl>
    </Box>
  );
}
