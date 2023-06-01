const image = document.getElementById('hidden');
const canvas = document.getElementById('myCanvas');
const c = canvas.getContext('2d');

const size = 50;

drawImage(0, 0);
drawImage(100, 100);
drawImage(123, 234);

function drawImage(x, y) {
  c.drawImage(image, x, y, size, size);
}