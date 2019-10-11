import React, { Component } from 'react';
import Board from './components/Board';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      squares: [
        [{val: '', win: false}, {val: '', win: false}, {val: '', win: false}],
        [{val: '', win: false}, {val: '', win: false}, {val: '', win: false}],
        [{val: '', win: false}, {val: '', win: false}, {val: '', win: false}]
      ],
      xIsNext: true,
      over: false,
    };
    this.references = Array(3).fill(0).map(() => React.createRef());
  }

  handleClick(val, pos, row) {
    const arr = this.state.squares;
    arr[row][pos].val = val;
    const xIsNext = !this.state.xIsNext;
    if (!document.querySelector('.start').classList.contains('hide')) {
      document.querySelector('.start').classList.add('hide');
    }
    
    this.setState({xIsNext, squares: arr});
    this.updGameState(pos, row);
  }

  getRef(i) {
    return this.references[i];
  }

  clearBoard() {
    this.references.forEach(el => el.current.clearRow());
    document.querySelector('.start').classList.remove('hide');
  }

  finishedGame() {
    this.references.forEach(el => el.current.finishGame());
  }

  markedWin() {
    this.references.forEach((el, idx) => el.current.markWinItem(this.state.squares[idx], idx+1));
  }

  updGameState(pos, row) {
    const res = this.checkWinner(pos, row);
    if (res) {
      this.markedWin();
      document.querySelector('.winner').innerHTML = `Winner is ${this.state.xIsNext ? 'X': 'O'}`;
      this.showBoard();
    } else {
      this.checkIsFull();
    }
  }

  showBoard() {
    const info = document.querySelector('.info');
    info.classList.add('board');
    this.setState({over: true});
    this.finishedGame();
    document.querySelector('.retry').addEventListener('click', () => {
      this.setState({squares: [
        [{val: '', win: false}, {val: '', win: false}, {val: '', win: false}],
        [{val: '', win: false}, {val: '', win: false}, {val: '', win: false}],
        [{val: '', win: false}, {val: '', win: false}, {val: '', win: false}]
      ], xIsNext: true, over: false});
      info.classList.remove('board');
      this.clearBoard();
    });
  }

  checkWinner(pos, row) {
    return this.checkRow(row) || this.checkLineOnPos(pos) || this.checkDiagonal();
  }

  checkRow(row) {
    const arr = this.state.squares;
    const response = arr[row].every(i => i.val === arr[row][0].val);
    if (response) {
      arr[row].every(i => i.win = true);
    }
    return response;
  }

  checkLineOnPos(pos) {
    const arr = this.state.squares;
    const line = arr.map(i => i[pos]);
    const response = line.every(i => i.val === line[0].val && i.val !== '');
    if (response) {
      line.every(i => i.win = true);
    }
    return response;
  }

  checkLine(line) {
    const response = line.every(i => i.val === line[0].val && i.val !== '');
    if (response) {
      line.every(i => i.win = true);
    }
    return response;
  }

  checkDiagonal() {
    const arr = this.state.squares;
    const diagonal1 = [arr[0][0], arr[1][1], arr[2][2]];
    const diagonal2 = [arr[0][2], arr[1][1], arr[2][0]];
    return this.checkLine(diagonal1) || this.checkLine(diagonal2);
  }

  checkIsFull() {
    const full = this.state.squares.every(i => i.every(k => k.val !== ''));
    if (full) {
      document.querySelector('.winner').innerHTML = `Game over without winner`;
      this.showBoard();
    }
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>tic tac toe</h2>
        </div>
        <div className='mainBoard'>
          <span className='start'>Let's play</span>
          <Board value={this.state.xIsNext} row={1} over={this.state.over} ref={this.getRef(0)} onClick={(val, pos) => this.handleClick(val, pos, 0)}/>
          <Board value={this.state.xIsNext} row={2} over={this.state.over} ref={this.getRef(1)} onClick={(val, pos) => this.handleClick(val, pos, 1)}/>
          <Board value={this.state.xIsNext} row={3} over={this.state.over} ref={this.getRef(2)} onClick={(val, pos) => this.handleClick(val, pos, 2)}/>
        </div>
        <div className='info'>
          <span className='winner'></span>
          <button className='retry'>Try Again</button>
        </div>
      </div>
    );
  }
}



export default App;
