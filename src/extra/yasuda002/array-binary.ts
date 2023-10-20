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
 *
 * @time_complexity O(max(M, N))
 * @space_complexity O(max(M,N))
 */
export const solve = (strArr: string[]): number => {
    const lsv = Number(strArr[0]);
    const rsv = parseInt(strArr[1], 2);

    // lsv と rsv の 排他的論理和（XOR）を算出し、1の個数を返却
    return countOnes(toBinary(lsv ^ rsv));
};

// 2進数変換
const toBinary = (n: number) => {
    return n.toString(2);
};

// 1の個数を数える
const countOnes = (s: string) => {
    const ones = s.match(/1/g) ?? [];
    return ones.length;
};
