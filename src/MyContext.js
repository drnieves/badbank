import React, { createContext, useState } from "react";

const MyContext = createContext();

function MyContextProvider({ children }) {
  //from CREATE ACCOUNT COMPONENT
  const [successMessageVisible, setSuccessMessageVisible] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwError, setPasswError] = useState("");
  const [users, setUsers] = useState([]);

  let nameErrorStr = "";
  let emailErrorStr = "";
  let passwordErrorStr = "";

  //NO INPUT + ADDITIONAL VALIDATION
  const validate = () => {
    setEmailError("");
    setNameError("");
    setPasswError("");

    if (!email) {
      emailErrorStr = "Oops! Tu email no puede estra en blanco.";
      //additional: email length
    } else if (email.length == 1) {
      emailErrorStr = "Email debe ser mas largo que este.";
    }

    if (!name) {
      nameErrorStr = "Oops! Tu nombre no puede quedar en blanco.";
      //additional: name length
    } else if (name.length < 3) {
      nameErrorStr = "Nombre debe ser mas largo.";
    }

    if (!password) {
      passwordErrorStr = "Oops! Tu contraseña no puede estar en blanco.";
    }

    //validate if there's no error message
    if (nameErrorStr == "") {
      validateName(name);
    }

    if (emailErrorStr == "") {
      validateEmail(email);
    }

    if (passwordErrorStr == "") {
      validatePassword(password);
    }

    setNameError(nameErrorStr);
    setEmailError(emailErrorStr);
    setPasswError(passwordErrorStr);
    return (
      nameErrorStr === "" && emailErrorStr === "" && passwordErrorStr === ""
    ); //returns true and validate() is executed
  };

  const validateName = (newName) => {
    //additonal: limiting input to the letters of the English alphabet, including capital letters
    if (!newName.match(/^[a-zA-Z][a-zA-Z\s]*$/)) {
      nameErrorStr = "Ingresa solo letras.";
      return false;
    }
    return true;
  };

  //additional: email formatting
  const validateEmail = (newEmail) => {
    let emailFormat = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,4}$/;
    let isValidFormat = (str) => {
      return str.match(emailFormat);
    };

    if (!isValidFormat(newEmail)) {
      emailErrorStr = "Oops! email no valido.";
      return false;
    }
    return true;
  };

  const validatePassword = (newPassword) => {
    if (newPassword.length == 1 || newPassword.length < 8) {
      passwordErrorStr = "La contraseña debe ser mas larga.";
      return false;
    }
    return true;
  };

  //validation on onClick / Create Account button
  const handleClick = (e) => {
    if (validate()) {
      setSuccessMessageVisible(true);
      //adding all new users, for "All Data"
      let newUser = {
        name: name,
        email: email,
        password: password,
      };
      setUsers((users) => users.concat(newUser));
    } else {
      return;
    }
  };

  //FORM INPUT
  const handleNameChange = (e) => {
    // setName(e.currentTarget.value); //if there's no letter validation
    let newName = e.currentTarget.value;
    if (!newName || validateName(newName)) {
      setName(newName);
    }
  };

  const handleEmailChange = (e) => {
    setEmail(e.currentTarget.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.currentTarget.value);
  };

  //firing when creating new account
  const clearForm = () => {
    setName("");
    setEmail("");
    setPassword("");
    setSuccessMessageVisible(false);
  };

  // ------------------------------------------------------

  //from DEPOSIT COMPONENT
  let [depositAmount, setDepositAmount] = useState(0.0);
  let [balance, setBalance] = useState(0.0);
  let [depositError, setDepositError] = useState("");
  let [depositArr, setDepositArr] = useState([]);

  let depositErrorStr = "";

  //validating numbers for deposit and withdraw
  const validateNr = (newValue) => {
    //clear error when there's new input
    setDepositError("");
    setWithdrawError("");

    if (!newValue.match(/^([(0-9)]+\.)*([(0-9)]+)*$/)) {
      //this regex matches numbers from 0 to 9 and + decimal numbers
      depositErrorStr = "Ingresa solo numeros.";
      setDepositError(depositErrorStr);
      return false; //didn't validate
    }
    return true; //did validate
  };

  //input
  const handleChange = (e) => {
    let newValue = e.target.value;
    if (validateNr(newValue) || !newValue) {
      setDepositAmount(newValue);
    } else {
      e.target.value = newValue.slice(0, -1); //when we delete the numbers, it cuts off the last element if that's not a number
    }
    setSuccessMessageVisible(false);
  };

  //submit + additional validation
  const submitDeposit = (currentValue) => {
    if (currentValue == 0.0) {
      depositErrorStr = "La cantidad debe ser mayor a  0.";
      setDepositError(depositErrorStr);
      setWithdrawSuccessMessageVisible(false);
      return;
    }

    if (currentValue.length >= 7) {
      depositErrorStr = "La cantidad debe ser menor a esta.";
      setDepositError(depositErrorStr);
      setWithdrawSuccessMessageVisible(false);
      return;
    }

    //total amount / balance
    balance += parseFloat(currentValue);
    setBalance(balance);
    setSuccessMessageVisible(true);
    setDepositAmount(0.0);

    //all new deposits for "All Data"
    let newDeposit = {
      depositAmount: depositAmount,
    };

    setDepositArr((depositArr) => depositArr.concat(newDeposit));
  };

  let showHideSuccessMessage = () => {
    if (successMessageVisible) {
      return (
        <div className="message mt-4">
          <h7>Tu deposito ha sido recibido!</h7>
        </div>
      );
    }
    return;
  };

  // ------------------------------------------------------

  //from WITHDRAW COMPONENT
  let [withdrawAmount, setWithdrawAmount] = useState(0.0);
  let [withdrawError, setWithdrawError] = useState("");
  const [withdrawSuccessMessageVisible, setWithdrawSuccessMessageVisible] =
    useState(false);
  let [withdrawArr, setWithdrawArr] = useState([]);

  let withdrawErrorStr = "";

  //input
  const withdrawHandleChange = (e) => {
    let newValue = e.target.value;
    if (validateNr(newValue) || !newValue) {
      withdrawErrorStr = "Ingresa solo numeros.";
      setWithdrawAmount(newValue);
    } else {
      e.target.value = newValue.slice(0, -1); //when we delete the numbers, it cuts off the last element if that's not a number
    }
    setWithdrawSuccessMessageVisible(false);
  };

  //submit + additional validation
  const submitWithdrawal = (currentValue) => {
    if (currentValue == 0.0) {
      withdrawErrorStr = "La cantidad debe ser mayor que 0.";
      setWithdrawError(withdrawErrorStr);
      setWithdrawSuccessMessageVisible(false);
      return;
    }

    if (currentValue.length >= 7) {
      withdrawErrorStr = "La cantidad debe ser menor a esta.";
      setWithdrawError(withdrawErrorStr);
      setWithdrawSuccessMessageVisible(false);
      return;
    }

    if (currentValue > balance) {
      withdrawErrorStr = "La cantidad es mayor que el dinero en tu cuenta.";
      setWithdrawError(withdrawErrorStr);
      setWithdrawSuccessMessageVisible(false);
    } else {
      setBalance(balance - parseFloat(currentValue));
      setWithdrawError("");
      setWithdrawSuccessMessageVisible(true);
      setWithdrawAmount(0.0);

      //all withdrawals, for "All Data"
      let newWithdraw = {
        withdrawAmount: withdrawAmount,
      };

      setWithdrawArr((withdrawArr) => withdrawArr.concat(newWithdraw));
    }
  };

  let showHideSuccessMessageWithdraw = () => {
    if (withdrawSuccessMessageVisible) {
      return (
        <div className="message mt-4">
          <h6>Tu retiro fue exitoso!</h6>
        </div>
      );
    }
    return;
  };

  const defaultContext = {
    //state:
    name,
    email,
    password,
    nameError,
    emailError,
    passwError,
    depositAmount,
    balance,
    depositError,
    successMessageVisible,
    withdrawSuccessMessageVisible,
    withdrawAmount,
    withdrawError,
    users,
    depositArr,
    withdrawArr,
    //functions:
    validate,
    handleClick,
    handleNameChange,
    handleEmailChange,
    handlePasswordChange,
    clearForm,
    validateNr,
    handleChange,
    submitDeposit,
    showHideSuccessMessage,
    withdrawHandleChange,
    submitWithdrawal,
    showHideSuccessMessageWithdraw,
  };

  return (
    <MyContext.Provider value={defaultContext}>{children}</MyContext.Provider>
  );
}

export { MyContext, MyContextProvider };
