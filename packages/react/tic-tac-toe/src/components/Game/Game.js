import React, { useState } from 'react';
import Board from '../Board/Board.js';
import calculateWinner from './calculateWinner.js';
import Status from './Status/Status.js';

export default () => {
  const [history, setHistory] = useState([{
    squares: Array(9).fill(null),
  }]);
  const [xIsNext, setXIsNext] = useState(true);

  const handleClick = (index) => {
    const currentSquares = history[history.length - 1].squares;

    if (calculateWinner(currentSquares) || currentSquares[index]) {
      return;
    }

    const newSquares = [...currentSquares];

    newSquares[index] = xIsNext ? 'X' : 'O';
    setHistory([...history, { squares: newSquares }]);
    setXIsNext(!xIsNext);
  }

  const currentSquares = history[history.length - 1];
  const winner = calculateWinner(currentSquares.squares);
  const status = winner
    ? `${winner} won the game!`
    : `Next player: ${xIsNext ? 'X' : 'O'}`;

  return (
    <div className="game">
      <div className="game-board">
        <Board
          squares={currentSquares.squares}
          onClick={handleClick}
        />
      </div>
      <div className="game-info">
          <Status status={status} />
      </div>
    </div>
  );
};
