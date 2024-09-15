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
    
    // Ordena el historial por fecha en orden descendente
    const sortedHistory = [...threadData.history].sort((a, b) => new Date(b.date) - new Date(a.date));
    
    // Devuelve el estado más reciente
    return sortedHistory[0]?.status || 'Sin estado';
  };

  return (
    <nav className="navbar">
      <div>CFS Code:{threadData?.cfscode} </div>
      <div>Sender: {threadData?.sender?.user}</div>
      <div>Recipient: {threadData?.recipient?.address}</div>
      <div>
      <button onClick={() => setShowHistory(!showHistory)}>
        Estado Actual: {getMostRecentStatus()} 
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
