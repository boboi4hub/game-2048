// UTILITIES

/// Merge two neighboring cells into one
function mergeTwoElements(x1, x2) {
  return x1 === x2 ? x1 * 2 : x1
}

/// Merge all the array element by element. It may free some cells
function mergeArray(xs) {
  const filtered = xs.filter(n => n != 0)
  const result = []

  for (let i = 0; i < filtered.length; i++) {
    const m = mergeTwoElements(filtered[i], filtered[i + 1])
    result.push(m)
    if (m !== filtered[i]) {
      i++
    }
  }

  return [...result, ...[0, 0, 0, 0]].slice(0, xs.length)
}

/// Merge all the matrix
function mergeMatrix(xss) {
  const result = []
  for (const element of xss) {
    result.push(mergeArray(element))
  }
  return result
}

function copyMatrix(matrix) {
  const n = matrix.length
  const copiedMatrix = []

  for (let i = 0; i < n; i++) {
    copiedMatrix.push([...matrix[i]])
  }

  return copiedMatrix
}
/// Performs rotation on the right
function rotateMatrixRight(matrix) {
  const result = copyMatrix(matrix)
  const n = matrix.length

  // Transpose the matrix
  for (let i = 0; i < n; i++) {
    for (let j = i + 1; j < n; j++) {
      // Swap matrix[i][j] with matrix[j][i]
      const temp = result[i][j]
      result[i][j] = result[j][i]
      result[j][i] = temp
    }
  }

  // Reverse each row
  for (let i = 0; i < n; i++) {
    result[i] = result[i].toReversed()
  }

  return result
}

/// Generate a random integer value
function getRandomInt(min, max) {
  const min1 = Math.ceil(min)
  const max1 = Math.floor(max)
  return Math.floor(Math.random() * (max1 - min1 + 1)) + min1
}

/// Find coordinates using Cell Number
function findCoordinates(matrixSize, number) {
  const n = Math.sqrt(matrixSize)
  const row = Math.floor(number / n)
  const column = number % n
  return [row, column]
}

/// Return empty coordinates
function emptyCoordinates(xss) {
  const result = []
  for (let i = 0; i < xss.length; i++) {
    for (let j = 0; j < xss.length; j++) {
      if (xss[i][j] === 0) {
        result.push([i, j])
      }
    }
  }
  return result
}

// PUBLIC API

/// Compare matrixes

const API = {
  /// Key Handler
  up: xss => {
    const r = rotateMatrixRight(rotateMatrixRight(rotateMatrixRight(xss)))
    const result = mergeMatrix(r)
    return rotateMatrixRight(result)
  },

  /// Key Handler
  down: xss => {
    const r = rotateMatrixRight(xss)
    const result = mergeMatrix(r)
    return rotateMatrixRight(rotateMatrixRight(rotateMatrixRight(result)))
  },

  /// Key  Handler
  left: xss => {
    return mergeMatrix(xss)
  },

  /// Key  Handler
  right: xss => {
    const r = rotateMatrixRight(rotateMatrixRight(xss))
    const result = mergeMatrix(r)
    return rotateMatrixRight(rotateMatrixRight(result))
  },

  /// Game Initialization
  init: n => {
    const rand = () => getRandomInt(0, n * n - 1)
    let x = [rand(), rand()]
    while (x[0] === x[1]) {
      x = [rand(), rand()]
    }
    const result = []

    for (let i = 0; i < n; i++) {
      result[i] = []
      for (let j = 0; j < n; j++) {
        result[i][j] = 0
      }
    }

    const a = findCoordinates(n * n, x[0])
    const b = findCoordinates(n * n, x[1])

    result[a[0]][a[1]] = 2
    result[b[0]][b[1]] = 2

    return result
  },

  /// Add Random new Cells
  addRandom: xss => {
    const copy = copyMatrix(xss)
    const emptyCells = emptyCoordinates(copy)

    if (emptyCells.length === 0) {
      return undefined
    } else {
      const randomIndex = getRandomInt(0, emptyCells.length - 1)
      const [x, y] = emptyCells[randomIndex]
      copy[x][y] = 2
      return copy
    }
  },

  sameMatrixes: (xss, yss) => {
    for (let i = 0; i < xss.length; i++) {
      for (let j = 0; j < xss[0].length; j++) {
        if (xss[i][j] !== yss[i][j]) {
          return false
        }
      }
    }
    return true
  },
}
