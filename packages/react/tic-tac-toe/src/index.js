import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

// Let’s fill the Square component with an “X” when we click it. First, change the button tag that is returned from the Square component’s render() function to this

const Square = ({onClick, value}) => (
  <button className="square" onClick={onClick}>{value}</button>
);

const Board = ({squares, onClick}) => {
  const renderSquare = i => {
    return <Square value={squares[i]} onClick={() => onClick(i)} />;
  }

  return (
    <div>
      <div className="board-row">
        {renderSquare(0)}
        {renderSquare(1)}
        {renderSquare(2)}
      </div>
      <div className="board-row">
        {renderSquare(3)}
        {renderSquare(4)}
        {renderSquare(5)}
      </div>
      <div className="board-row">
        {renderSquare(6)}
        {renderSquare(7)}
        {renderSquare(8)}
      </div>
    </div>
  );
};

class Game extends React.Component {
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

ReactDOM.render(
  <Game />,
  document.getElementById('root')
);
