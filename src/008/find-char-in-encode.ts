/**
 * @see https://colab.research.google.com/drive/1gK0DjJE8KyvgWxTDUlUHN1DuLyWOMPes
 *
 * @time_complexity     O(N)
 * @space_complexity    O(1)
 */
const numSet = new Set(['2', '3', '4', '5', '6', '7', '8', '9']);

export const solve = (s: string, x: number): string => {
    return searchChar(s, x);
};

/**
 * @param {string} s 検索対象の文字列
 * @param {number} n 検索したい場所 〇〇番目（index + 1）
 * @returns
 */
export const searchChar = (s: string, n: number): string => {
    if (n < 1 || n % 1 !== 0) {
        throw Error('n は 整数でお願いします');
    }

    // pointer番目(index + 1)
    let pointer = 0;
    let target = '';
    let lastChar = '';

    for (const char of s) {
        const prevPointer = pointer;
        // 数値かどうかを判定
        const isNum = numSet.has(char);

        if (isNum) {
            // 数字なら pointer に乗算
            pointer *= Number(char);
        } else {
            // アルファベットなら pointer を +1
            pointer++;
            // 現在検証中の文字列を最後尾の文字列として保管
            lastChar = char;
        }

        if (pointer < n) {
            continue;
        }

        /**
         * pointer が 検索したい番目と一致
         *
         * alphabet -> 現在の文字で確定
         * number   -> 最後に出てきた文字で確定
         */
        if (pointer === n) {
            target = isNum ? lastChar : char;
            break;
        }

        // 現在の pointer と 検索番目 のあまりが、次の検索位置
        const nextN = n % prevPointer;

        // 次の検索位置が0なら、最後に出てきた文字が該当
        if (nextN === 0) {
            target = lastChar;
            break;
        }

        // 再帰的に検証
        target = searchChar(s, nextN);
        break;
    }

    return target;
};
