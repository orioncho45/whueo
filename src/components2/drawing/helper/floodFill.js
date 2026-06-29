import hexToRgb from "./hexToRgb"



const floodFill = (
  startX,
  startY,
  fillColor,
  canvasRef,
  ctxRef
) => {
  startX = Math.floor(startX);
  startY = Math.floor(startY);

  const canvas = canvasRef.current;
  const ctx = ctxRef.current;

  const width = canvas.width;
  const height = canvas.height;

  if (
    startX < 0 ||
    startY < 0 ||
    startX >= width ||
    startY >= height
  ) {
    return;
  }

  const imageData = ctx.getImageData(
    0,
    0,
    width,
    height
  );

  const data = imageData.data;

  const startPos =
    (startY * width + startX) * 4;

  const targetR = data[startPos];
  const targetG = data[startPos + 1];
  const targetB = data[startPos + 2];
  const targetA = data[startPos + 3];

  const rgb = hexToRgb(fillColor);

  const fillR = rgb.r;
  const fillG = rgb.g;
  const fillB = rgb.b;
  const fillA = 255;

  // already same color
  if (
    targetR === fillR &&
    targetG === fillG &&
    targetB === fillB &&
    targetA === fillA
  ) {
    return;
  }

  const visited =
    new Uint8Array(width * height);

  const stack = [
    [startX, startY]
  ];

  while (stack.length > 0) {

    const [x, y] = stack.pop();

    if (
      x < 0 ||
      y < 0 ||
      x >= width ||
      y >= height
    ) {
      continue;
    }

    const pixelIndex =
      y * width + x;

    if (visited[pixelIndex]) {
      continue;
    }

    visited[pixelIndex] = 1;

    const pos = pixelIndex * 4;

    if (
      data[pos] !== targetR ||
      data[pos + 1] !== targetG ||
      data[pos + 2] !== targetB ||
      data[pos + 3] !== targetA
    ) {
      continue;
    }

    data[pos] = fillR;
    data[pos + 1] = fillG;
    data[pos + 2] = fillB;
    data[pos + 3] = fillA;

    stack.push([x + 1, y]);
    stack.push([x - 1, y]);
    stack.push([x, y + 1]);
    stack.push([x, y - 1]);
  }

  ctx.putImageData(imageData, 0, 0);
};

export default floodFill;
