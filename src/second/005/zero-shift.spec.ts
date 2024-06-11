import { solve } from './zero-shift';

describe.each([
    [
        [1, 0, 2, 3, 0, 4, 5, 0],
        [1, 0, 0, 2, 3, 0, 0, 4],
    ],
    [
        [1, 2, 3],
        [1, 2, 3],
    ],
    [
        [1, 0, 0, 3, 0, 4, 5, 0],
        [1, 0, 0, 0, 0, 3, 0, 0],
    ],
    [[0], [0]],
    [
        [1, 0, 0, 0, 0],
        [1, 0, 0, 0, 0],
    ],
    [
        [0, 0, 0, 9, 1, 0, 0, 1, 0],
        [0, 0, 0, 0, 0, 0, 9, 1, 0],
    ],
])('power', (nums: number[], expected: number[]) => {
    it(`solve ${nums.join(',')}`, () => {
        solve(nums);
        expect(nums.join(',')).toBe(expected.join(','));
    });
});
