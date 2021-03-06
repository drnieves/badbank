import React from "react";
import { useLocation } from "react-router-dom";
import ReactTooltip from "react-tooltip";

function NavBar() {
  /* Highlighting: The navigation bar highlights the element of the current page the user is on. */
  /* Highlight the current page the user is on / active page, even on refresh */
  const location = useLocation();

  // an array of objects; pages[classIndex] is enough to access it
  const pages = [
    {
      id: "home",
      text: "Bienvenido a  Bad Bank",
      tooltipText: "El mejor peor banco",
      href: "#/",
    },
    {
      id: "createAccount",
      text: "Crea tu Cuenta",
      tooltipText: "Sigue los pasos para la mejor experiencia",
      href: "#/createaccount/",
    },
    {
      id: "deposit",
      text: "Consigna",
      tooltipText: "Consignación en efectivo y cheques",
      href: "#/deposit/",
    },
    {
      id: "withdraw",
      text: "Retiro",
      tooltipText: "Retiro en Efectivo y cheques",
      href: "#/withdraw/",
    },
    {
      id: "allData",
      text: "Todo lo que necesitas",
      tooltipText: "Mas trasacciones y posibilidades",
      href: "#/alldata/",
    },
  ];

  const getClass = (classIndex) => {
    const currentPage = location.pathname; //accessing pathname from the location object
    const renderedPage = pages[classIndex].href.split("#").pop(); //from which we'll get "withdraw", "deposit", etc.
    return renderedPage === currentPage ? "current" : "";
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        {/* BUTTON */}
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          {/* hamburger icon */}
          <span className="navbar-toggler-icon"></span>
        </button>

        {/*  main container: containing nav items from item 1 till length of page */}
        <div className="collapse navbar-collapse nav-container" id="navbarNav">
          {/* container containing nav items only */}
          <ul className="navbar-nav navitem-container">
            {/* nav items: */}
            {/* Highlighting: The navigation bar highlights the element of the current page the user is on. */}
            {/* Tooltip implementation:
            When a user hovers their cursor over a navigation bar element, they see a few words describing that page. */}

            {pages.map((item, index) => (
              <li key={index} className="nav-item">
                <a
                  data-tip
                  data-for={item.id}
                  className={`nav-link pl-2 pr-2 m-1 ${getClass(index)}`}
                  href={item.href}
                >
                  {item.text}
                </a>
                <ReactTooltip id={item.id} effect="solid">
                  <span>{item.tooltipText}</span>
                </ReactTooltip>
                {/* note to self: data-for={item.id} and ReactTooltip id={item.id} need to be the same */}
              </li>
            ))}
          </ul>
          {/* end of container for nav items */}
        </div>
        {/* end of main container */}
      </nav>
    </>
  );
}

export default NavBar;
