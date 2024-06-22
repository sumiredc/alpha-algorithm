/**
 * @see https://colab.research.google.com/drive/1GompEzVEFKUXEs-cT3PpgSCoyCnjFDIh#scrollTo=yAVsWg1QZyhe
 * @time_complexity O(logN)
 * @space_complexity O(1)
 */
export function solve(nums: number[]): number {
    return binarySearch(nums, 0, nums.length - 1);
}

function binarySearch(nums: number[], start: number, end: number): number {
    // 先頭 index の一致を検証
    if (nums[start] === start) {
        return start;
    }

    // 下記条件に該当するなら、index と 一致なしと判定
    //
    // 1. 最後尾の値が index より小さい（end 以下に一致している数字は存在しない）
    // 2. start と end が同じ（検証終了）
    if (nums[end] < end || start === end) {
        return -1;
    }

    // 現在検証中の範囲の中央値を算出
    const mid = (start + end) >> 1;

    // 中央値の index より値が小さければ、mid より後方を探索
    if (nums[mid] < mid) {
        return binarySearch(nums, mid + 1, end);
    }

    // 前方を探索
    return binarySearch(nums, start, mid);
}
