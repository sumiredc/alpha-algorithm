/**
 * @see https://colab.research.google.com/drive/1X6qI1ciTYeKedu48Sa_XRkkDnneHeDs8
 *
 * [0, 0, 0, 0, 0, 0 ...] の配列を作成してフラグ立て検証
 *
 * @time_complexity   O(max(end) * n)
 * @space_complexity  O(max(end))
 */
export const solve = (schedules: number[][]): boolean => {
    const length = maxEnd(schedules);
    let bitList = new Array<number>(length).fill(0);
    let result = true;

    parent: for (const schedule of schedules) {
        for (let i = schedule[0]; i < schedule[1]; i++) {
            if (bitList[i] === 1) {
                result = false;
                break parent;
            }
            bitList[i] = 1;
        }
    }

    return result;
};

// endの最大値を取得
export const maxEnd = (schedules: number[][]): number => {
    let max = 0;
    for (const schedule of schedules) {
        if (max < schedule[1]) {
            max = schedule[1];
        }
    }
    return max;
};
