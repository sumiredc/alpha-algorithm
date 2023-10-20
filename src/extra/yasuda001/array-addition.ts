/**
 * Array Addition
 *
 * Have the function ArrayAddition(arr) take the array of numbers stored in arr and return the string true if any combination of numbers in the array (excluding the largest number) can be added up to equal the largest number in the array, otherwise return the string false.
 * For example: if arr contains [4, 6, 23, 10, 1, 3] the output should return true because 4 + 6 + 10 + 3 = 23.
 * The array will not be empty, will not contain all the same elements, and may contain negative numbers.
 *
 * Examples
 *
 * - Input: [5,7,16,1,2]
 * - Output: false
 *
 * - Input: [3,5,-1,8,12]
 * - Output: true
 *
 *
 * @time_complexity O(2^n)
 * @space_complexity 0(n)
 *
 * Σ(nCk)for k = n to 1
 * = 2^n
 */
type FindCombiParams = {
    combiNums: NumCollrection;
    filteredNums: number[];
    index: number;
    max: number;
};

// Backtrack
export const solve = (nums: number[]): boolean => {
    const max = Math.max(...nums);
    // 最大値を除いた数字の配列
    const filteredNums = nums.filter(n => n !== max);
    const combiNums = new NumCollrection();

    return findCombi({
        combiNums,
        filteredNums,
        index: filteredNums.length - 1,
        max,
    });
};

const findCombi = (params: FindCombiParams): boolean => {
    const { combiNums, filteredNums, max } = params;
    let { index } = params;

    for (index; index >= 0; index--) {
        combiNums.push(filteredNums[index]);

        // maxに一致する組み合わせを発見 -> true
        if (max === combiNums.sum) {
            return true;
        }

        // 再帰的に次の値を検証
        const isFindCombi = findCombi({
            combiNums,
            filteredNums,
            max,
            index: index - 1,
        });
        if (isFindCombi) {
            return true;
        }

        // 現在の値を削除して、次のループへ
        combiNums.pop();
    }

    return false;
};

// 数字配列と合計値を並行管理するクラス
class NumCollrection {
    private nums: number[] = [];
    private iternalSum = 0;

    get sum() {
        return this.iternalSum;
    }

    get length() {
        return this.nums.length;
    }

    push(v: number): void {
        this.nums.push(v);
        this.iternalSum += v;
    }

    pop(): number | undefined {
        if (this.nums.length <= 0) {
            return undefined;
        }
        const v = this.nums.pop()!;
        this.iternalSum -= v;
        return v;
    }
}
