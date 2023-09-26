/**
 * @see https://colab.research.google.com/drive/1AOhwEt2Vo84l5frqMwiyuv4-LIQy2j-0
 *
 * 自然数の配列 nums と 自然数 x が渡されます。
 * 1回の操作で、nums の右端または左端から1つだけ数字を取り出す。
 * 途中から取り出すことは出来ません。
 * 取り出した数字を nums に入れ直すことは出来ません。
 * なるべく少ない操作回数で取り出した数字の合計が、与えられた数字 x に等しくなるようにしたいです。
 * 何回でできるか、操作回数を求めてください。
 * 出来ない場合は -1 を返してください。
 *
 * 条件
 * 1 <= nums.length <= 2000
 * 1 <= nums[i] <= 10000
 * 1 <= x <= 10^7
 *
 * @time_complexity     O(N^2)
 * @spatial_complexity  O(1)
 */
export const solve = (nums: number[], x: number): number => {
    // 数列の合計値を算出 O(N)
    const total = nums.reduce((a: number, b: number) => a + b, 0);

    // 合計値が足りているか検証
    if (x > total) {
        return -1;
    }

    // 合計値と一致すれば数列の個数を返却
    if (x === total) {
        return nums.length;
    }

    // popのみの取り出しで検証
    let times = addPopLoop(nums, x);

    let forSum = 0;
    let forCount = 0;
    for (const num of nums) {
        forCount++;
        if (forCount !== judgeBestTimes(forCount, times)) {
            break;
        }

        // shift のみの取り出しを検証
        forSum += num;
        if (forSum === x) {
            times = forCount;
            break;
        }

        // shift + pop の取り出しを検証
        let subTimes = addPopLoop(nums, x, forSum);
        if (subTimes !== -1) {
            subTimes += forCount;
        }

        times = judgeBestTimes(subTimes, times);
    }

    return times;
};

// 後ろから値を取り出し順に加算検証
export const addPopLoop = (nums: number[], x: number, sum = 0): number => {
    let times = -1;

    for (let i = 1; i <= nums.length; i++) {
        sum += nums[nums.length - i];
        if (sum === x) {
            times = i;
            break;
        }
    }
    return times;
};

// どちらの方が少ない回数か判定（-1は最低スコア）
export const judgeBestTimes = (x: number, y: number): number => {
    if (x === -1) {
        return y;
    }
    if (y === -1) {
        return x;
    }
    return x < y ? x : y;
};
