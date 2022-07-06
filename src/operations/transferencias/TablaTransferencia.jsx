import React from "react";
import { styled } from "@mui/material/styles";
import {
  Table,
  Paper,
  TableRow,
  TableHead,
  TableContainer,
  TableBody,
  Typography,
} from "@mui/material";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import DeleteIcon from "@mui/icons-material/Delete";
import { moneyFormatter } from "../../tools/moneyFormatter";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

function Renglon({ item }) {
  return (
    <StyledTableRow>
      <StyledTableCell component="th" scope="row">
        {item.bolsillo}
      </StyledTableCell>
      <StyledTableCell align="right">{item.cuenta}</StyledTableCell>
      <StyledTableCell align="right">
        {moneyFormatter(item.valor.toString())}
      </StyledTableCell>
      <StyledTableCell align="right">
        <DeleteIcon />
      </StyledTableCell>
    </StyledTableRow>
  );
}

export function TablaTransferencia({ transfes, mensaje }) {
  return (
    <div style={{ width: "30vw" }}>
      <Typography variant="h5" color="secondary">
        {mensaje}
      </Typography>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: "20vw" }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Bolsillo</StyledTableCell>
              <StyledTableCell align="right">Cuenta</StyledTableCell>
              <StyledTableCell align="right">Valor</StyledTableCell>
              <StyledTableCell align="right">Accion</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {transfes.length > 0
              ? transfes.map((cuenta, index) =>
                  React.createElement(Renglon, {
                    key: `cuentaRenglon${index}`,
                    item: cuenta,
                  })
                )
              : React.createElement(
                  StyledTableRow,
                  {},
                  React.createElement(
                    StyledTableCell,
                    { style: { textAlign: "center" }, colSpan: 5 },
                    "No has agregado a tu transferencia"
                  )
                )}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
