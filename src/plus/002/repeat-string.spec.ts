import { solve } from './repeat-string';

describe.each([
    ['abcdefghijklmnopqrstuvwxyz', false],
    ['abcabcabcabcabcabcabc', true],
])('repeat string', (s: string, expected: boolean) => {
    it(`solve ${s}`, () => {
        const actual = solve(s);
        expect(actual).toBe(expected);
    });
});
