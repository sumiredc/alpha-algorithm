import {
    NumberCollection,
    NumberCombinations,
    solve,
    sumAP,
} from './numbers-combination';

describe.each([
    [2, 20, []],
    [3, 7, [[1, 2, 4]]],
    [
        3,
        9,
        [
            [1, 2, 6],
            [1, 3, 5],
            [2, 3, 4],
        ],
    ],
])('numbers-combination', (k: number, n: number, expected: number[][]) => {
    it(`solve, k:${k}, n:${n}`, () => {
        const actual = solve(k, n);
        expect(JSON.stringify(actual)).toBe(JSON.stringify(expected));
    });
});

describe.each([
    [1, 1, 100, 5050],
    [2, 2, 3, 12],
    [10, 10, 50, 12750],
])('sumAP', (a: number, d: number, n: number, expected: number) => {
    it(`solve, s:${a}, diff:${d}, count:${n}`, () => {
        const actual = sumAP(a, d, n);
        expect(actual).toBe(expected);
    });
});

describe('class NumberCombinations', () => {
    const nc = new NumberCombinations(3, 10);
    it('isOverLength', () => {
        expect(
            nc['isOverLength'](new NumberCollection([1, 2, 3, 4]))
        ).toBeTruthy();
        expect(nc['isOverLength'](new NumberCollection([1, 2, 3]))).toBeFalsy();
    });

    it('isOverSum', () => {
        expect(
            nc['isOverSum'](new NumberCollection([1, 2, 3, 4, 5]))
        ).toBeTruthy();
        expect(nc['isOverSum'](new NumberCollection([1, 2, 3, 4]))).toBeFalsy();
    });

    it('isMatchLengthAndSum', () => {
        expect(
            nc['isMatchLengthAndSum'](new NumberCollection([1, 4, 5]))
        ).toBeTruthy();
        expect(
            nc['isMatchLengthAndSum'](new NumberCollection([1, 2, 3, 4]))
        ).toBeFalsy();
        expect(
            nc['isMatchLengthAndSum'](new NumberCollection([2, 4, 5]))
        ).toBeFalsy();
    });
});
