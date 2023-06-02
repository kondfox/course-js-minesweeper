const image = document.getElementById('hidden');
const canvas = document.getElementById('myCanvas');
const c = canvas.getContext('2d');

const size = 50;
const columns = canvas.width / size;
const rows = canvas.height / size;

let map = [
  [9, 8, 0, 1, 1, 1, 0, 0],
  [0, 0, 1, 2, 3]
];

console.log(map);

drawMap();

function drawMap() {
  for (let i = 0; i < columns; i++) {
    for (let j = 0; j < rows; j++) {
      drawImage(i * size, j * size);
    }
  }
}

function drawImage(x, y) {
  c.drawImage(image, x, y, size, size);
}