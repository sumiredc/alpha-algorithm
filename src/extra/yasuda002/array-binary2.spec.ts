import {
    binaryToDecimalNumber,
    countOnes,
    decimalNumberToBinary,
    solve,
    stringToNumber,
} from './array-binary2';

describe.each([
    [['56', '011000'], 1],
    [['5624', '0010111111001'], 2],
    [['44', '111111'], 3],
    [['0', '111111'], 6],
    [['63', '111111'], 0],
])('solve', (strArr: string[], expected: number) => {
    it(`strArr:${strArr.join(', ')}`, () => {
        const actual = solve(strArr);
        expect(actual).toBe(expected);
    });
});

describe.each([
    ['2', 2],
    ['10', 10],
    ['12345', 12345],
])('stringToNumber', (s: string, expected: number) => {
    it(`s:${s}`, () => {
        const actual = stringToNumber(s);
        expect(actual).toBe(expected);
    });
});

describe.each([
    [24, '11000'],
    [1529, '10111111001'],
    [63, '111111'],
    [0, '0'],
])('decimalNumberToBinary', (n: number, expected: string) => {
    it(`n:${n}`, () => {
        const actual = decimalNumberToBinary(n);
        expect(actual).toBe(expected);
    });
});

describe.each([
    ['011000', 24],
    ['0010111111001', 1529],
    ['111111', 63],
    ['00000', 0],
])('binaryToDecimalNumber', (binary: string, expected: number) => {
    it(`binary:${binary}`, () => {
        const actual = binaryToDecimalNumber(binary);
        expect(actual).toBe(expected);
    });
});

describe.each([
    ['011000', 2],
    ['0010111111001', 8],
    ['111111', 6],
])('countOnes', (binary: string, expected: number) => {
    it(`binary:${binary}`, () => {
        const actual = countOnes(binary);
        expect(actual).toBe(expected);
    });
});
