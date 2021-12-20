import React, { useContext } from "react";
import { MyContext } from "./MyContext";
import Card from "./Card";

function Withdraw() {
  const {
    //state:
    balance,
    //functions:
    withdrawAmount,
    withdrawHandleChange,
    withdrawError,
    submitWithdrawal,
    showHideSuccessMessageWithdraw,
  } = useContext(MyContext);

  return (
    <Card
      bgcolor="info"
      header="Retiro"
      body={
        <>
          <h5 className="deposit mb-4">
            En linea todo es mas rapido, tu banco donde estes.
          </h5>
          <h6 className="balance mb-4">Tu saldo actual es: ${balance}</h6>
          <h6>Ingresa el monto a retirar:</h6>
          <input
            type="input"
            className="form-control"
            id="email"
            placeholder="Cantidad"
            onChange={withdrawHandleChange}
          />
          <div>
            <div className="error mb-3">{withdrawError}</div>
          </div>
          <br />
          <button
            type="submit"
            disabled={!withdrawAmount}
            className="submitBtn btn btn-light"
            onClick={() => submitWithdrawal(withdrawAmount)}
          >
            Retirar
          </button>
          {showHideSuccessMessageWithdraw()}
        </>
      }
    />
  );
}

export default Withdraw;
