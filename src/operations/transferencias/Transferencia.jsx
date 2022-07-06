import React, { useEffect, useState } from "react";
import { Typography, Box } from "@mui/material";
import { TablaTransferencia } from "./TablaTransferencia";
import { moneyFormatter } from "../../tools/moneyFormatter";

export function Transferencia({ values, mensaje }) {
  const [total, setTotal] = useState(0);

  useEffect(() => {
    let miTotal = 0;
    values.map((transf) => (miTotal += transf.valor));
    setTotal(miTotal);
  }, [values]);

  return (
    <Box sx={{ margin: "auto", maxWidth: "30vw" }}>
      <Typography variant="h4" color="primary">
        Estado Transferencia
      </Typography>
      <Typography variant="subtitle">
        Organiza tu transferencia, desde los bolsillos que desees
      </Typography>
      <div>
        <Typography variant="body">Total transferencia</Typography>
      </div>
      <Typography variant="h3">{moneyFormatter(total.toString())}</Typography>
      <TablaTransferencia
        transfes={values}
        mensaje={mensaje}
      ></TablaTransferencia>
    </Box>
  );
}
