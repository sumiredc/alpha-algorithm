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
 * @spatial_complexity  O(N)
 */
export const solve = (nums: number[], x: number): number => {
    let times = -1;

    // popの合計値と回数のリストを作成
    const popSumList = makePopSumList(nums);

    // もしxがキーに含まれていれば、加算回数を取得
    if (popSumList.has(x)) {
        times = popSumList.get(x)!;
    }

    // numsを前から検証（shift）
    let shiftSum = 0;
    let forCount = 0;
    for (const n of nums) {
        forCount++;

        // もしループ回数がtimesのスコアより低ければ、検証不要
        if (times === judgeBestTimes(forCount, times)) {
            break;
        }
        shiftSum += n;

        // shiftのみの合計値がxと一致すれば、ループ回数でスコア検証
        if (shiftSum === x) {
            times = judgeBestTimes(forCount, times);
        }

        // popの合計値リストにxとshiftSumの差が存在していれば
        // ループ回数とpop回数を加算した値でスコア検証
        const diff = x - shiftSum;
        if (popSumList.has(diff)) {
            times = judgeBestTimes(popSumList.get(diff)! + forCount, times);
        }
    }

    // スコアがnumsの長さを超えていれば、同じ値が加算されているためスキップ
    if (times > nums.length) {
        times = -1;
    }
    return times;
};

/**
 * popの和をキーに、加算回数を値にしたリストを作成
 * ※ nums[i] のため、0が加算されることは考慮不要
 *
 * @time_complexity     O(N)
 * @spatial_complexity  O(N)
 */
export const makePopSumList = (nums: number[]): Map<number, number> => {
    let popSum = 0;
    const popSumList = new Map<number, number>();
    for (let i = 1; i <= nums.length; i++) {
        popSum += nums[nums.length - i];
        popSumList.set(popSum, i);
    }
    return popSumList;
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
