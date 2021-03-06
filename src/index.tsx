import React, {useState} from 'react';
import ReactDOM from "react-dom";
import './index.css';

//Squareの値と、型のエイリアス
type SquareValue = 'X' | 'O' | null;

//Winnerを計算
const calculateWinner = (squares: SquareValue[]): SquareValue => {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
};

//Propsを、squareprops, boardpropsにする
interface SquareProps {
  value: SquareValue,
  onClick(): void,
}
//class Square extends React.Componentをfunctionに書き換える。
// class Square extends React.Component {
//   render() {
//     return (
//       <button className="square">
//         {/* TODO */}
//       </button>
//     );
//   }
// }

//class Square extends React.Componentを function Squareとして書き直した。
//データをProps経由で渡す
const Square: React.FC<SquareProps> = (props) => {
  return (
    <button className="square" onClick={props.onClick}>
      {props.value}
    </button>
  )
}

//class Square extends React.Componentをfunctionに書き換える。
// class Board extends React.Component {
//   renderSquare(i) {
//     return <Square />;
//   }

//   render() {
//     const status = 'Next player: X';

//     return (
//       <div>
//         <div className="status">{status}</div>
//         <div className="board-row">
//           {this.renderSquare(0)}
//           {this.renderSquare(1)}
//           {this.renderSquare(2)}
//         </div>
//         <div className="board-row">
//           {this.renderSquare(3)}
//           {this.renderSquare(4)}
//           {this.renderSquare(5)}
//         </div>
//         <div className="board-row">
//           {this.renderSquare(6)}
//           {this.renderSquare(7)}
//           {this.renderSquare(8)}
//         </div>
//       </div>
//     );
//   }
// }

//BoardPropsを作成
interface BoardProps {
  squares: SquareValue[],
  onClick(i:number): void,
}
//class Board extends React.Componentを function Boardとして書き直した。
const Board:React.FC<BoardProps> = (props) => {
  const status = 'Next player: X';
  const renderSquare = (i:number) => {
    return <Square value={props.squares[i]} onClick ={() => props.onClick(i)}/>;
  }

  return (
    <div>
      <div className="status">{status}</div>
      <div className="board-row">
        {/* {this.renderSquare(0)} */}
        {renderSquare(0)}
        {/* {this.renderSquare(1)} */}
        {renderSquare(1)}
        {/* {this.renderSquare(2)} */}
        {renderSquare(2)}
      </div>
      <div className="board-row">
        {/* {this.renderSquare(3)} */}
        {renderSquare(3)}
        {/* {this.renderSquare(4)} */}
        {renderSquare(4)}
        {/* {this.renderSquare(5)} */}
        {renderSquare(5)}
      </div>
      <div className="board-row">
        {/* {this.renderSquare(6)} */}
        {renderSquare(6)}
        {/* {this.renderSquare(7)} */}
        {renderSquare(7)}
        {/* {this.renderSquare(8)} */}
        {renderSquare(8)}
      </div>
    </div>
  )
}

//class Game extends React.Componentをfunctionに書き換える。
// class Game extends React.Component {
//   render() {
//     return (
//       <div className="game">
//         <div className="game-board">
//           <Board />
//         </div>
//         <div className="game-info">
//           <div>{/* status */}</div>
//           <ol>{/* TODO */}</ol>
//         </div>
//       </div>
//     );
//   }
// }

//class Gamee extends React.Componentを function Gameとして書き直した。
const Game: React.FC = () => {
  const [xIsNext, setXIsNext] = useState<boolean>(true);
  const [stepNumber, setStepNumber] = useState<number>(0);
  const [history, setHistory] = useState<{squares: SquareValue[]}[]>([
    {
      squares: Array(9).fill(null)
    }
  ]);

  const handleClick = (i: number): void => {
    const newHistory = history.slice(0, stepNumber + 1);
    const current = newHistory[newHistory.length - 1];
    const squares = current.squares.slice();
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    squares[i] = xIsNext ? "X" : "O";
    setHistory(newHistory.concat([
      {
        squares: squares
      }
    ]));
    setStepNumber(newHistory.length);
    setXIsNext(!xIsNext);
  };

  const jumpTo = (step: number): void => {
    setStepNumber(step);
    setXIsNext((step % 2) === 0)
  };


  const current = history[stepNumber];
  const winner = calculateWinner(current.squares);

  const moves = history.map((step, move) => {
    const desc = move ?
      'Go to move #' + move :
      'Go to game start';
    return (
      <li key={move}>
        <button onClick={() => jumpTo(move)}>{desc}</button>
      </li>
    );
  });

  let status;
  if (winner) {
    status = "Winner: " + winner;
  } else {
    status = "Next player: " + (xIsNext ? "X" : "O");
  }

  return (
    <div className="game">
      <div className="game-board">
        <Board
          squares={current.squares}
          onClick={i => handleClick(i)}
        />
      </div>
      <div className="game-info">
        <div>{status}</div>
        <ol>{moves}</ol>
      </div>
    </div>
  );
};

// ========================================

// ReactDOM.render(
//   <Game />,
//   document.getElementById('root')
// );

ReactDOM.render(
  <React.StrictMode>
    <Game />
  </React.StrictMode>,
  document.getElementById("root")
);

