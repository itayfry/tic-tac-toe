import { useState } from "react";
import "./App.css";

const Cell = ({ onClick, rowIndex, cellIndex, value }) => {
  return (
    <td
      onClick={() => {
        if (value === null) {
          onClick(rowIndex, cellIndex);
        }
      }}
    >
      {value}
    </td>
  );
};

const Row = ({ row, onCellClick, index }) => (
  <tr>
    {row.map((cell, cellIndex) => (
      <Cell
        key={cellIndex}
        rowIndex={index}
        cellIndex={cellIndex}
        onClick={onCellClick}
        value={cell}
      />
    ))}
  </tr>
);

const cloneBoard = (board) => board.map((row) => row.map((cell) => cell));

function App() {
  const [currentPlayer, setCurrentPlayer] = useState("X"); // X Y
  const [board, setBoard] = useState([
    [null, null, null],
    [null, null, null],
    [null, null, null],
  ]);
  const toggleCurrentPlayer = () =>
    currentPlayer === "X" ? setCurrentPlayer("Y") : setCurrentPlayer("X");
  const onCellClick = (rowIndex, cellIndex) => {
    const clonedBoard = cloneBoard(board);
    clonedBoard[rowIndex][cellIndex] = currentPlayer;
    setBoard(clonedBoard);
    toggleCurrentPlayer();
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Tic Tac Toe</h1>
        <table>
          <tbody>
            {board.map((row, index) => (
              <Row key={index} index={index} row={row} onCellClick={onCellClick} />
            ))}
          </tbody>
        </table>
      </header>
    </div>
  );
}

export default App;
