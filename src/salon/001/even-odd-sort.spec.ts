import { solve, isEven, isOdd } from './even-odd-sort';

describe.each([
    [[1, 1, 4, 2, 3], '00111'],
    [[5, 6, 70, 8, 9], '00011'],
    [[2, 6, 70, 8, 9], '00001'],
    [
        [
            2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2,
            2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2,
            2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2,
            2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2,
        ],
        '0'.repeat(91),
    ],
    [
        [
            1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
            1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
            1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
            1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
            1, 1, 1,
        ],
        '1'.repeat(95),
    ],
])('even-odd-sort', (nums: number[], expected: string) => {
    it(`solve ${nums.join(',')}`, () => {
        let actual = '';
        for (const n of solve(nums)) {
            actual += n % 2 === 0 ? '0' : '1';
        }
        expect(actual).toBe(expected);
    });
});

describe.each([
    [1, true],
    [2, false],
    [3, true],
    [4, false],
    [10, false],
    [111, true],
])('isOdd or is Even', (n: number, expected: boolean) => {
    it(`odd  ${n} ${expected}`, () => {
        expect(isOdd(n)).toBe(expected);
    });

    it(`even ${n} ${!expected}`, () => {
        expect(isEven(n)).toBe(!expected);
    });
});
