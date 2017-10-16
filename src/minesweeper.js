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

const getNumberOfNeighborBombs = (bombBoard, rowIndex, columnIndex) => {
  let neighborOffsets = [[-1, -1],[-1, 0],[-1, 1],[0, -1],[0, 1],[1, -1],[1, 0],[1, 1]];
  const numberOfRows = bombBoard.length;
  const numberOfColumns = bombBoard[0].length;
  let numberOfBombs = 0;
  neighborOffsets.forEach(offset => {
    const neighborRowIndex = rowIndex + offset[0];
    const neighborColumnIndex = columnIndex + offset[1];
    if ( neighborRowIndex >= 0 && neighborRowIndex < numberOfRows && neighborColumnIndex >= 0 && neighborColumnIndex < numberOfColumns ) {
      if ( bombBoard[neighborRowIndex][neighborColumnIndex] === 'B' ) {
        numberOfBombs++;
      }
    }
  })
  return numberOfBombs
}

const flipTile = (playerBoard, bombBoard, rowIndex, columnIndex) => {
  if ( playerBoard[rowIndex][columnIndex] !== ' ' ) {
    console.log('This tile has already been flipped!');
    return
  } else if ( bombBoard[rowIndex][columnIndex] === 'B' ) {
    playerBoard[rowIndex][columnIndex] = 'B';
  } else {
    playerBoard[rowIndex][columnIndex] = getNumberOfNeighborBombs(bombBoard, rowIndex, columnIndex)
  }
}

const printBoard = (board) => {
  console.log(board.map(row => row.join(' | ')).join('\n'));
  //console.log(board)
}



let playerBoard = generatePlayerBoard(3, 4);
let bombBoard = generateBombBoard(3, 4, 5);
printBoard(playerBoard)
printBoard(bombBoard)

flipTile(playerBoard, bombBoard, 0, 0)
printBoard(playerBoard)

console.log('END')

