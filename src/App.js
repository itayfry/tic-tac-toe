import { useState } from "react";
import "./App.css";

const Cell = ({ currentPlayer, toggleCurrentPlayer }) => {
  const [val, setVal] = useState(null);
  return (
    <td
      onClick={() => {
        setVal(currentPlayer);
        toggleCurrentPlayer();
      }}
    >
      {val}
    </td>
  );
};

const Row = ({ currentPlayer, toggleCurrentPlayer }) => (
  <tr>
    <Cell currentPlayer={currentPlayer} toggleCurrentPlayer={toggleCurrentPlayer} />
    <Cell currentPlayer={currentPlayer} toggleCurrentPlayer={toggleCurrentPlayer} />
    <Cell currentPlayer={currentPlayer} toggleCurrentPlayer={toggleCurrentPlayer} />
  </tr>
);

function App() {
  const [currentPlayer, setCurrentPlayer] = useState("X"); // X Y
  const toggleCurrentPlayer = () => currentPlayer === 'X' ? setCurrentPlayer('Y') : setCurrentPlayer('X');
  return (
    <div className="App">
      <header className="App-header">
        <h1>Tic Tac Toe</h1>
        <table>
          <Row
            currentPlayer={currentPlayer}
            toggleCurrentPlayer={toggleCurrentPlayer}
          />
          <Row
            currentPlayer={currentPlayer}
            toggleCurrentPlayer={toggleCurrentPlayer}
          />
          <Row
            currentPlayer={currentPlayer}
            toggleCurrentPlayer={toggleCurrentPlayer}
          />
        </table>
      </header>
    </div>
  );
}

export default App;
