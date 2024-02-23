function getCanvas() {
    return document.getElementById('canvas');
}

function getContext() {
    return getCanvas()?.getContext('2d');
}

function drawCell(x, y, width = fieldSettings.cellSize, height = fieldSettings.cellSize, isEllipse = fieldSettings.isCellEllipse) {
    const ctx = getContext();
    ctx.fillStyle = canvasSettings.cellColor;
    if (isEllipse) {
        const radiusX = width / 2,
            radiusY = height / 2,
            centerX = x + radiusX,
            centerY = y + radiusY;
        ctx.beginPath();
        ctx.ellipse(
            centerX,
            centerY,
            radiusX,
            radiusY,
            0,
            0,
            Math.PI * 2
        );
        ctx.fill();
        ctx.closePath();
    } else {
        ctx.fillRect(
            x,
            y,
            width,
            height
        );
    }
}

function drawCellAtColumnRow(col, row) {
    const x = fieldSettings.cellSize * col;
    const y = fieldSettings.cellSize * row;
    drawCell(x, y);
}

function drawCellBg(col, row){
    const x = fieldSettings.cellSize * col;
    const y = fieldSettings.cellSize * row;
    const ctx = getContext();
    const width = fieldSettings.cellSize;
    const height = fieldSettings.cellSize;
    const lineWidth = canvasSettings.cellStrokeWidth; // Толщина линии
    const offset = lineWidth / 2; // Смещение для внутренней обводки

    // Заливаем фон ячейки
    ctx.fillStyle = canvasSettings.backgroundColor;
    ctx.fillRect(x, y, width, height);

    // ctx.setLineDash([5, 3]); // Пунктир: 5 пикселей линия, 3 пикселя промежуток


    // Рисуем внутреннюю обводку
    ctx.strokeStyle = canvasSettings.cellStrokeColor;
    ctx.lineWidth = lineWidth;
    // Уменьшаем размер прямоугольника на толщину линии и смещаем его, чтобы обводка была внутри
    ctx.strokeRect(x + offset, y + offset, width - lineWidth, height - lineWidth);
}


/**
 * визуальный ряд в массиве (удобно для редактирования шаблона в коде)
 * - колонка в канвасе
 */
function drawArray(arr2D) {
    if (arr2D == null) throw 'Дай массив';
    const columns = arr2D.length;
    if (columns === 0) throw 'Дай массив не нулевой длины';
    const rows = arr2D[0].length;
    if (rows === 0) throw 'Дай массив с рядами не нулевой длины';

    for (let col = 0; col < columns; col++) {
        for (let row = 0; row < rows; row++) {
            drawCellBg(col, row);
            const isCell = arr2D[col][row];
            if(isCell){
                drawCellAtColumnRow(col, row);
            }
        }
    }

}