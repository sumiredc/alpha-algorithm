/**
 * @see https://colab.research.google.com/drive/1anu5d89qpyb3zs9Bhv1jBGH9V-795FU0
 *
 * Quick Sort
 *
 * @time_complexity   O(NlogN)
 * @space_complexity  O(1)
 */
export const solve = (schedules: number[][]): boolean => {
    quickSort(schedules, 0, schedules.length - 1);
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

    const { pivotIndex } = pivotSort(schedules, startIndex, endIndex);

    // 閾値以下の範囲をソート
    quickSort(schedules, startIndex, pivotIndex - 1);
    // 閾値以上の範囲をソート
    quickSort(schedules, pivotIndex + 1, endIndex);

    return schedules;
};

/**
 * 分割ソート
 * [a... < pivot <= b...]
 */
export const pivotSort = (
    schedules: number[][],
    startIndex: number,
    endIndex: number
): { schedules: number[][]; pivotIndex: number } => {
    if (startIndex >= endIndex) {
        throw new Error(
            'startIndex には endIndex より 小さい値を指定してください'
        );
    }

    // 最後の値を pivot(境界値) に採用
    let pivotIndex = endIndex;
    const pivot = schedules[pivotIndex][0];
    endIndex--;

    // pivot より手前の値を 分割ソート
    while (startIndex !== endIndex) {
        const target = schedules[endIndex][0];
        if (target < pivot) {
            // 境界値 以下 -> 前方へ移動
            swapSchedule(schedules, startIndex, endIndex);
            startIndex++;
        } else {
            // 境界値 超過 -> 一つ手前を検証
            endIndex--;
        }
    }

    // ... < pivot <= ... に並び替え
    // pivot の方が大きければ 最終indexの一つ後ろと入れ替え
    // pivot の方が小さければ、最終indexと入れ替え
    const swapIndex =
        pivot > schedules[startIndex][0] ? startIndex + 1 : startIndex;

    swapSchedule(schedules, swapIndex, pivotIndex);
    pivotIndex = swapIndex;

    return { schedules, pivotIndex };
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
