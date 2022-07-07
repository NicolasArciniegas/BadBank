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
      const randomAccount = `${state.length}${Math.floor(
        Math.random() * 1000000
      )}`;
      return [
        ...state,
        {
          ...ACCOUNT_MODEL,
          ...payload.values,
          numCuenta: randomAccount,
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
    case "transfer":
      const cuentaUsuario = {
        ...payload.user,
        movimientos: [
          ...payload.user.movimientos,
          ...payload.transf.map((trans) => {
            return {
              bolsillo: trans.bolsillo,
              valor: trans.valor,
              movimiento: "outgoingTransfer",
              fecha: new Date().toString().slice(0, 10),
              to: trans.cuenta,
            };
          }),
        ],
        bolsillos: [
          ...payload.user.bolsillos.filter(
            (b) =>
              !payload.transf.map((item) => item.bolsillo).includes(b.nombre)
          ),
          ...payload.user.bolsillos
            .filter((b) =>
              payload.transf.map((item) => item.bolsillo).includes(b.nombre)
            )
            .map((bols) => {
              return {
                ...bols,
                balance:
                  bols.balance -
                  payload.transf
                    .filter((t) => t.bolsillo === bols.nombre)
                    .reduce((partiaValue, i) => partiaValue + i.valor, 0),
              };
            }),
        ],
        balance:
          payload.user.balance -
          payload.transf.reduce((partialValue, i) => partialValue + i.valor, 0),
      };
      const cuentasAfectadas = [
        ...new Set(payload.transf.map((transf) => transf.cuenta)),
      ];
      const cuentasActualizadas = [
        ...state.filter(
          (c) =>
            !cuentasAfectadas.includes(c.numCuenta) &&
            c.numCuenta != payload.user.numCuenta
        ),
        ...cuentasAfectadas.map((codigoCuenta) => {
          const cuenta = state.find((it) => it.numCuenta === codigoCuenta);
          const movimientosCuenta = [
            ...cuenta.movimientos,
            ...payload.transf
              .filter((t) => t.cuenta === cuenta.numCuenta)
              .map((mov) => {
                return {
                  fecha: new Date().toString().slice(0, 10),
                  movimiento: "incomingTransfer",
                  valor: mov.valor,
                  bolsillo: "Principal",
                  from: payload.user.numCuenta,
                };
              }),
          ];
          const totalTransferido = payload.transf
            .filter((tf) => tf.cuenta === cuenta.numCuenta)
            .reduce((partialValue, i) => (partialValue += i.valor), 0);
          const bolsillos = [
            ...cuenta.bolsillos.filter((b) => b.nombre != "Principal"),
            {
              nombre: "Principal",
              balance:
                cuenta.bolsillos.find((bN) => bN.nombre == "Principal")
                  .balance + totalTransferido,
            },
          ];
          const balance = bolsillos.reduce(
            (partialValue, i) => (partialValue += i.balance),
            0
          );
          return {
            ...cuenta,
            movimientos: movimientosCuenta,
            bolsillos,
            balance,
          };
        }),
        cuentaUsuario,
      ];
      return [...cuentasActualizadas];
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
