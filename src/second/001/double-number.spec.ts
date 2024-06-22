import { solve } from './double-number';

describe.each([
    [[10, 4, 3, 5, 2], true],
    [[4, 6, 9, 7, 13], false],
    [[0, 0], true],
    [[0, 1, 2], true],
    [[2, 1], true],
])('double-number', (nums: number[], expected: boolean) => {
    it(`solve ${nums.join(',')}`, () => {
        expect(solve(nums)).toBe(expected);
    });
});
