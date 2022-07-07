import React from "react";
import { CardPublicidad } from "../display/CardPublicidad";
import { useNavigate } from "react-router";
import { Intro } from "./Intro";

const TITULOPUBLICIDAD = "Un banco para la gente";
const MENSAJEPUBLICIDAD = `En BadBank estamos para ayudarte. Ponemos a tu disposicion todas
            nuestras novedosas herramientas y servicios para que lleves tus financias de la
            forma que mas te conviene.
            Nuestro objetivo es brindarte siempre el mejor servicio y la asistencia que como
            nuestro cliente te mereces!
`;
const ACCIONPUBLICIDAD = `Registrarse`;

export function Home() {
  const navigate = useNavigate();
  return (
    <>
      <div
        style={{
          margin: "auto",
          display: "flex",
          justifyContent: "space-between",
          marginTop: "2vw",
        }}
      >
        <div
          style={{ marginLeft: "auto", marginRight: "auto", marginTop: "15vw" }}
        >
          <Intro></Intro>
        </div>
        <div style={{ margin: "auto" }}>
          <CardPublicidad
            titulo={TITULOPUBLICIDAD}
            mensaje={MENSAJEPUBLICIDAD}
            accionMsj={ACCIONPUBLICIDAD}
            accion={() => navigate("/register")}
            imagen="/portada.png"
          ></CardPublicidad>
        </div>
      </div>
    </>
  );
}
