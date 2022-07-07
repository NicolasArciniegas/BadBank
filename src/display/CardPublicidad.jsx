import React from "react";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  CardActions,
  Button,
} from "@mui/material";

export function CardPublicidad({ titulo, mensaje, accionMsj, accion, imagen }) {
  return (
    <Card sx={{ maxWidth: "30vw" }}>
      <CardMedia component="img" image={imagen}></CardMedia>
      <CardContent>
        <Typography variant="h5">{titulo}</Typography>
        <Typography variant="body" color="text.secondary">
          {mensaje}
        </Typography>
      </CardContent>
      <CardActions>
        <Button onClick={() => accion()}>{accionMsj}</Button>
      </CardActions>
    </Card>
  );
}
