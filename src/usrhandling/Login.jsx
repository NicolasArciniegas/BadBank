import React, { useState, useContext } from "react";
import { useNavigate } from "react-router";
import { LoggedUserContext } from "../LoggedUserContext";
import { AllAccountsContext } from "../AllAccountsContext";
import {
  Typography,
  Box,
  FormControl,
  TextField,
  Input,
  InputLabel,
  InputAdornment,
  IconButton,
  FormHelperText,
  Button,
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

export function Login() {
  const [values, setValues] = useState({
    user: "",
    password: "",
  });
  const [errores, setErrores] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [user, setUser] = useContext(LoggedUserContext);
  const [accounts, setAccounts] = useContext(AllAccountsContext);
  const navigate = useNavigate();
  // Handlers
  const handleChange = (e) => {
    const prop = e.target.name;
    const value = e.target.value;
    setValues({ ...values, [prop]: value });
    setErrores({});
  };
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };
  const handleMouseDownPassword = (e) => {
    e.preventDefault();
  };

  // Validation

  const checkUser = (user, password) => {
    accounts.map((account) => {
      if (account.email === user) {
        if (account.password === password) {
          setUser({ action: "set", account: { ...account } });
          navigate("/home");
        } else {
          setErrores({ password: "Contraseña incorrecta" });
        }
      }
    });
    setErrores({
      user: "Usuario no encontrado",
      password: "Usuario no encontrado",
    });
  };

  return (
    <Box sx={{ maxWidth: "30vw", margin: "auto" }}>
      <FormControl>
        <FormControl sx={{ margin: "auto", textAlign: "center" }}>
          <Typography variant="h3" color="primary">
            Login
          </Typography>
          <Typography variant="subtitle">
            Loggeate con tu usuario y contrasena
          </Typography>
        </FormControl>
        <FormControl margin="normal">
          <TextField
            name="user"
            label="User"
            onChange={(e) => handleChange(e)}
            error={errores.user >= undefined ? true : false}
            helperText={errores.user}
          ></TextField>
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
          <FormHelperText>{errores.password}</FormHelperText>
        </FormControl>
        <FormControl>
          <Button
            onClick={() => {
              checkUser(values.user, values.password);
            }}
          >
            Ingresar
          </Button>
        </FormControl>
      </FormControl>
    </Box>
  );
}
