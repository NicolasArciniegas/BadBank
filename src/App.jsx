import React, { useEffect, useReducer } from "react";
import { AccountContext } from "./AccountContext";
import { Outlet } from "react-router";
import { NavBar } from "./components/NavBar";

/*/
DATA TYPES
-> Bolsillos:
  {
    nombre: str, valor: int
  }
-> Movimientos
  {
    fecha: str, movimiento: str (deposit, withdraw),
    valor: int
  }
/*/

function Reducer(state, payload) {
  switch (payload.action) {
    case "set":
      return { ...state, ...payload.values };
    case "deposit":
    case "withdraw":
      const bolsillo = payload.bolsillo;
      let valor = payload.valor;
      if (payload.action === "withdraw") valor *= -1;
      return {
        ...state,
        balance: state.balance + valor,
        bolsillos: [
          ...state.bolsillos.filter((item) => item.nombre != bolsillo),
          {
            nombre: bolsillo,
            balance:
              state.bolsillos.find((item) => item.nombre === bolsillo).balance +
              valor,
          },
        ],
        movimientos: [
          ...state.movimientos,
          {
            fecha: new Date().toString().slice(0, 15),
            movimiento: payload.action,
            valor: payload.valor,
            bolsillo: payload.bolsillo,
          },
        ],
      };
  }
}

export function App() {
  const [cuenta, dispatch] = useReducer(Reducer, {
    nombre: "",
    apellido: "",
    email: "",
    password: "",
    cuenta: "",
    numCuenta: "",
    movimientos: [],
    bolsillos: [{ nombre: "Principal", balance: 0 }],
    balance: 0,
  });

  useEffect(() => {}, [cuenta]);

  return (
    <>
      <div>
        <NavBar />
        <AccountContext.Provider value={[cuenta, dispatch]}>
          <Outlet context={[cuenta, dispatch]} />
        </AccountContext.Provider>
      </div>
    </>
  );
}
