import React, { useContext } from "react";
import { MyContext } from "./MyContext";
import Card from "./Card";

function AllData() {
  const { users, depositArr, withdrawArr } = useContext(MyContext);
  let currentTime = new Date().toLocaleString();
  return (
    // we need Fragment, otherwise it returns an object
    <>
      {users.map((user) => (
        <>
          <Card
            bgcolor="info"
            header="Tus cuentas"
            body={
              <>
                <h5 className="balance mb-3">Cuentas Abiertas:</h5>
                <div className="alldata">
                  <h6>Fecha de creación: {currentTime}</h6>
                  <h6>Nombre: {user.name}</h6>
                  <h6>Email: {user.email}</h6>
                  <h6>Password: {user.password}</h6>
                </div>
              </>
            }
          />
        </>
      ))}

      {depositArr.map((amount) => (
        <>
          <Card
            bgcolor="info"
            header="Tus transacciones"
            body={
              <>
                <h5 className="balance mb-3">Deposito:</h5>
                <div className="alldata">
                  <h6>Datos de Creacion: {currentTime}</h6>
                  <h6>Cantidad: ${amount.depositAmount}</h6>
                  <br />
                  <br />
                </div>
              </>
            }
          />
        </>
      ))}

      {withdrawArr.map((value) => (
        <>
          <Card
            bgcolor="info"
            header="Tus transacciones"
            body={
              <>
                <h5 className="balance mb-3">Retiro:</h5>
                <div className="alldata">
                  <h6>Fecha de creación: {currentTime}</h6>
                  <h6>Cantidad: ${value.withdrawAmount}</h6>
                  <br />
                  <br />
                </div>
              </>
            }
          />
        </>
      ))}
    </>
  ); //return
} //function

export default AllData;
