import { Heapq } from 'ts-heapq';

type CharCounters = { [key: string]: number };

/**
 * @see https://colab.research.google.com/drive/12UvYDTAd-jlwRi3Q4r0FuqVVjEbHDlFt
 *
 * @time_complexity     O(N^2) or O(N) 0r O(NlogN)
 * @spatial_complexity  O(N)
 */
export const solve = (s: string): number => {
    const charCounters: CharCounters = makeCharCounters(s);
    return neededDeleteTimesToUnique(charCounters);
};

// 文字の出現回数を格納した配列を作成
const makeCharCounters = (s: string): CharCounters => {
    const charCounters: CharCounters = {};
    for (const char of [...s]) {
        if (char in charCounters) {
            charCounters[char]++;
        } else {
            charCounters[char] = 1;
        }
    }
    return charCounters;
};

// ユニークにするために必要な削除回数の算出
const neededDeleteTimesToUnique = (charCounters: CharCounters) => {
    const heap = new Heapq(Object.values(charCounters));

    let counter = 0;
    const uniqueCounts = new Set<number>();

    while (heap.length() > 0) {
        // 最大値の値を抽出
        let current = heap.pop();

        // Setに追加した前後でSet内の数が変更しなければ
        // ユニークになっていないため削除カウントを進める
        while (
            current > 0 &&
            uniqueCounts.size === uniqueCounts.add(current).size
        ) {
            current--;
            counter++;
        }
    }

    return counter;
};
