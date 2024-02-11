/**
 * @see https://colab.research.google.com/drive/1MbLtkwVSSMlXDnI1PwRev8r8RZ_Brrs-
 *
 * @var N = 列数(width)
 * @var M = 行数(height)
 *
 * @time_complexity O(N*M)
 * @space_complexity O(N)
 */

enum Cell {
    NONE = 0,
    BLOCK = 1,
    COIN = 2,
}

type X = number;
type Coin = number;

export const solve = (matrix: number[][]): number => {
    if (matrix.length === 0) {
        return 0;
    }

    const height = matrix.length;
    const width = matrix[0].length;

    // 検証が必要なx座標の位置
    let verifyXStart = 0;

    const midProgress: Map<X, Coin> = new Map();
    for (let y = 0; y < height; y++) {
        for (let x = verifyXStart; x < width; x++) {
            // 道路なら「前(Left or Right)のコイン数 + 現在位置のコイン」を算出
            if (matrix[y][x] !== Cell.BLOCK) {
                const currentCoin = matrix[y][x] === Cell.COIN ? 1 : 0;
                midProgress.set(
                    x,
                    currentTotalCoin(currentCoin, x, midProgress)
                );
                continue;
            }

            // BLOCK なら 現在座標を削除
            midProgress.delete(x);
            // Backできないため、次のxループ開始位置を進める
            if (x === verifyXStart) {
                verifyXStart++;
            }
            continue;
        }
    }

    const goalCoin = midProgress.get(width - 1);

    if (goalCoin === undefined) {
        throw new Error('Unable to reach the goal.');
    }

    return goalCoin;
};

const currentTotalCoin = (
    currentCoin: number,
    x: number,
    midProgress: Map<X, Coin>
) => {
    const left = midProgress.get(x - 1) ?? 0;
    const top = midProgress.get(x) ?? 0;
    return currentCoin + Math.max(left, top);
};
