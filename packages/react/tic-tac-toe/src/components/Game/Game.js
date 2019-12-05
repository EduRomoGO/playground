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
  };

  const getStatus = () => {
    const winner = calculateWinner(getCurrentSquares());

    return winner ? `${winner} won the game!` : `Next player: ${xIsNext ? 'X' : 'O'}`;
  };

  const jumpTo = move => {
    setXIsNext(false);
  };

  return (
    <div className="game">
      <div className="game-board">
        <Board
          squares={getCurrentSquares()}
          onClick={handleClick}
        />
      </div>
      <div className="game-info">
          <Status status={getStatus()} />
          <ol>
            {history.map((move, i) => {
              return <li key={i}>
                <button onClick={() => jumpTo(move)} data-testid="move">{`Go to move #${i}`}</button>
              </li>;
            })}
          </ol>
      </div>
    </div>
  );
};
