/** из нейронки, надо тестить **/
function sumAround(array, targetCol, targetRow) {
    let sum = 0;

    // Перебираем клетки вокруг заданной, включая диагонали
    for (let colOffset = -1; colOffset <= 1; colOffset++) {
        for (let rowOffset = -1; rowOffset <= 1; rowOffset++) {
            // Вычисляем координаты текущей ячейки
            let currentCol = targetCol + colOffset;
            let currentRow = targetRow + rowOffset;

            // Проверяем, что координаты находятся в пределах массива
            if (currentCol >= 0 && currentCol < array.length && currentRow >= 0 && currentRow < array[currentCol].length) {
                // Исключаем саму заданную ячейку из суммы
                if (!(colOffset === 0 && rowOffset === 0)) {
                    sum += array[currentCol][currentRow];
                }
            }
        }
    }
    return sum;
}

module.exports = {
    sumAround
}