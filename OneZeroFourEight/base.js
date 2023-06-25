function merge(x1, x2) {
    if (x1 === x2) {
        return x1 * 2;
    } else {
        return x1;
    }
}

function mergeArray(xs) {
    const filtered = xs.filter((n) => n != 0);
    const result = [];

    for (let i = 0; i < filtered.length; i++) {
        const m = merge(filtered[i], filtered[i + 1]);
        result.push(m);
        if (m !== filtered[i]) {
            i++;
        }
    }

    return [...result, ...[0, 0, 0, 0]].slice(0, xs.length);
}

function mergeMatrix(xss) {
    const result = [];
    for (let i = 0; i < xss.length; i++) {
        //    console.log(mergeArray (xss[i]))
        result.push(mergeArray(xss[i]));
    }
    return result;
}

function copyMatrix(matrix) {
    const n = matrix.length;
    const copiedMatrix = [];

    for (let i = 0; i < n; i++) {
        copiedMatrix.push([...matrix[i]]);
    }

    return copiedMatrix;
}

function rotateMatrixRight(matrix) {
    const result = copyMatrix(matrix);
    const n = matrix.length;

    // Transpose the matrix
    for (let i = 0; i < n; i++) {
        for (let j = i + 1; j < n; j++) {
            // Swap matrix[i][j] with matrix[j][i]
            const temp = result[i][j];
            result[i][j] = result[j][i];
            result[j][i] = temp;
        }
    }

    // Reverse each row
    for (let i = 0; i < n; i++) {
        result[i] = result[i].reverse();
    }

    return result;
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function findCoordinates(matrixSize, number) {
    const n = Math.sqrt(matrixSize);
    const row = Math.floor(number / n);
    const column = number % n;
    return [row, column];
}

////// API //////

function up(xss) {
    const r = rotateMatrixRight(rotateMatrixRight(rotateMatrixRight(xss)));
    const result = mergeMatrix(r);
    return rotateMatrixRight(result);
}
function down(xss) {
    const r = rotateMatrixRight(xss);
    const result = mergeMatrix(r);
    return rotateMatrixRight(rotateMatrixRight(rotateMatrixRight(result)));
}
function left(xss) {
    return mergeMatrix(xss);
}
function right(xss) {
    const r = rotateMatrixRight(rotateMatrixRight(xss));
    const result = mergeMatrix(r);
    return rotateMatrixRight(rotateMatrixRight(result));
}

function init(n) {
    const rand = () => getRandomInt(0, n * n - 1);
    let x = [rand(), rand()];
    while (x[0] === x[1]) {
        x = [rand(), rand()];
    }
    const result = [];

    for (let i = 0; i < n; i++) {
        result[i] = [];
        for (let j = 0; j < n; j++) {
            result[i][j] = 0;
        }
    }


    const a = findCoordinates(n*n, x[0])
    const b = findCoordinates(n*n, x[1])

    result[a[0]][a[1]] = 2
    result[b[0]][b[1]] = 2

    return result;
}
