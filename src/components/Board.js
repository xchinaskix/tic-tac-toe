import React, { Component } from 'react';
import '../App.css';

class Board extends Component {
    
    addSymbol(num) {
      const symb = this.props.value ? 'X' : 'O';
      const list = document.getElementsByClassName('square');
      const row = [...list].filter(e => +e.dataset.row === this.props.row);
      const el = row.find(i => +i.dataset.key === num);
      if (!el.innerHTML && !this.props.over) {
        el.innerHTML = `<span>${symb}</span>`
        const val = this.props.value ? true : false;
        this.props.onClick(val, num -1);
        el.classList.remove('pointer');
      }
    }

    clearRow() {
      const list = document.getElementsByClassName('square');
      [...list].forEach(el => {
        el.innerHTML = '';
        el.classList.add('pointer');
        el.classList.remove('win');
      });
    }

    finishGame() {
      const list = document.getElementsByClassName('square');
      [...list].forEach(el => el.classList.remove('pointer'));
    }

    markWinItem(row, i) {
      if (this.props.row === i) {
        const list = document.getElementsByClassName('square');
        [...list]
        .filter(el => +el.dataset.row === this.props.row)
        .forEach((el, idx) => {
          if (row[idx].win) {
            el.classList.add('win');
          }
        });
      }
    }

    render() {
      const numbers = [1, 2, 3];
      const classList = `board row${this.props.row}`;
      const listItems = numbers.map((number) =>
        <div className='square pointer' data-row={this.props.row} data-key={number} key={number} onClick={() => this.addSymbol(number)}></div>    
      );
  
      return (
        <div className={classList}>
          {listItems}
        </div>
      );
    }
}

export default Board;
