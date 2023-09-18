import { Heapq } from 'ts-heapq';

/**
 * @see https://colab.research.google.com/drive/12UvYDTAd-jlwRi3Q4r0FuqVVjEbHDlFt
 *
 * @time_complexity     O(N^2)
 * @spatial_complexity  O(N)
 */
export const solve = (s: string): number => {
    const stock: { [key: string]: number } = {};
    for (const char of [...s]) {
        if (char in stock) {
            stock[char]++;
        } else {
            stock[char] = 1;
        }
    }

    const unique = new Set<number>();

    const heap = new Heapq(Object.values(stock));

    let counter = 0;

    while (heap.length() > 0) {
        let current = heap.pop();
        while (current > 0 && unique.has(current)) {
            current--;
            counter++;
        }
        unique.add(current);
    }

    return counter;
};
