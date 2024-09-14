import { useState } from "react";
import "../styles/main.scss";
//{ cfscode, sender, recipient, history }  history : {history[0].status}
export const Navbar = () => {
  const [showHistory, setShowHistory] = useState(false);

  return (
    <nav className="navbar">
      <div >CFS Code: </div>
      <div>Sender: </div>
      <div>Recipient: </div>
      <div>
        <button onClick={() => setShowHistory(!showHistory)}>
          Estado Actual: (Click para más)
        </button>
        {showHistory && (
          <ul>
            {/* {history.map((item, index) => (
              <li key={index}>{item.status}</li>
            ))} */}
          </ul>
        )}
      </div>
    </nav>
  );
};
