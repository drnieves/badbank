import React, { useContext } from "react";
import { MyContext } from "./MyContext";
import Card from "./Card";

function Deposit() {
  const {
    //state:
    depositAmount,
    balance,
    depositError,
    //functions:
    handleChange,
    submitDeposit,
    showHideSuccessMessage,
  } = useContext(MyContext);

  return (
    <Card
      bgcolor="info"
      header="Deposito"
      body={
        <>
          <h5 className="deposit mb-4">
            En linea todo es mas rapido, tu banco donde estes.
          </h5>
          <h6 className="deposit mb-4">Tu saldo actual es: ${balance}</h6>
          <h6>La cantidad de dinero que vas a depositar es:</h6>
          <input
            type="input"
            className="form-control"
            id="depositAmount"
            placeholder="Cantidad"
            onChange={handleChange}
          />
          <div>
            <div className="error mb-3">{depositError}</div>
          </div>
          <br />
          <button
            type="submit"
            disabled={!depositAmount}
            className="submitBtn btn btn-light"
            onClick={() => submitDeposit(depositAmount)}
          >
            Depositar
          </button>
          {showHideSuccessMessage()}
        </>
      }
    />
  );
}

export default Deposit;
