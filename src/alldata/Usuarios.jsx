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
        {item.numCuenta}
      </StyledTableCell>
      <StyledTableCell align="right">{item.email}</StyledTableCell>
      <StyledTableCell align="right">
        {item.nombre + " " + item.apellido}
      </StyledTableCell>
      <StyledTableCell align="right">{item.balance}</StyledTableCell>
      <StyledTableCell align="right">{item.movimientos.length}</StyledTableCell>
    </StyledTableRow>
  );
}

export function Usuarios({ cuentas, mensaje }) {
  return (
    <>
      <Typography variant="h5" color="secondary">
        {mensaje}
      </Typography>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>No. account</StyledTableCell>
              <StyledTableCell align="right">Email</StyledTableCell>
              <StyledTableCell align="right">Nombre</StyledTableCell>
              <StyledTableCell align="right">Balance</StyledTableCell>
              <StyledTableCell align="right">Num. movimientos</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {cuentas.length > 0
              ? cuentas.map((cuenta, index) =>
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
                    "Sin usuarios que mostrar"
                  )
                )}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
