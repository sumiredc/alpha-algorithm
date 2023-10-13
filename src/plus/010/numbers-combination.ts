/**
 * @see https://colab.research.google.com/drive/1LoGGuF3BsR9MeBPiPDiyIJpxfU9RCXYu
 *
 * @time_complexity O(9K)
 * @space_complexity O(9K)
 */
const ans: number[][] = [];

export const solve = (k: number, n: number): number[][] => {
    // 次のテストケースへ引き継ぐためにリセット
    ans.length = 0;

    // k個の組み合わせの最大値より大きい or k個の組み合わせの最小値より小さい
    // -> 該当する組み合わせが存在しない
    if (sumAP(9 - k + 1, 1, k) < n || sumAP(1, 1, k) > n) {
        return [];
    }

    searchCombination(k, n, 1, [], 0);

    return ans;
};

// 再帰的に組み合わせを探す
export const searchCombination = (
    k: number,
    n: number,
    startNumber: number,
    numbers: number[],
    sum: number
) => {
    // k と n が 条件over していれば処理中断
    if (numbers.length > k || sum > n) {
        return;
    }

    for (let i = startNumber; i <= 9; i++) {
        numbers.push(i);
        // 合計値の算出処理でループを生まないようセットで算出
        sum += i;

        // 条件一致したら、ans に結果を格納
        if (numbers.length === k && sum === n) {
            ans.push(numbers);
            break;
        }
        // この時点で sum が n を over したら、これ以上検証不要
        if (sum > n) {
            break;
        }

        // startNumber を進めて再帰的に検証
        // numbers が書き換わらないよう clone して渡す
        searchCombination(k, n, i + 1, numbers.slice(), sum);

        // 次のループを検証するため現在のループ情報を取り除く
        numbers.pop();
        sum -= i;
    }
};

/**
 * 等差配列の和
 * n/2(a + an)  ※ an = 末項
 *
 * @param {number} a 初項
 * @param {number} d 公差
 * @param {number} n 項数
 * @returns {number}
 */
export const sumAP = (a: number, d: number, n: number): number => {
    return (n / 2) * (a + (a + d * (n - 1)));
};
