const image = document.getElementById('hidden');
const canvas = document.getElementById('myCanvas');
const c = canvas.getContext('2d');

const imgSize = 50;
const columns = canvas.width / imgSize;

for (let i = 0; i < columns; i++) {
  drawImage(i * imgSize, 0);
}

function drawImage(x, y) {
  c.drawImage(image, x, y, imgSize, imgSize);
}