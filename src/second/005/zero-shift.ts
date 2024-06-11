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
    let i = 0;
    let shiftCount = 0;
    const lastIndex = nums.length - 1;
    let lastNumZero = true;

    while (lastIndex - shiftCount - i !== 0) {
        if (nums[i] === 0) {
            shiftCount++;
        }
        if (lastIndex - shiftCount - i === 0) {
            lastNumZero = false;
            break;
        }
        i++;
    }

    lastNumZero = lastNumZero && nums[i] === 0;

    let swapIndex = lastIndex;
    while (swapIndex > i) {
        if (lastNumZero) {
            nums[swapIndex] = nums[i];
            lastNumZero = false;
        } else {
            if (nums[i] === 0) {
                nums[swapIndex] = 0;
                swapIndex--;
            }
            nums[swapIndex] = nums[i];
        }

        swapIndex--;
        i--;
    }
}
