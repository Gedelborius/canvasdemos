function makeGrid(columns, rows, cellRange = { min: 0, max: 1 }) {

    const notEmpty = cellRange.max - cellRange.min > 0;
    let grid = [];

    for (let column = 0; column < columns; column++) {
        let newColumnArray = [];

        for (let row = 0; row < rows; row++) {

            newColumnArray.push(
                notEmpty ?
                    getRandomInt(cellRange.min, cellRange.max) :
                    null
            )

        }

        grid.push(newColumnArray);

    }

    return grid;
}

function sumOfAdjacentCells(array2D, columnOrigin, rowOrigin, offset = { min: -1, max: 2 }, isEdgesAdjacent = true) {

    const columns = array2D.length, rows = array2D[0].length;

    let sum = 0;

    for (let columnOffset = offset.min; columnOffset < offset.max; columnOffset++) {
        for (let rowOffset = offset.min; rowOffset < offset.max; rowOffset++) {

            let column = columnOrigin + columnOffset,
                row = rowOrigin + rowOffset;

            if (isEdgesAdjacent) {
                column = (column + columns) % columns;
                row = (row + rows) % rows;
            }

            if (column >= 0 && column < columns && row >= 0 && row < rows) {
                sum += array2D[column][row];
            }
        }
    }

    return sum - array2D[columnOrigin][rowOrigin];
}

/*

function sumOfAdjacentCells(matrix, row, col) {
    let sum = 0;
    for (let i = -1; i <= 1; i++) {
        for (let j = -1; j <= 1; j++) {
            if (i === 0 && j === 0) continue; // Skip the cell itself
            if (row + i >= 0 && row + i < matrix.length && col + j >= 0 && col + j < matrix[0].length) {
                sum += matrix[row + i][col + j];
            }
        }
    }
    return sum;
}

// Example usage:
let matrix = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9]
];
console.log(sumOfAdjacentCells(matrix, 1, 1)); // Output: 40

*/