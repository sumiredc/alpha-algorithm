/**
 * Problem
 * @see https://colab.research.google.com/drive/1WQWSymOxaifAo0_afMilp2NNXuALQBHg?usp=sharing
 *
 * Answer
 * @see https://colab.research.google.com/drive/1yWeHL93Y2_PuVBhyQfbwvJZLPqdFGS-F#scrollTo=nZqepPeLpkDw
 *
 * N = nums length
 *
 * @time_complexity O(N)
 * @space_complexity O(1) ※O(N)
 */
export function solve(nums: number[]): void {
    let numsIndex = 0;
    let shiftCount = 0;
    const lastIndex = nums.length - 1;
    let lastNumZero = true;

    /**
     * 1. 0 の数を算出
     * 2. 0 shift して残る 数字のindexを算出
     * 3. 最後 に shift で追加された 0 ではない 0 が来るか判定
     */
    while (lastIndex - shiftCount - numsIndex !== 0) {
        if (nums[numsIndex] === 0) {
            shiftCount++;
        }
        if (lastIndex - shiftCount - numsIndex === 0) {
            lastNumZero = false;
            break;
        }
        numsIndex++;
    }

    lastNumZero = lastNumZero && nums[numsIndex] === 0;

    let swapIndex = lastIndex;

    /**
     * 1. 後ろから、配列に残す数字を最終位置へ移動
     * 2. 0 が 現れたら shift 0 を追加
     */
    while (swapIndex > numsIndex) {
        if (lastNumZero) {
            nums[swapIndex] = nums[numsIndex];
            lastNumZero = false;
        } else {
            if (nums[numsIndex] === 0) {
                nums[swapIndex] = 0;
                swapIndex--;
            }
            nums[swapIndex] = nums[numsIndex];
        }

        swapIndex--;
        numsIndex--;
    }
}
