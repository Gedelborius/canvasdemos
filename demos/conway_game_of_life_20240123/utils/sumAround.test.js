import { sumAround } from './sumAround';

describe('sumAround', () => {
    test('суммирует числа вокруг центральной ячейки', () => {
        const array = [
            [1, 2, 3],
            [4, 5, 6],
            [7, 8, 9]
        ];
        const result = sumAround(array, 1, 1); // Центральная ячейка
        expect(result).toBe(40); // Сумма всех вокруг центральной ячейки
    });

    test('суммирует числа вокруг угловой ячейки', () => {
        const array = [
            [1, 2, 3],
            [4, 5, 6],
            [7, 8, 9]
        ];
        const result = sumAround(array, 0, 0); // Верхний левый угол
        expect(result).toBe(11); // Сумма чисел вокруг верхнего левого угла
    });

    test('обрабатывает краевые случаи с выходом за границы массива', () => {
        const array = [
            [1, 1, 0],
            [1, 1, 1]
        ];
        const result = sumAround(array, 0, 2); // Верхний правый угол
        expect(result).toBe(3); // Сумма чисел вокруг верхнего правого угла, не выходя за границы
    });
});
