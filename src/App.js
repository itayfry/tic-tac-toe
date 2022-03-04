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
  const [gameOver, setGameOver] = useState(false);
  const [board, setBoard] = useState([
    [null, null, null],
    [null, null, null],
    [null, null, null],
  ]);
  const [winner, setWinner] = useState(false);
  const isBoardFull = (board) =>
    board.every((row) => row.every((cell) => cell !== null));
  const isColumnWin = (board, player) => {
    for (let cell = 0; cell < 3; cell++) {
      let win = true;
      for (let row = 0; row < 3; row++) {
        if (board[row][cell] !== player) win = false;
      }
      if (win) return true;
    }
    return false;
  };
  const isDiagonalWin = (board, player) =>
    (board[0][0] === player &&
      board[1][1] === player &&
      board[2][2] === player) ||
    (board[2][0] === player &&
      board[1][1] === player &&
      board[0][2] === player);
  const isPlayerWinner = (board, player) =>
    board.some((row) => row.every((cell) => cell === player)) ||
    isColumnWin(board, player) || isDiagonalWin(board, player);
  const getWinner = (board) =>
    isPlayerWinner(board, "X") ? "X" : isPlayerWinner(board, "Y") ? "Y" : false;
  const toggleCurrentPlayer = () =>
    currentPlayer === "X" ? setCurrentPlayer("Y") : setCurrentPlayer("X");
  const onCellClick = (rowIndex, cellIndex) => {
    if (!gameOver) {
      const clonedBoard = cloneBoard(board);
      clonedBoard[rowIndex][cellIndex] = currentPlayer;
      setBoard(clonedBoard);
      const _winner = getWinner(clonedBoard);
      setWinner(_winner);
      setGameOver(_winner || isBoardFull(clonedBoard));
      toggleCurrentPlayer();
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Tic Tac Toe</h1>
        <h2>
          {gameOver
            ? `Winner winner chicken dinner: ${winner}`
            : `Current player: ${currentPlayer}`}
        </h2>
        <table>
          <tbody>
            {board.map((row, index) => (
              <Row
                key={index}
                index={index}
                row={row}
                onCellClick={onCellClick}
              />
            ))}
          </tbody>
        </table>
      </header>
    </div>
  );
}

export default App;
