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
    const len = nums.length;
    for (let i = 0; i < len; i++) {
        const n = nums[i];
        // 奇数であれば最後尾へ移動し、0に置き換える
        if (isOdd(n)) {
            nums.push(n);
            nums[i] = 0;
        }
    }
    // 0超過の値のみを返却
    return nums.filter(n => n > 0);
};

export const isOdd = (n: number) => n % 2 > 0;
