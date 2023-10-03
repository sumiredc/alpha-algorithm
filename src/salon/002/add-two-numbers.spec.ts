import { makeListNode as ln, toStrNumber } from './listnode';
import { getOnesPlace, getTensPlace, solve } from './add-two-numbers';

describe.each([
    [[1], [1], '2'],
    [[3, 2, 1], [4, 5, 6], '777'],
    [[8, 9, 0, 1], [9, 9, 9], '7902'],
    [[1], [9, 9, 9, 9, 9, 9], '0000001'],
])('even-odd-sort', (a: number[], b: number[], expected: string) => {
    it(`solve, a: ${a.join(',')}, b: ${b.join(',')}`, () => {
        const actual = toStrNumber(solve(ln(a), ln(b)));
        expect(actual).toBe(expected);
    });
});

describe('unit test', () => {
    it('getOnesPlace', () => {
        expect(getOnesPlace(11)).toBe(1);
        expect(getOnesPlace(23)).toBe(3);
    });

    it('getTensPlace', () => {
        expect(getTensPlace(11)).toBe(1);
        expect(getTensPlace(23)).toBe(2);
        expect(getTensPlace(1)).toBe(0);
        expect(getTensPlace(10)).toBe(1);
    });
});
