/**
 * @see https://colab.research.google.com/drive/1jjLSye6v7nXfwhPYx4t1IfXy1_lQvcz0
 *
 * N = jobs.length
 * M = jobs[x].length = 3(Fixed value)
 * @time_complexity O(NM) = O(N)
 * @space_complexity O(3:prevTotals + 3:currentTotals) = O(1)
 */
export const solve = (jobs: number[][]): number => {
    let prevTotals: [number, number, number] = [0, 0, 0];
    for (let y = 0; y < jobs.length; y++) {
        const currentTotals: [number, number, number] = [0, 0, 0];
        const jobRow = jobs[y];

        for (let x = 0; x < jobRow.length; x++) {
            currentTotals[x] = getMaxReward(prevTotals, x) + jobRow[x];
        }

        prevTotals = currentTotals;
    }

    return Math.max(...prevTotals);
};

function getMaxReward(jobsRow: number[], ignoreId: number) {
    let maxRewards = -1;

    for (let x = 0; x < jobsRow.length; x++) {
        const reward = jobsRow[x];
        if (ignoreId === x) {
            continue;
        }
        if (maxRewards < reward) {
            maxRewards = reward;
        }
    }
    if (maxRewards === -1) {
        throw new Error('Reward情報が取得できませんでした');
    }
    return maxRewards;
}
