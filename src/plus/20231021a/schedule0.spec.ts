import { maxEnd, solve } from './schedule0';

describe.each([
    [
        [
            [0, 30],
            [5, 10],
            [15, 20],
        ],
        false,
    ],
    [
        [
            [7, 10],
            [2, 4],
        ],
        true,
    ],
])('schedule', (schedules: number[][], expected: boolean) => {
    it(`schedules: ${JSON.stringify(schedules)}`, () => {
        const actual = solve(schedules);
        expect(actual).toBe(expected);
    });
});

describe.each([
    [
        [
            [0, 30],
            [5, 10],
            [15, 20],
        ],
        30,
    ],
    [
        [
            [7, 10],
            [2, 4],
        ],
        10,
    ],
])('maxEnd', (schedules: number[][], expected: number) => {
    it(`schedules: ${JSON.stringify(schedules)}`, () => {
        const actual = maxEnd(schedules);
        expect(actual).toBe(expected);
    });
});
