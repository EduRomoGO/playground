import React from 'react';
import Board from '../Board/Board.js';

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
    this.setState({
      history: [...this.state.history, { squares: newSquares }],
      xIsNext: !this.state.xIsNext,
    });
  }


  render() {
    const currentSquares = this.state.history[this.state.history.length - 1];
    const winner = calculateWinner(currentSquares.squares);
    let status;
    if (winner) {
      status = `${winner} won the game!`;
    } else {
      status = `Next player: ${this.state.xIsNext ? 'X' : 'O'}`;
    }

    return (
      <div className="game">
        <div className="game-board">
          <Board squares={currentSquares.squares} onClick={this.handleClick} />
        </div>
        <div className="game-info">
          <div className="status">{status}</div>
          <ol>{/* TODO */}</ol>
        </div>
      </div>
    );
  }
}

// ========================================


function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}
