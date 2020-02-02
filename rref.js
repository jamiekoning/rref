var rows = 0;
var cols = 0;

var matrix = [];

function createMatrix() {
  const rowsValue = document.getElementById("rows").value;
  const colsValue = document.getElementById("cols").value;

  rows = Number(rowsValue);
  cols = Number(colsValue);

  console.log(rows, cols);

  matrix = Array(rows)
    .fill()
    .map(() => Array(cols).fill(0));

  console.log(matrix);
  printMatrix();
}

function randomInt(max) {
  return parseInt(Math.random() * max, 10) + 1;
}

function randomMatrix() {
  rows = randomInt(10);
  cols = randomInt(10);

  matrix = Array(rows)
    .fill()
    .map(() => Array(cols).fill(0));

  const signWeight = randomInt(10);

  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      let sign = 1;
      const signRandom = randomInt(10);

      if (signRandom >= signWeight) {
        sign = -1;
      }

      matrix[i][j] = sign * randomInt(10);
    }
  }

  printMatrix();
}

function onChangeMatrixEntry() {
  const row = this.getAttribute("row");
  const col = this.getAttribute("col");

  matrix[row][col] = Number(this.value);
}

function printMatrix() {
  let prevMatrixDiv = document.getElementById("matrix");

  if (prevMatrixDiv !== null) {
    prevMatrixDiv.parentNode.removeChild(prevMatrixDiv);
  }

  let prevSolvedMatrixDiv = document.getElementById("solvedMatrix");

  if (prevSolvedMatrixDiv !== null) {
    prevSolvedMatrixDiv.parentNode.removeChild(prevSolvedMatrixDiv);
  }

  let matrixDiv = document.createElement("div");
  matrixDiv.setAttribute("id", "matrix");

  var header = document.createElement("h2");
  header.innerHTML = "Input Matrix:";
  matrixDiv.appendChild(header);

  matrix.forEach((row, i) => {
    let rowDiv = document.createElement("div");

    row.forEach((col, j) => {
      let matrixEntry = document.createElement("input");
      //matrixEntry.setAttribute("type", "number");
      matrixEntry.setAttribute("value", String(col));
      matrixEntry.setAttribute("row", i);
      matrixEntry.setAttribute("col", j);
      matrixEntry.setAttribute("onchange", "onChangeMatrixEntry.call(this);");

      rowDiv.appendChild(matrixEntry);
    });

    matrixDiv.appendChild(rowDiv);
  });

  document.body.appendChild(matrixDiv);
}

function printSolvedMatrix() {
  if (rows === 0 && cols === 0) {
    return;
  }

  if (matrix.length === 0) {
    return;
  }

  let prevMatrixDiv = document.getElementById("solvedMatrix");

  if (prevMatrixDiv !== null) {
    prevMatrixDiv.parentNode.removeChild(prevMatrixDiv);
  }

  var rule = document.createElement("hr");

  let matrixDiv = document.createElement("div");

  matrixDiv.setAttribute("id", "solvedMatrix");

  matrixDiv.appendChild(rule);

  var header = document.createElement("h2");
  header.innerHTML = "RREF Matrix:";
  matrixDiv.appendChild(header);

  matrix.forEach((row, i) => {
    let rowDiv = document.createElement("div");

    row.forEach((col, j) => {
      let matrixEntry = document.createElement("input");
      //matrixEntry.setAttribute("type", "number");
      matrixEntry.setAttribute("value", String(col));
      matrixEntry.setAttribute("readonly", "readonly");

      rowDiv.appendChild(matrixEntry);
    });

    matrixDiv.appendChild(rowDiv);
  });

  document.body.appendChild(matrixDiv);
}

function handleClickReduce() {
  calculateRREF();
  printSolvedMatrix();
}

function calculateRREF() {
  let r = -1;
  let i = 0;

  for (let j = 0; j < cols; j++) {
    i = r + 1;

    while (i < rows && matrix[i][j] === 0) {
      i += 1;
    }

    if (i < rows) {
      r += 1;

      let swap = matrix[r];
      matrix[r] = matrix[i];
      matrix[i] = swap;

      matrix[r] = matrix[r].map(val => {
        val /= matrix[r][j];
        return val;
      });

      for (let k = 0; k < rows; k++) {
        if (k !== r) {
          let rowMul = matrix[r].map(val => {
            val *= -1 * matrix[k][j];
            return val;
          });

          matrix[k] = matrix[k].map((val, i) => {
            val += rowMul[i];
            return val;
          });
        }
      }
    }
  }

  matrix.map(val => {
    val = Number(val).toFixed(2);
    return val;
  });
}
