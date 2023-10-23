import { solve } from './array-addition';

describe.each([
    [[5, 7, 16, 1, 2], false],
    [[3, 5, -1, 8, 12], true],
    [[-3, 5, -1, 8, 9], true],
    [[-1, -2, -3, -4, -5], false],
    [[0, -1, -2, 1, 1, 3, 1, 1, 1], true],
    [[3, 3, 3, 1, 1], false],
    [[0, 0, 0, -1, 1, 1], false],
])('numbers-combination', (nums: number[], expected: boolean) => {
    it(`solve, nums:${nums.join(', ')}`, () => {
        const actual = solve(nums);
        expect(actual).toBe(expected);
    });
});
