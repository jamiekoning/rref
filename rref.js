var rows = 3;
var cols = 4;

var matrix = [
  [-7, -6, -12, -33],
  [5, 5, 7, 24],
  [1, 0, 4, 5]
];

function setRows(rowsCount) {
  rows = Number(rowsCount);
}

function setCols(colsCount) {
  cols = Number(colsCount);
}

function createMatrix() {
  console.log("creating matrix with", rows, cols);

  matrix = Array(rows)
    .fill()
    .map(() => Array(cols).fill(0));

  console.log(matrix);

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

  let matrixDiv = document.createElement("div");
  matrixDiv.setAttribute("id", "matrix");
  var header = document.createElement("h2");
  header.innerHTML = "Input Matrix:";
  matrixDiv.appendChild(header);

  matrix.forEach((row, i) => {
    let rowDiv = document.createElement("div");

    row.forEach((col, j) => {
      let matrixEntry = document.createElement("input");
      matrixEntry.setAttribute("type", "number");
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
  var rule = document.createElement("hr");
  document.body.append(rule);

  var header = document.createElement("h2");
  header.innerHTML = "RREF Matrix:";
  document.body.append(header);

  let matrixDiv = document.createElement("div");

  matrix.forEach((row, i) => {
    let rowDiv = document.createElement("div");

    row.forEach((col, j) => {
      let matrixEntry = document.createElement("input");
      matrixEntry.setAttribute("type", "number");
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

      matrix[r].forEach(val => {
        console.log("val after mul", val);
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

  matrix.forEach(val => {
    val = Number(val).toFixed(2);
    return val;
  });
}
