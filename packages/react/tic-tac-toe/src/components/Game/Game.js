import React from 'react';
import Board from '../Board/Board.js';
import calculateWinner from './calculateWinner.js';
import Status from './Status/Status.js';

export default class Game extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      history: [{
        squares: Array(9).fill(null),
      }],
      xIsNext: true,
    };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(index) {
    const currentSquares = this.state.history[this.state.history.length - 1];
    let newSquares = [...currentSquares.squares];
    if (calculateWinner(newSquares) || newSquares[index]) {
      return;
    }
    newSquares[index] = this.state.xIsNext ? 'X' : 'O';
    this.setState((state) => ({
      history: [...state.history, { squares: newSquares }],
      xIsNext: !state.xIsNext,
    }));
  }


  render() {
    const currentSquares = this.state.history[this.state.history.length - 1];
    const winner = calculateWinner(currentSquares.squares);
    const status = winner
      ? `${winner} won the game!`
      : `Next player: ${this.state.xIsNext ? 'X' : 'O'}`;

    return (
      <div className="game">
        <div className="game-board">
          <Board
            squares={currentSquares.squares}
            onClick={this.handleClick}
          />
        </div>
        <div className="game-info">
            <Status status={status} />
        </div>
      </div>
    );
  }
}
