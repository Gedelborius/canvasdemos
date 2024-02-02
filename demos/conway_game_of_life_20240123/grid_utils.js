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