import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

// class Square extends React.Component {
//   constructor(props) {
//     super(props)
//     this.state = {
//       value: null
//     }
//   }
//   render() {
//     return (
//       <button 
//         className="square" 
//         onClick={() => this.props.onClick()}
//       >
//         {this.props.value}
//       </button>
//     )
//   }
// }

// 函数组件
function Square(props) {
  return (
    <button className={props.win?'winner square':'square' } onClick={props.onClick}>
      {props.value}
    </button>
  )
}

class Board extends React.Component {
  list = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
  ]

  render() {
    const winnerLoc = this.props.winnerLoc
    return (
      <div>
        {
          this.list.map((item, index) => (
            <div className='board-row' key={'board-row' + index}>
            {
              item.map((it, keys) => (
                <Square 
                  key={keys}
                  value={this.props.squares[it]}
                  win={winnerLoc.indexOf(it) !== -1}
                  onClick={() => this.props.onClick(it)}
                />
              ))
            }
            </div>
          ))
        }
      </div>
    );
  }
}

class Game extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      history: [{
        squares: Array(9).fill(null)
      }],
      xIsNext: true,
      stepNumber: 0,
      currentLoc: ''
    }
  }

  handleClick(i) {
    const history = this.state.history.slice(0, this.state.stepNumber + 1)
    const current = history[history.length - 1]
    const squares = current.squares.slice()
    // 当前所下位置i
    const currentLoc = `行： ${parseInt(i / 3) + 1}, 列： ${parseInt(i % 3) + 1}`
    this.setState({
      currentLoc
    })
    if (calculateWinner(squares) || squares[i]) {
      return
    }
    squares[i] = this.state.xIsNext ? 'X' : 'O'
    this.setState({ 
      history: history.concat([{
        squares
      }]),
      xIsNext: !this.state.xIsNext,
      stepNumber: history.length
     })
  }

  jumpTo(step) {
    this.setState({
      stepNumber: step,
      xIsNext: (step % 2) === 0
    })
  }

  jumpToPrev() {
    if (this.state.stepNumber === 0) {
      return
    }
    this.jumpTo(this.state.stepNumber - 1)
  }

  jumpToNext() {
    if (this.state.stepNumber === this.state.history.length - 1) {
      return
    }
    this.jumpTo(this.state.stepNumber + 1)
  }

  render() {
    const history = this.state.history
    const current = history[this.state.stepNumber]
    const info = calculateWinner(current.squares)
    let winner = null
    let loc = []
    if (info) {
      winner = info.winner
      loc = info.loc
    }
    const moves = history.map((item, index) => {
      const desc = index ? `Go to move #${index}` : 'Go to game start'
      return (
        <li key={index} className={this.state.stepNumber === index ? 'current' : ''}>
          <button onClick={() => this.jumpTo(index)}>{desc}</button>
        </li>
      )
    })

    let status
    if (winner) {
      status = `Winner:${winner}`
    } else {
      status = `Next player: ${this.state.xIsNext? 'X' : 'O'} `;
    }

    return (
      <div className="game">
        <div className="game-board">
          <Board 
            squares={current.squares}
            onClick={i => this.handleClick(i)}
            winnerLoc={loc}
          />
        </div>
        <div className="game-info">
          <div onClick={() => this.jumpToPrev()} style={{cursor:'pointer',color: 'blue'}}>上一个</div>
          <div onClick={() => this.jumpToNext()} style={{cursor:'pointer',color: 'blue'}}>下一个</div>
          <div>当前下棋位置: {this.state.currentLoc}</div>        
          <div>{status}</div>
          <ol>{moves}</ol>
        </div>
      </div>
    );
  }
}

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
      console.log(a, b, c)
      return {
        winner: squares[a],
        loc: [a, b, c]
      };
    }
  }
  return null;
}

// ========================================

ReactDOM.render(<Game />, document.getElementById('root'));
