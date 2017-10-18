class Game {

  constructor(numberOfRows, numberOfColumns, numberOfBombs) {
    this._board = new Board(numberOfRows, numberOfColumns, numberOfBombs);
  }

  playMove(rowIndex, columnIndex) {
    this._board.flipTile(rowIndex, columnIndex);
    if (this._board.playerBoard[rowIndex][columnIndex] === 'B') {
      console.log('Boom! Game Over!');
      this._board.print(this._board.playerBoard);
    } else if ( ! this._board.hasSafeTiles() ) {
      console.log('No safe tiles, win!');
    } else {
      console.log('Current board: ');
      this._board.print(this._board.playerBoard);
    }
  }
}

class Board {

  constructor(numberOfRows, numberOfColumns, numberOfBombs) {
    this._numberOfBombs = numberOfBombs;
    this._numberOfHiddenTiles = numberOfRows * numberOfColumns;
    this._playerBoard = Board.generatePlayerBoard(numberOfRows, numberOfColumns);
    this._bombBoard = Board.generateBombBoard(numberOfRows, numberOfColumns, numberOfBombs);
    this.print(this._bombBoard);
  }

  get playerBoard() {
   return this._playerBoard;
  }

  flipTile(rowIndex, columnIndex) {
    if ( this._playerBoard[rowIndex][columnIndex] !== '-' ) {
      console.log('This tile has already been flipped!');
      return
    } else if ( this._bombBoard[rowIndex][columnIndex] === 'B' ) {
      this._playerBoard[rowIndex][columnIndex] = 'B';
    } else {
      this._playerBoard[rowIndex][columnIndex] = this.getNumberOfNeighborBombs(rowIndex, columnIndex)
    }
      this._numberOfHiddenTiles--;
      console.log('Number of hidden tiles: ' + this._numberOfHiddenTiles)
  }

  getNumberOfNeighborBombs(rowIndex, columnIndex) {
    let neighborOffsets = [[-1, -1],[-1, 0],[-1, 1],[0, -1],[0, 1],[1, -1],[1, 0],[1, 1]];
    const numberOfRows = this._bombBoard.length;
    const numberOfColumns = this._bombBoard[0].length;
    let numberOfBombs = 0;
    neighborOffsets.forEach(offset => {
      const neighborRowIndex = rowIndex + offset[0];
      const neighborColumnIndex = columnIndex + offset[1];
      if ( neighborRowIndex >= 0 && neighborRowIndex < numberOfRows && neighborColumnIndex >= 0 && neighborColumnIndex < numberOfColumns ) {
        if ( this._bombBoard[neighborRowIndex][neighborColumnIndex] === 'B' ) {
          numberOfBombs++;
        }
      }
    })
    return numberOfBombs
  }

  hasSafeTiles() {
    return ( this._numberOfHiddenTiles !== this._numberOfBombs );
  }

  print(board) {
    console.log(board.map(row => row.join(' | ')).join('\n'));
  }

  static generatePlayerBoard(numberOfRows, numberOfColumns) {
    let board = []
    for (let rowNumber = 0; rowNumber < numberOfRows; rowNumber++) {
      let row = []
      for (let colNumber = 0; colNumber < numberOfColumns; colNumber++) {
        row.push('-')
      }
      board.push(row);
    }
    console.log(board);
    return board;
  }

  static generateBombBoard(numberOfRows, numberOfColumns, numberOfBombs) {
    let board = []
    for (let rowNumber = 0; rowNumber < numberOfRows; rowNumber++) {
      let row = []
      for (let colNumber = 0; colNumber < numberOfColumns; colNumber++) {
        row.push('-')
      }
      board.push(row);
    }

    let numberOfBombsPlaced = 0;
    while (numberOfBombsPlaced < numberOfBombs) {
      let randomRowIndex = Math.floor(Math.random() * numberOfRows);
      let randomColumnIndex = Math.floor(Math.random() * numberOfColumns);
      if ( board[randomRowIndex][randomColumnIndex] !== 'B' ) {
        board[randomRowIndex][randomColumnIndex] = 'B';
        numberOfBombsPlaced++;
      }
    }
    console.log(board);
    return board;
  }
}

const g = new Game(6, 6, 3);
g.playMove(0, 0);
g.playMove(1, 1);
g.playMove(2, 2);
g.playMove(3, 3);
g.playMove(4, 4);
g.playMove(5, 5);

console.log('END')

