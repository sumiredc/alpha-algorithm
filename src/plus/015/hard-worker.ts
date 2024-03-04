/**
 * @see https://colab.research.google.com/drive/1jjLSye6v7nXfwhPYx4t1IfXy1_lQvcz0
 *
 * N = jobs.length
 * @time_complexity O(N * 3 * 3 + 3) = O(N)
 * @space_complexity O(3:prevTotals + 3:currentTotals) = O(1)
 */
export const solve = (jobs: number[][]): number => {
    let prevTotals: [number, number, number] = [0, 0, 0];
    for (let rowNo = 0; rowNo < jobs.length; rowNo++) {
        const currentTotals: [number, number, number] = [0, 0, 0];
        const jobRow = jobs[rowNo];

        for (let id = 0; id < jobRow.length; id++) {
            currentTotals[id] = getMaxReward(prevTotals, id) + jobRow[id];
        }

        prevTotals = currentTotals;
    }

    return Math.max(...prevTotals);
};

function getMaxReward(jobsRow: number[], ignoreId: number) {
    let max = -1;

    for (let id = 0; id < jobsRow.length; id++) {
        const reward = jobsRow[id];
        if (ignoreId === id) {
            continue;
        }
        if (max < reward) {
            max = reward;
        }
    }
    if (max === -1) {
        throw new Error('Reward情報が取得できませんでした');
    }
    return max;
}
