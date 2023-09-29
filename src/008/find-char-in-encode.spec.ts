import { searchCharInUnitString, solve } from './find-char-in-encode';

describe('unit test', () => {
    it('searchCharInUnitString', () => {
        expect(searchCharInUnitString('abcde', 12)).toBe('b');
        expect(searchCharInUnitString('abcde', 10)).toBe('e');
        expect(searchCharInUnitString('abcde', 5)).toBe('e');
        expect(searchCharInUnitString('abcde', 1)).toBe('a');
    });
});

describe.each([
    ['A23', 5, 'A'],
    ['Hello2World', 11, 'W'],
    ['proGram222ing', 25, 'G'],
    ['abcd23456788888889999999', 102931, 'c'],
    ['ABCDEFG3255GHEEQegy389e', 12924, 'D'],
    [
        'sDAkhd34eowfdAk373lK342l73j3e3jj32nNDAn3885kj2543j5lk53l69',
        53429582,
        'A',
    ],
    ['a', 1, 'a'],
    ['abcdefg29923845554494942884858', 534295823, 'e'],
])('find-char-in-encode', (s: string, x: number, expected: string) => {
    it(`solve ${s} ${x}`, () => {
        expect(solve(s, x)).toBe(expected);
    });
});
