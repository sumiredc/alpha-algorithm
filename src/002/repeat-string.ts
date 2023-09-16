/**
 * @see https://colab.research.google.com/drive/1LhBlRBWkJdpQWaM53ZQiDCccnqVagajx#scrollTo=xCFYJxJLjauC
 *
 * @time_complexity     O(N)
 * @spatial_complexity  O(1)
 */
export const solve = (s: string): boolean => {
    // 1文字の場合繰り返しが成立しない
    if (s.length === 1) {
        return false;
    }
    // すべて同じ文字列の場合は true
    if (new Set([...s]).size === 1) {
        return true;
    }

    for (let repeatCount = 2; repeatCount <= s.length; repeatCount++) {
        // 分割数で割り切れなければ繰り返しは成立しないのでスキップ
        if (s.length % repeatCount !== 0) {
            continue;
        }

        const quotientNumber = s.length / repeatCount;

        // 検証中の値と商が反転したらすでにチェック済みのため検証不要
        if (repeatCount > quotientNumber) {
            break;
        }

        if (isPattern(s, quotientNumber, repeatCount)) {
            return true;
        }

        if (repeatCount === quotientNumber) {
            break;
        }

        // 商を同時検証
        if (isPattern(s, repeatCount, quotientNumber)) {
            return true;
        }
    }
    return false;
};

// パターンにマッチするか検証
const isPattern = (s: string, num: number, len: number): boolean => {
    const pattern = s.substring(0, len);

    // 分割したパターンの繰り返しと入力文字列が一致するか確認
    return pattern.repeat(num) === s;
};
