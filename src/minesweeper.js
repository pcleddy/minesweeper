const generatePlayerBoard = (numberOfRows, numberOfColumns) => {
  let board = []
  for (let rowNumber = 0; rowNumber < numberOfRows; rowNumber++) {
    let row = []
    for (let colNumber = 0; colNumber < numberOfColumns; colNumber++) {
      row.push(' ')
    }
    board.push(row);
  }
  console.log(board);
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
  console.log(board);

  let numberOfBombsPlaced = 0;
  while (numberOfBombsPlaced < numberOfBombs) {
    let randomRowIndex = Math.floor(Math.random() * numberOfRows);
    //console.log(randomRowIndex);
    let randomColumnIndex = Math.floor(Math.random() * numberOfColumns);
    //console.log(randomColumnIndex);
    board[randomRowIndex][randomColumnIndex] = 'B';
    numberOfBombsPlaced++;
  }
  console.log(board);

  return board;
}

const printBoard = (board) => {
  console.log(board.map(row => row.join(' | ')).join('\n'));
  //console.log(board)
}



let playerBoard = generatePlayerBoard(3, 4);
let bombBoard = generateBombBoard(3, 4, 5);
printBoard(playerBoard)
printBoard(bombBoard)

console.log('END')

