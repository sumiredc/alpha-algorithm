import { solve } from './unique-string';

describe.each([
    ['aaabbccc', 2],
    ['aab', 0],
])('power', (s: string, expected: number) => {
    it(`solve ${s}`, () => {
        const actual = solve(s);
        expect(actual).toBe(expected);
    });
});
