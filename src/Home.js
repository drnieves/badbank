import React from "react";
import Card from "./Card";

function Home() {
  return (
    <Card
      txtcolor="#000"
      header="Bad Bank Colombia"
      title="Bad Bank te ayuda con tu dinero!"
      text="Comience usando la barra de navegación localizada arriba"
      body={
        <img
          src="https://cdn.pixabay.com/photo/2019/08/19/20/36/pig-4417320_960_720.jpg"
          className="img-fluid"
          alt="bank"
        />
      }
    />
  );
}

export default Home;
