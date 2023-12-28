import { solve } from './baloon-shooting';

describe.each([
    [[], 0],
    [
        [
            [1, 2],
            [3, 4],
            [5, 6],
            [7, 8],
        ],
        4,
    ],
    [
        [
            [10, 16],
            [2, 8],
            [1, 6],
            [7, 12],
        ],
        2,
    ],
    [
        [
            [1, 2],
            [2, 3],
            [3, 4],
            [4, 5],
        ],
        2,
    ],
    [
        [
            [3, 4],
            [1, 5],
            [4, 8],
            [2, 6],
        ],
        1,
    ],
    [[[-10, 0]], 1],
    [
        [
            [1, 4],
            [1, 8],
            [5, 6],
            [7, 9],
        ],
        3,
    ],
    [
        [
            [3, 9],
            [7, 12],
            [3, 8],
            [6, 8],
            [9, 10],
            [2, 9],
            [0, 9],
            [3, 9],
            [0, 6],
            [2, 8],
        ],
        2,
    ],
    [[[1, 2147483647]], 1],
])('numbers-combination', (balloons: number[][], expected: number) => {
    it(`solve, balloons:${JSON.stringify(balloons)}`, () => {
        const actual = solve(balloons);
        expect(actual).toBe(expected);
    });
});
