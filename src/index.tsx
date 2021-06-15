import React, {useState} from 'react';
import ReactDOM from "react-dom";
import './index.css';

interface Props {
  value: number,
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
const Square: React.FC<Props> = ({value}) => {
  return (
    <button className="square" onClick={function() { alert('click'); }}>
      {value}
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

//class Board extends React.Componentを function Boardとして書き直した。
function Board () {
  const status = 'Next player: X';
  const renderSquare = (i:number) => {
    return <Square value={i} />;
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
function Game (){
  return (
    <div className="game">
      <div className="game-board">
        <Board />
      </div>
      <div className="game-info">
        <div>{/* status */}</div>
        <ol>{/* TODO */}</ol>
      </div>
    </div>
  )
}

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

