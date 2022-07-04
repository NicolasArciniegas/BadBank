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
        {item.fecha}
      </StyledTableCell>
      <StyledTableCell align="right">{item.bolsillo}</StyledTableCell>
      <StyledTableCell align="right">{item.movimiento}</StyledTableCell>
      <StyledTableCell align="right">{item.valor}</StyledTableCell>
    </StyledTableRow>
  );
}

export function Movimientos({ cuenta, mensaje, tipoMov }) {
  return (
    <>
      <Typography variant="h5" color="secondary">
        {mensaje}
      </Typography>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Fecha</StyledTableCell>
              <StyledTableCell align="right">Bolsillo</StyledTableCell>
              <StyledTableCell align="right">Movimiento</StyledTableCell>
              <StyledTableCell align="right">Valor</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {cuenta.movimientos.filter((item) => item.movimiento === tipoMov)
              .length > 0
              ? cuenta.movimientos
                  .filter((item) => item.movimiento === tipoMov)
                  .map((item, index) =>
                    React.createElement(Renglon, {
                      key: `renglonMov${index}`,
                      item,
                    })
                  )
              : React.createElement(
                  StyledTableRow,
                  {},
                  React.createElement(
                    StyledTableCell,
                    { colSpan: 4, style: { textAlign: "center" } },
                    "Sin movimientos que mostrar"
                  )
                )}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
