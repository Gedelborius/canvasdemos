const defaultSettings = {
    cvs: null,
    ctx: null,
    stop: false,
    'No Boundaries': true,
    stepsPerSecond: 2,
    // border
    'Choose Preset': 'Pure random',
    color: {
        background: '#ffffff',
        cell: '#000000'
    },
    /**
    * @type {number[][]} grid - двухмерный массив чисел
    */
    grid: null,
    cell: {
        width: 20,
        height: 20,
        isEllipse: true,
    },

    // model: {
    //     columns: 10,
    //     rows: 10,
    //     /**
    //      * @type {number[][]} grid - двухмерный массив чисел
    //      */
    //     grid: null,
    //     cell: {
    //         width: null,
    //         height: null,
    //         isEllipse: true,
    //     },
    //     field: {
    //         width: null,
    //         height: null,
    //     }
    // }
}