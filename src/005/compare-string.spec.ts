import { solve } from './compare-string';

describe.each([
    ['coll#or', 'co#olor', true],
    ['sy##sm#ex', 's#ys#mex#', false],
    ['#################', '##########################################', true],
])('power', (s: string, t: string, expected: boolean) => {
    it(`solve ${s} ${t}`, () => {
        const actual = solve(s, t);
        expect(actual).toBe(expected);
    });
});
