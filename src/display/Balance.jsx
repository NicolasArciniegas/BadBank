import React from "react";
import { moneyFormatter } from "../tools/moneyFormatter";
import { Typography, Box } from "@mui/material";

export function Balance({ cuenta }) {
  return (
    <Box>
      <div>
        <Typography variant="h3" color="primary">
          Balance
        </Typography>
      </div>
      <div>
        <Typography variant="body">Tu balance es de:</Typography>
        <Typography variant="body" fontSize="2vw">
          {" "}
          {moneyFormatter(cuenta.balance.toString())}
        </Typography>
      </div>
    </Box>
  );
}
