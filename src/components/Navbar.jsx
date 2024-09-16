import { useState } from "react";
import "../styles/main.scss";
import { useStore } from "../Stores/store";

export const Navbar = () => {
  const threadData = useStore((state) => state.threadData);
  console.log("estado", threadData);

  const [showHistory, setShowHistory] = useState(false);

  // Encuentra el estado más reciente
  const getMostRecentStatus = () => {
    if (!threadData?.history || threadData.history.length === 0) {
      return 'No hay historial';
    }
    
    // Ordena el historial
    const sortedHistory = [...threadData.history].sort((a, b) => new Date(b.date) - new Date(a.date));
    
    // Devuelve estado mas reciente.
    return sortedHistory[0]?.status || 'Sin estado';
  };

  return (
    <nav className="navbar">
      <div><span>Código CFS:</span> {threadData?.cfscode}</div>
      <div><span>Emisor del hilo:</span> {threadData?.sender?.user}</div>
      <div><span>Destinatario del Hilo:</span> {threadData?.recipient?.address}</div>
      <div>
        <button className="button_estados" onClick={() => setShowHistory(!showHistory)}>
          <span>Histórico de estados:</span> {getMostRecentStatus()} 
        </button>
        {showHistory && (
          <ul>
            {threadData?.history.map((item, index) => (
              <li key={index}>{item.status}</li>
            ))}
          </ul>
        )}
      </div>
    </nav>
  );
};
