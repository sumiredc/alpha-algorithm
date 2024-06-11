/**
 * @see https://colab.research.google.com/drive/1mk2WihjM_CBQE2jdEDSwl4uKFG0HAEEU
 *
 * odd 奇数
 * even 偶数
 *
 * @time_complexity     O(N)
 * @space_complexity    O(1)
 */
export const solve = (nums: number[]): number[] => {
    // 偶数が来たら入れ替えする位置
    let pointer = 0;

    // 後ろから検証
    for (let i = 0; i < nums.length; i++) {
        const n = nums[i];

        // n が奇数なら処理不要
        if (isOdd(n)) {
            continue;
        }

        // n が偶数なら、前方と入れ替えてポインタを進める
        nums[i] = nums[pointer];
        nums[pointer] = n;
        pointer++;
    }
    return nums;
};

// 論理積で奇数を判定する（0101, 0001 -> 0001 ※ 奇数)
export const isOdd = (n: number) => Boolean(n & 1);

// 論理積で偶数を判定する
export const isEven = (n: number) => !(n & 1);
