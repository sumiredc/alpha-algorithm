/**
 * Array Binary
 *
 * Have the function OffBinary(strArr) read the array of strings stored in strArr,
 * which will contain two elements,
 * the first will be a positive decimal number and the second element will be a binary number.
 *
 * Your goal is to determine how many digits in the binary number need to be changed to represent the decimal number correctly (either 0 change to 1 or vice versa).
 *
 * For example:
 * if strArr is ["56", "011000"] then your program should return 1 because only 1 digit needs to change in the binary number (the first zero needs to become a 1) to correctly represent 56 in binary.
 *
 * Examples
 *
 * - Input: ["5624", "0010111111001"]
 * - Output: 2
 *
 * - Input: ["44", "111111"]
 * - Output: 3
 *
 * 追加条件：Number, toString, parseInt, 正規表現などを使用しないこと
 *
 * @time_complexity O(max(M,N))
 * @space_complexity O(max(M,N))
 */
export const solve = (strArr: string[]): number => {
    const lsv = stringToNumber(strArr[0]);
    const rsv = binaryToDecimalNumber(strArr[1]);

    // lsv と rsv の 排他的論理和（XOR）を算出し、1の個数を返却
    return countOnes(decimalNumberToBinary(lsv ^ rsv));
};

// 文字から数字への変換リスト
const numbers: { readonly [key: string]: number } = {
    0: 0,
    1: 1,
    2: 2,
    3: 3,
    4: 4,
    5: 5,
    6: 6,
    7: 7,
    8: 8,
    9: 9,
};

// 文字数字を数値へ変換
export const stringToNumber = (s: string): number => {
    let n = 0;
    let place = 1;
    for (let i = s.length - 1; i >= 0; i--) {
        const digit = s[i];
        n += numbers[digit] * place;
        place *= 10;
    }
    return n;
};

// 10進数 -> 2進数
export const decimalNumberToBinary = (n: number): string => {
    let binary = '';
    while (n > 0) {
        const bit = n & 1 ? 1 : 0;
        binary = bit + binary;
        n = (n - bit) / 2;
    }
    return binary.length > 0 ? binary : '0';
};

// 2進数 -> 10進数
export const binaryToDecimalNumber = (binary: string): number => {
    let n = 0;
    let place = 1;
    for (let i = binary.length - 1; i >= 0; i--) {
        const bit = binary[i];
        n += numbers[bit] * place;
        place *= 2;
    }
    return n;
};

// 2進数の中の1の数を返却
export const countOnes = (binary: string): number => {
    let count = 0;
    for (const bit of binary) {
        if (bit !== '1') {
            continue;
        }
        count++;
    }
    return count;
};
