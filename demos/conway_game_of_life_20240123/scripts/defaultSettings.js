const defaultSettings = {
    cvs: null,
    ctx: null,
    pause: false,
    width: 600,
    height: 400,
    stepsPerSecond: 2,
    color: {
        background: '#ffffff',
        cell: '#000000'
    },
    model: {
        columns: 10,
        rows: 10,
        /**
         * @type {number[][]} grid - двухмерный массив чисел
         */
        grid: null,
        cell: {
            width: null,
            height: null,
            isEllipse: true,
        },
        field: {
            width: null,
            height: null,
        }
    }
}