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

    for (let i = 0; i < nums.length; i++) {
        const n = nums[i];

        // n が偶数ならポインターの位置の値と入れ替え
        if (isOdd(n)) {
            continue;
        }

        // 入れ替えてポインターを進める
        nums[i] = nums[pointer];
        nums[pointer] = n;
        pointer++;
    }
    return nums;
};

export const isOdd = (n: number) => n % 2 !== 0;
