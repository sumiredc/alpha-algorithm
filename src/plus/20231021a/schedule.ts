/**
 * @see https://colab.research.google.com/drive/1anu5d89qpyb3zs9Bhv1jBGH9V-795FU0
 *
 * Quick Sort
 *
 * @time_complexity   O(NlogN)
 * @space_complexity  O(1)
 */
export const solve = (schedules: number[][]): boolean => {
    schedules = quickSort(schedules, 0, schedules.length - 1);
    return isNotOverlapShedule(schedules);
};

export const quickSort = (
    schedules: number[][],
    startIndex: number,
    endIndex: number
): number[][] => {
    // start が end 以上なら 指定した範囲は並び替え済み
    if (startIndex >= endIndex) {
        return schedules;
    }

    // 閾値
    const pivot = schedules[startIndex][0];

    // 閾値以下の入れ替え先Index
    let swapLowIndex = startIndex;

    for (let i = startIndex; i <= endIndex; i++) {
        // 検証値が閾値以下なら前方(swapLowIndex)へ移動
        if (schedules[i][0] < pivot) {
            schedules = swapSchedule(schedules, i, swapLowIndex);
            swapLowIndex++;
        }
    }

    if (swapLowIndex === startIndex) {
        // 先頭は並び替え完了のため、先頭以降をソート
        schedules = quickSort(schedules, swapLowIndex + 1, endIndex);
    } else {
        // 閾値以下の範囲をソート
        schedules = quickSort(schedules, startIndex, swapLowIndex - 1);
        // 閾値以上の範囲をソート
        schedules = quickSort(schedules, swapLowIndex, endIndex);
    }

    return schedules;
};

// スケジュールの入れ替え
export const swapSchedule = (schedules: number[][], i1: number, i2: number) => {
    const schedule1 = schedules[i1];
    schedules[i1] = schedules[i2];
    schedules[i2] = schedule1;
    return schedules;
};

// 並び替えたスケジュールの時間が重複していないか
export const isNotOverlapShedule = (schedules: number[][]) => {
    for (let i = schedules.length - 1; i > 0; i--) {
        const prevEnd = schedules[i - 1][1];
        const currentStart = schedules[i][0];
        // 検証中のstartが一つ前のend未満であればfalse
        if (currentStart < prevEnd) {
            return false;
        }
    }
    return true;
};
