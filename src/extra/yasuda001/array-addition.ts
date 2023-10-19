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
 */
type FindCombiParams = {
    combiNums: NumCollrection;
    filterdNums: number[];
    index: number;
    max: number;
};

export const solve = (nums: number[]): boolean => {
    const max = Math.max(...nums);
    const hashSet = new Set(nums);
    hashSet.delete(max);
    const filterdNums = [...hashSet];

    const combiNums = new NumCollrection();

    return findCombi({
        combiNums,
        filterdNums,
        index: filterdNums.length - 1,
        max,
    });
};

const findCombi = (params: FindCombiParams): boolean => {
    const { combiNums, filterdNums, max } = params;
    let { index } = params;

    for (index; index >= 0; index--) {
        combiNums.push(filterdNums[index]);

        // maxに一致する組み合わせを発見 -> true
        if (max === combiNums.sum) {
            return true;
        }

        // 再帰的に次の値を検証
        const isFindCombi = findCombi({
            combiNums,
            filterdNums,
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

class NumCollrection {
    private nums: number[] = [];
    private iternalSum = 0;

    get sum() {
        return this.iternalSum;
    }

    get length() {
        return this.nums.length;
    }

    push(v: number): this {
        this.nums.push(v);
        this.iternalSum += v;
        return this;
    }

    pop(): number | undefined {
        if (this.nums.length <= 0) {
            return undefined;
        }
        const v = this.nums.pop()!;
        this.iternalSum -= v;
        return v;
    }

    toArray(): number[] {
        return this.nums;
    }

    clone(): NumCollrection {
        const clone = new NumCollrection() as any;
        clone.nums = this.nums.slice();
        clone.iternalSum = this.sum;
        return clone as NumCollrection;
    }
}
