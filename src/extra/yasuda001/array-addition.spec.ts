import { solve } from './array-addition';

describe.each([
    [[5, 7, 16, 1, 2], false],
    [[3, 5, -1, 8, 12], true],
    [[-3, 5, -1, 8, 9], true],
    [[-1, -2, -3, -4, -5], false],
])('numbers-combination', (nums: number[], expected: boolean) => {
    it(`solve, nums:${nums.join(', ')}`, () => {
        const actual = solve(nums);
        expect(actual).toBe(expected);
    });
});
