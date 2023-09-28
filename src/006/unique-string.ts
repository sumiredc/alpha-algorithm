type CharCounter = { [key: string]: number };

/**
 * ヒープ構造
 * @see https://colab.research.google.com/drive/12UvYDTAd-jlwRi3Q4r0FuqVVjEbHDlFt
 *
 * ソート
 * @see https://colab.research.google.com/drive/1gx99zHKnG8fUiH_L7F12Sq30iDq3T01H
 *
 * @time_complexity     O(NlogN)
 * @space_complexity  O(1)
 */
export const solve = (s: string): number => {
    const charCounters: CharCounter = getCountOfCharacters(s);
    return getCountDeletedCharas(charCounters);
};

/**
 * 文字の出現回数を格納した配列を作成
 * @time_complexity     O(N)
 * @space_complexity  O(N)
 */
const getCountOfCharacters = (s: string): CharCounter => {
    const charCounters: CharCounter = {};
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
export const getCountDeletedCharas = (charCounters: CharCounter) => {
    /** @time_complexity O(NlogN) */
    const asc = Object.values(charCounters).sort((a, b) => a - b);
    let counter = 0;

    // 最大値を直前の値として用意
    let before = asc.pop()!;

    /** @time_complexity O(N) */
    while (asc.length > 0) {
        const current = asc.pop()!;

        if (before <= current) {
            // 直前の値から-1の数にするために必要な減算値をカウントアップする
            counter += clampedSubtraction(current, before);
            if (before > 1) {
                before--;
            }
        } else {
            before = current;
        }
    }

    return counter;
};

// 2つの数の差分を算出する
export const clampedSubtraction = (x: number, y: number) => {
    const rsv = y - 1;
    if (rsv > x) {
        return x;
    }
    return x - rsv;
};
