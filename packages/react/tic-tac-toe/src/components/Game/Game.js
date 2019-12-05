import React, { useState } from 'react';
import Board from '../Board/Board.js';
import calculateWinner from './calculateWinner.js';
import Status from './Status/Status.js';

export default () => {
  const [history, setHistory] = useState([{
    squares: Array(9).fill(null),
  }]);
  const [currentMove, setCurrentMove] = useState(0);

  const getCurrentSquares = () => history[currentMove].squares;
  const isCurrentMoveEven = currentMove % 2 === 0;
  const getNextSymbol = () => isCurrentMoveEven ? 'X' : 'O';

  const handleClick = (index) => {
    const currentSquares = getCurrentSquares();
    const noWinner = calculateWinner(currentSquares) === null;
    const notPreviouslyClickedItem = currentSquares[index] === null;

    if (noWinner && notPreviouslyClickedItem) {
      const newSquares = [...currentSquares];
      newSquares[index] = getNextSymbol();
      setHistory([...history.slice(0, currentMove+1), { squares: newSquares }]);
      setCurrentMove(currentMove + 1);
    }
  };

  const getStatus = () => {
    const winner = calculateWinner(getCurrentSquares());

    return winner ? `${winner} won the game!` : `Next player: ${getNextSymbol()}`;
  };

  const jumpTo = (move, i) => {
    setCurrentMove(i);
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
                <button onClick={() => jumpTo(move, i)} data-testid="move">{`Go to move #${i}`}</button>
              </li>;
            })}
          </ol>
      </div>
    </div>
  );
};
