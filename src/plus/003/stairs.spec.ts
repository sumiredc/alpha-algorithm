import {solve} from './stairs';

describe.each([
    [10, 23],
    [100, 2318],
])('stairs', (n: number, expected: number) => {
    it(`solve ${n}`, () => {
        const actual = solve(n);
        expect(actual).toBe(expected);
    });
});
