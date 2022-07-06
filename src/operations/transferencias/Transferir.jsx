import React, { useReducer, useContext } from "react";
import { AllAccountsContext } from "../../AllAccountsContext";
import { LoggedUserContext } from "../../LoggedUserContext";
import { Formulario } from "./Formulario";
import { TablaTransferencia } from "./TablaTransferencia";
import { Transferencia } from "./Transferencia";
/*/
--- ITEMS TRANSFERENCIA ---
{
    id :number
    valor: number,
    bolsillo: str,
    cuenta: str
}
/*/

function Reducer(state, payload) {
  switch (payload.action) {
    case "add":
      return [...state, { ...payload.values, id: state.length }];
    case "remove":
      return state.filter((item) => item.id != payload.id);
    default:
      return state;
  }
}

export function Transferir() {
  const [values, dispatch] = useReducer(Reducer, []);
  const [cuentas, setCuentas] = useContext(AllAccountsContext);
  const [user, setUser] = useContext(LoggedUserContext);
  return (
    <>
      <div style={{ display: "flex", marginTop: "5vw" }}>
        <div style={{ marginLeft: "auto", marginRight: "auto" }}>
          <Formulario
            dispatch={dispatch}
            cuentas={cuentas}
            setCuentas={setCuentas}
            user={user}
            transf={values}
          />
        </div>
        <div style={{ margin: "auto" }}>
          <Transferencia values={values} mensaje="Items de tu transferencia" />
        </div>
      </div>
    </>
  );
}
