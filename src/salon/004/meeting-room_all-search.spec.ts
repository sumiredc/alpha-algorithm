import { solve } from './meeting-room_all-search';
import { testcase } from './testcase';

describe.each(testcase)('solve', (schedules: number[][], expected: number) => {
    it(`schedules: ${JSON.stringify(schedules)}`, () => {
        const actual = solve(schedules);
        expect(actual).toBe(expected);
    });
});
