/**
 * @see https://colab.research.google.com/drive/1tA19_sEDTeXwT1xBfS0HzDGcNFclLGdX
 *
 * @time_complexity     O(logN)
 * @space_complexity  O(logN)
 */
const cache = new Map<number, number>();

export const solve = (x: number, n: number): number => {
    cache.clear();
    const result = cal(x, abs(n));
    return n < 0 ? 1 / result : result;
};

/**
 * @param x 基数
 * @param n 指数
 */
const cal = (x: number, n: number): number => {
    if (n === 0) {
        return 1;
    } else if (n === 1) {
        return x;
    } else if (n === 2) {
        return x * x;
    }
    if (cache.has(n)) {
        return cache.get(n)!;
    }

    const remain = n % 2;
    const n2 = (n - remain) / 2;
    const re = cal(x, n2) * cal(x, n2);

    cache.set(n, remain === 1 ? re * x : re);
    return cache.get(n)!;
};

const abs = (n: number) => {
    return n > 0 ? n : n * -1;
};
