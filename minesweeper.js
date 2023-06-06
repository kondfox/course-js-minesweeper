const canvas = document.getElementById('myCanvas');
const c = canvas.getContext('2d');
const actionButton = document.getElementById('action-button');

const size = 50;
const columns = canvas.width / size;
const rows = canvas.height / size;
const mine = 'mine';
const mineCount = 10;
const images = {
  'hidden': document.getElementById('hidden'),
  'mine': document.getElementById('mine'),
  '0': document.getElementById('field-0'),
  '1': document.getElementById('field-1'),
  '2': document.getElementById('field-2'),
  '3': document.getElementById('field-3'),
  '4': document.getElementById('field-4'),
  '5': document.getElementById('field-5'),
  '6': document.getElementById('field-6'),
  '7': document.getElementById('field-7'),
  '8': document.getElementById('field-8'),
};
const buttons = {
  start: 'assets/button-start.png',
  lost: 'assets/button-lost.png',
  won: 'assets/button-won.png',
}
let isGameOver;
let isFirstClick;
let exploredFields;
let map;
let exploredMap;

initGame();

canvas.addEventListener('click', function(event) {
  if (isGameOver) return;
  const x = event.offsetX;
  const y = event.offsetY;
  const col = Math.floor(x / size);
  const row = Math.floor(y / size);
  if (isFirstClick) {
    placeMines(map, mineCount, row, col);
    calculateFieldValues(map);
    isFirstClick = false;
  }
  exploreField(row, col);
  drawMap();
  if (map[row][col] === mine) {
    isGameOver = true;
    actionButton.src = buttons.lost;
  } else if (exploredFields === rows * columns - mineCount) {
    isGameOver = true;
    actionButton.src = buttons.won;
  }
});

actionButton.addEventListener('click', function() {
  initGame();
});

function initGame() {
  isGameOver = false;
  isFirstClick = true;
  exploredFields = 0;
  map = createMap();
  exploredMap = createExploredMap();
  drawMap();
  actionButton.src = buttons.start;
}

function exploreField(row, col) {
  if (exploredMap[row][col] === false) {
    exploredFields++;
    exploredMap[row][col] = true;
    if (map[row][col] === 0) {
      let neighbourCoordinates = findNeighbourFields(map, row, col);
      for (let i = 0; i < neighbourCoordinates.length; i++) {
        let coordinate = neighbourCoordinates[i]; // {row: 7, col: 1}
        exploreField(coordinate.row, coordinate.col); // rekurzió
      }
    }
  }
}

function calculateFieldValues(map) {
  for (let rowI = 0; rowI < rows; rowI++) {
    for (let colI = 0; colI < columns; colI++) {
      let field = map[rowI][colI];
      if (field !== mine) {
        let neighbourCoordinates = findNeighbourFields(map, rowI, colI); // [{row: 7, col: 1}, {row: 7, col: 2}, ...]
        let mineCount = countMines(map, neighbourCoordinates);
        map[rowI][colI] = mineCount;
      }
    }
  }
}

function countMines(map, coordinates) {
  let mineCount = 0;
  for (let i = 0; i < coordinates.length; i++) {
    let coordinate = coordinates[i]; // {row: 7, col: 1}
    let field = map[coordinate.row][coordinate.col];
    if (field === mine) {
      mineCount++;
    }
  }
  return mineCount;
}

function findNeighbourFields(map, rowI, colI) {
  let neighbourCoordinates = [];
  for (let row = rowI - 1; row <= rowI + 1; row++) {
    for (let col = colI - 1; col <= colI + 1; col++) {
      if (row >= 0 && row < rows && col >= 0 && col < columns) {
        if (row !== rowI || col !== colI) {
          neighbourCoordinates.push({row: row, col: col});
        }
      }
    }
  }
  return neighbourCoordinates;
}


function placeMines(map, mineCount, startRow, startCol) {
  let mines = 0;
  while (mines < mineCount) {
    let x = Math.floor(Math.random() * columns);
    let y = Math.floor(Math.random() * rows);
    if (x !== startCol && y !== startRow && map[y][x] !== mine) {
      map[y][x] = mine;
      mines++;
    }
  }
}

function createMap() {
  let map = [];
  for (let j = 0; j < rows; j++) {
    let row = [];
    for (let i = 0; i < columns; i++) {
      row[i] = 0;
    }
    map[j] = row;
  }
  return map;
}

function createExploredMap() {
  let exploredMap = [];
  for (let j = 0; j < rows; j++) {
    let row = [];
    for (let i = 0; i < columns; i++) {
      row[i] = false;
    }
    exploredMap[j] = row;
  }
  return exploredMap;
}

function drawMap() {
  for (let rowI = 0; rowI < rows; rowI++) {
    for (let colI = 0; colI < columns; colI++) {
      if (exploredMap[rowI][colI] === false) {
        drawImage(images.hidden, colI * size, rowI * size);
      } else {
        let field = map[rowI][colI];
        let image = images[field];
        drawImage(image, colI * size, rowI * size);
      }
    }
  }
}

function drawImage(image, x, y) {
  c.drawImage(image, x, y, size, size);
}