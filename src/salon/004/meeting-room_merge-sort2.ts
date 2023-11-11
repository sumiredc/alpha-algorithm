/**
 * @see https://colab.research.google.com/drive/1okAwgB8qZtxqbhiX8NuxNIJsEs4dgYbi
 *
 * @time_complexity   O(NlogN)
 * @space_complexity  O(N)
 */
type Time = [number, -1 | 1];
export const solve = (schedules: number[][]): number => {
    const times = makeTimes(schedules);
    const sorted = mergeSort(times.map(time => [time]));
    return needRoomCount(sorted);
};

/**
 * 開始時刻を[time, 1]、終了時刻を[time, -1]にした配列を作成
 * @time_complexity O(2N)
 * @space_complexity O(2N)
 */
const makeTimes = (schedules: number[][]): Time[] => {
    const times: Time[] = [];
    schedules.forEach(schedule => {
        times.push([schedule[0], 1]);
        times.push([schedule[1], -1]);
    });
    return times;
};

/**
 * マージソート
 * @time_complexity O(NlogN)
 * @space_complexity O(N)
 */
const mergeSort = (timesArray: Time[][]): Time[] => {
    if (timesArray.length === 1) {
        // ソート済み
        return timesArray[0];
    }

    const lastIndex = timesArray.length - 1;
    const sorted: Time[][] = [];
    for (let i = 0; i < timesArray.length; i += 2) {
        if (i === lastIndex) {
            sorted.push(timesArray[i]);
            break;
        }
        sorted.push(combineAndSort(timesArray[i], timesArray[i + 1]));
    }

    // 再帰的に処理
    return mergeSort(sorted);
};

/**
 * 2つの配列をソートしながら結合
 * @time_complexity O(M+N)
 * @space_complexity O(M+N)
 */
const combineAndSort = (current: Time[], next: Time[]) => {
    const sorted: Time[] = [];
    let currentIndex = 0;
    let nextIndex = 0;

    // 手前2つずつ 並び替えながら結合
    while (currentIndex < current.length || nextIndex < next.length) {
        // 片方が済なら、もう片方を採用
        if (currentIndex >= current.length) {
            sorted.push(next[nextIndex]);
            nextIndex++;
        } else if (nextIndex >= next.length) {
            sorted.push(current[currentIndex]);
            currentIndex++;
        }
        // 同じ時間なら、終了を採用
        else if (current[currentIndex][0] === next[nextIndex][0]) {
            if (current[currentIndex][1] < next[nextIndex][1]) {
                sorted.push(current[currentIndex]);
                currentIndex++;
            } else {
                sorted.push(next[nextIndex]);
                nextIndex++;
            }
        }
        // 小さい方を採用
        else if (current[currentIndex][0] < next[nextIndex][0]) {
            sorted.push(current[currentIndex]);
            currentIndex++;
        } else {
            sorted.push(next[nextIndex]);
            nextIndex++;
        }
    }
    return sorted;
};

/**
 * 必要な部屋数の算出
 * @time_complexity O(2N) ... O(N)
 * @space_complexity O(1)
 */
const needRoomCount = (times: Time[]) => {
    let usedRoomCount = 0;
    let maxRoomCount = 0;
    for (const time of times) {
        usedRoomCount += time[1];
        if (maxRoomCount < usedRoomCount) {
            maxRoomCount = usedRoomCount;
        }
    }
    return maxRoomCount;
};
