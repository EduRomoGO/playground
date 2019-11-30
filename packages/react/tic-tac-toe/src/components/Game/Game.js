import React, { useState } from 'react';
import Board from '../Board/Board.js';
import calculateWinner from './calculateWinner.js';
import Status from './Status/Status.js';

export default () => {
  const [history, setHistory] = useState([{
    squares: Array(9).fill(null),
  }]);
  const [xIsNext, setXIsNext] = useState(true);

  const getCurrentSquares = () => history[history.length - 1].squares;

  const handleClick = (index) => {
    const currentSquares = getCurrentSquares();
    const noWinner = calculateWinner(currentSquares) === null;
    const notPreviouslyClickedItem = currentSquares[index] === null;

    if (noWinner && notPreviouslyClickedItem) {
      const newSquares = [...currentSquares];
      newSquares[index] = xIsNext ? 'X' : 'O';
      setHistory([...history, { squares: newSquares }]);
      setXIsNext(!xIsNext);
    }
  }

  const currentSquares = getCurrentSquares();
  const winner = calculateWinner(currentSquares);
  const status = winner
    ? `${winner} won the game!`
    : `Next player: ${xIsNext ? 'X' : 'O'}`;

  return (
    <div className="game">
      <div className="game-board">
        <Board
          squares={currentSquares}
          onClick={handleClick}
        />
      </div>
      <div className="game-info">
          <Status status={status} />
      </div>
    </div>
  );
};
