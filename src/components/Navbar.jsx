import { useState } from "react";
import { useStore } from "../Stores/store";
import "../styles/navbar.scss";

export const Navbar = () => {
  const threadData = useStore((state) => state.threadData);

  const [showHistory, setShowHistory] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Encuentra el estado más reciente
  const getMostRecentStatus = () => {
    if (!threadData?.history || threadData.history.length === 0) {
      return "No hay historial";
    }

    // Ordena el historial
    const sortedHistory = [...threadData.history].sort(
      (a, b) => new Date(b.date) - new Date(a.date)
    );

    // Devuelve estado mas reciente.
    return sortedHistory[0]?.status || "Sin estado";
  };

  return (
    <nav className="navbar">
      {/* Botón de menú hamburguesa */}
      <button
        className="navbar__hamburger"
        onClick={() => setIsMenuOpen(!isMenuOpen)}
      >
        <span className="navbar__hamburger-line"></span>
        <span className="navbar__hamburger-line"></span>
        <span className="navbar__hamburger-line"></span>
      </button>

      <div className={`navbar__menu ${isMenuOpen ? "navbar__menu--open" : ""}`}>
        <div className="navbar__item">
          <span className="navbar__item-description">Código CFS:</span>{" "}
          {threadData?.cfscode}
        </div>
        <div className="navbar__item">
          <span className="navbar__item-description">Emisor del hilo:</span>{" "}
          {threadData?.sender?.user}
        </div>
        <div className="navbar__item">
          <span className="navbar__item-description">
            Destinatario del Hilo:
          </span>{" "}
          {threadData?.recipient?.address}
        </div>
      </div>
      <div className="navbar__button-container">
        <button
          className="button_estados"
          onClick={() => setShowHistory(!showHistory)}
        >
          <span className="navbar__item-description">
            Histórico de estados:
          </span>{" "}
          {getMostRecentStatus()}
        </button>
        {showHistory && (
          <ul className="navbar__button-container__history">
            {threadData?.history.map((item, index) => (
              <li key={index}>{item.status}</li>
            ))}
          </ul>
        )}
      </div>
    </nav>
  );
};
