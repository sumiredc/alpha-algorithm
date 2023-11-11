/**
 * @see https://colab.research.google.com/drive/1--aIi3OaupYPb7XZn4VKgUUQQd3NnnKc
 *
 * @time_complexity   O(N^2)
 * @space_complexity  O(1)
 */
export const solve = (schedules: number[][]): number => {
    return needRoomCount(schedules);
};

// 必要な部屋数を計算
export const needRoomCount = (schedules: number[][]) => {
    let max = 0;
    for (let i = schedules.length - 1; i >= 0; i--) {
        const currentStart = schedules[i][0];
        let roomCount = 0;

        for (let i2 = schedules.length - 1; i2 >= 0; i2--) {
            if (i === i2) {
                continue;
            }
            const start = schedules[i2][0];
            const end = schedules[i2][1];
            if (end > currentStart && start <= currentStart) {
                roomCount++;
            }
        }
        if (max < roomCount) {
            max = roomCount;
        }
    }
    return max + 1;
};
