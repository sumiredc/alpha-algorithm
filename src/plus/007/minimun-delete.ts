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
 * @time_complexity     O(N)
 * @space_complexity  O(N)
 */
export const solve = (nums: number[], x: number): number => {
    let times = -1;

    // 右から取り出した合計値と回数のリストを作成
    const rightSumMap = makeRightSumMap(nums);

    // もしxがキーに含まれていれば、加算回数を取得
    if (rightSumMap.has(x)) {
        times = rightSumMap.get(x)!;
    }

    // numsを前から検証（shift）
    let leftSum = 0;
    let forCount = 0;
    for (const n of nums) {
        forCount++;

        // もしループ回数がtimesのスコアより低ければ、検証不要
        if (times === judgeBestTimes(forCount, times)) {
            break;
        }
        leftSum += n;

        // 左からの合計値がxと一致すれば、ループ回数でスコア検証
        if (leftSum === x) {
            times = judgeBestTimes(forCount, times);
        }

        // 右からの合計値リストにxとleftSumの差が存在していれば
        // ループ回数と右からの加算回数を合計した値でスコア検証
        const diff = x - leftSum;
        if (rightSumMap.has(diff)) {
            times = judgeBestTimes(rightSumMap.get(diff)! + forCount, times);
        }
    }

    // スコアがnumsの長さを超えていれば、同じ値が加算されているためスキップ
    if (times > nums.length) {
        times = -1;
    }
    return times;
};

/**
 * 右から取り出した和をキーに、加算回数を値にしたリストを作成
 * ※ nums[i] のため、0が加算されることは考慮不要
 *
 * @time_complexity     O(N)
 * @space_complexity    O(N)
 */
export const makeRightSumMap = (nums: number[]): Map<number, number> => {
    let rightSum = 0;
    const rightSumMap = new Map<number, number>();
    for (let i = 1; i <= nums.length; i++) {
        rightSum += nums[nums.length - i];
        rightSumMap.set(rightSum, i);
    }
    return rightSumMap;
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
