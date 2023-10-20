import { solve } from './array-binary';

describe.each([
    [['56', '011000'], 1],
    [['5624', '0010111111001'], 2],
    [['44', '111111'], 3],
    [['0', '111111'], 6],
    [['63', '111111'], 0],
])('numbers-combination', (strArr: string[], expected: number) => {
    it(`solve, nums:${strArr.join(', ')}`, () => {
        const actual = solve(strArr);
        expect(actual).toBe(expected);
    });
});
