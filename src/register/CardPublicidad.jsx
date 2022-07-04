import React from "react";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  CardActions,
  Button,
} from "@mui/material";

export function CardPublicidad() {
  return (
    <Card sx={{ maxWidth: "30vw" }}>
      <CardMedia component="img" image="/cyberSecurity.jpg"></CardMedia>
      <CardContent>
        <Typography variant="h5">Tu informacion esta segura!</Typography>
        <Typography variant="body" color="text.secondary">
          Tus datos e informacion personal, asi como los registros de tu
          actividad dentro de nuestra plataforma, no son compartidos nunca a
          terceros y son utilizados solamente en pro de tu experiencia en
          nuestro sistema
        </Typography>
      </CardContent>
      <CardActions>
        <Button>Leer politica de tratamiento de datos</Button>
      </CardActions>
    </Card>
  );
}
