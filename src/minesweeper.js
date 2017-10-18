 class Board {
   constructor(numberOfRows, numberOfColumns, numberOfBombs) {
     this._numberOfBombs = numberOfBombs;
     this._numberOfTiles = numberOfRows * numberOfColumns;
     this._playerBoard = this.generatePlayerBoard(numberOfRows, numberOfColumns);
     this._bombBoard = this.generateBombBoard(numberOfRows, numberOfColumns, numberOfBombs);
   }

   get playerBoard() {
     return this._playerBoard;
   }

   flipTile(rowIndex, columnIndex) {
     if ( this._playerBoard[rowIndex][columnIndex] !== ' ' ) {
       console.log('This tile has already been flipped!');
       return
     } else if ( this._bombBoard[rowIndex][columnIndex] === 'B' ) {
       this._playerBoard[rowIndex][columnIndex] = 'B';
     } else {
       this._playerBoard[rowIndex][columnIndex] = this.getNumberOfNeighborBombs(rowIndex, columnIndex)
     }
     this._numberOfTiles--;
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
     return ( this._numberOfTiles !== this._numberOfBombs );
   }


 }

const generatePlayerBoard = (numberOfRows, numberOfColumns) => {
  let board = []
  for (let rowNumber = 0; rowNumber < numberOfRows; rowNumber++) {
    let row = []
    for (let colNumber = 0; colNumber < numberOfColumns; colNumber++) {
      row.push(' ')
    }
    board.push(row);
  }
  //console.log(board);
  return board;
}

const generateBombBoard = (numberOfRows, numberOfColumns, numberOfBombs) => {
  let board = []
  for (let rowNumber = 0; rowNumber < numberOfRows; rowNumber++) {
    let row = []
    for (let colNumber = 0; colNumber < numberOfColumns; colNumber++) {
      row.push(null)
    }
    board.push(row);
  }
  //console.log(board);

  let numberOfBombsPlaced = 0;
  while (numberOfBombsPlaced < numberOfBombs) {
    let randomRowIndex = Math.floor(Math.random() * numberOfRows);
    let randomColumnIndex = Math.floor(Math.random() * numberOfColumns);
    if ( board[randomRowIndex][randomColumnIndex] !== 'B' ) {
      board[randomRowIndex][randomColumnIndex] = 'B';
      numberOfBombsPlaced++;
    }
  }
  return board;
}

printBoard = (board) => {
  console.log(board.map(row => row.join(' | ')).join('\n'));
  //console.log(board)
}



let playerBoard = generatePlayerBoard(3, 4);
let bombBoard = generateBombBoard(3, 4, 5);
printBoard(playerBoard)
printBoard(bombBoard)

//flipTile(playerBoard, bombBoard, 0, 0)
printBoard(playerBoard)

console.log('END')

