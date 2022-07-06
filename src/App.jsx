import React, { useEffect, useReducer } from "react";
import { AllAccountsContext } from "./AllAccountsContext";
import { LoggedUserContext } from "./LoggedUserContext";
import { Outlet } from "react-router";
import { NavBar } from "./components/NavBar";

/*/
DATA TYPES
-> Account
  {
    nombre: str, apellido: str, email: str, password: str, cuenta: str (ahorros, corriente),
    numCuenta: str, movimientos: [], bolsillos: [], balance: number
  }
-> Bolsillos list:
  {
    nombre: str, balance: int
  }
-> Movimientos list
  {
    fecha: str, movimiento: str (deposit, withdraw),
    valor: int
  }
/*/

function ReducerAccounts(state, payload) {
  const ACCOUNT_MODEL = {
    nombre: "",
    apellido: "",
    email: "",
    password: "",
    cuenta: "",
    numCuenta: "",
    movimientos: [],
    bolsillos: [{ nombre: "Principal", balance: 0 }],
    balance: 0,
  };
  switch (payload.action) {
    case "set":
      return [
        ...state,
        {
          ...ACCOUNT_MODEL,
          ...payload.values,
          numCuenta: state.length,
        },
      ];
    case "deposit":
    case "withdraw":
      const bolsillo = payload.bolsillo;
      let valor = payload.valor;
      if (payload.action === "withdraw") valor *= -1;
      return {
        ...state,
        balance: state.balance + valor,
        bolsillos: [
          ...state.bolsillos.filter((item) => item.nombre !== bolsillo),
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
    case "update":
      return [
        ...state.filter((account) => account.email !== payload.account.email),
        { ...payload.account },
      ];
    default:
      return state;
  }
}

function ReducerUser(state, payload) {
  switch (payload.action) {
    case "set":
      return { ...payload.account };
    case "deposit":
    case "withdraw":
      const bolsillo = payload.bolsillo;
      let valor = payload.valor;
      if (payload.action === "withdraw") valor *= -1;
      return {
        ...state,
        balance: state.balance + valor,
        bolsillos: [
          ...state.bolsillos.filter((item) => item.nombre !== bolsillo),
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
    default:
      return state;
  }
}

export function App() {
  const [cuentas, dispatchAccounts] = useReducer(ReducerAccounts, []);
  const [user, setUser] = useReducer(ReducerUser, {});

  useEffect(() => {
    if (user.email !== undefined) {
      dispatchAccounts({ action: "update", account: { ...user } });
    }
  }, [user]);

  return (
    <>
      <div>
        <AllAccountsContext.Provider value={[cuentas, dispatchAccounts]}>
          <LoggedUserContext.Provider value={[user, setUser]}>
            <NavBar />
            <Outlet />
          </LoggedUserContext.Provider>
        </AllAccountsContext.Provider>
      </div>
    </>
  );
}
