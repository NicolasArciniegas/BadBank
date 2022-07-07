import React from "react";
import { Box, Typography } from "@mui/material";

export function Intro() {
  return (
    <Box sx={{ maxWidth: "30vw" }}>
      <Typography variant="h2" color="primary">
        BadBank
      </Typography>
      <Typography variant="subtitle" color="secondary">
        Un banco para la gente
      </Typography>
      <div>
        <Typography variant="body">
          Somos mas que un banco, somos tu amigo. Queremos tener la oportunidad
          de apoyarte en tu vida financiera, brindandote las mas avanzadas
          herramientas tecnologicas para que hagas que tus sueños se vuelvan
          realidad
        </Typography>
      </div>
    </Box>
  );
}
