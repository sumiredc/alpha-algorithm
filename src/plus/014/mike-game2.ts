/**
 * @see https://colab.research.google.com/drive/1uGpLF4b4SWoOSI83F7Hjjk7ieXSmNKbM
 *
 * N = 幅
 * @time_complexity O(N)
 * @space_complexity O(1)
 */

enum Cell {
    EMPTY = 0,
    GHOST = 1,
    COIN = 2,
}

export const solve = (matrix: number[][]): number => {
    const sky = matrix[0];
    const ground = matrix[1];
    let coin = 0;

    // ゴール手前までを検証
    let x = 1;
    while (x < ground.length - 1) {
        if (sky[x] === Cell.GHOST && ground[x] === Cell.GHOST) {
            throw new Error('これ以上進めません');
        }

        // 次のマスに進む
        if (shouldMoveToNext(sky, ground, x)) {
            coin += getCoinCount(ground[x]);
            x++;
            continue;
        }

        // ジャンプする（2マス進む）
        coin += getCoinCount(sky[x]) + getCoinCount(ground[x + 1]);
        x += 2;
    }

    // ゴール地点のコインを回収
    const goal = ground.length - 1;
    coin += getCoinCount(ground[goal]);

    return coin;
};

// 次のマスに進むべきかどうか を判定
const shouldMoveToNext = (sky: number[], ground: number[], nextIdx: number) => {
    // 次の床がゴースト -> false
    if (ground[nextIdx] === Cell.GHOST) {
        return false;
    }
    // 空がゴースト or 次の次の床がゴースト or 次の床がコイン or 次の空に何もない
    return (
        sky[nextIdx] === Cell.GHOST ||
        ground[nextIdx + 1] === Cell.GHOST ||
        ground[nextIdx] === Cell.COIN ||
        sky[nextIdx] !== Cell.COIN
    );
};

// 指定位置で得られるコインの枚数を算出
const getCoinCount = (position: number) => {
    return position === Cell.COIN ? 1 : 0;
};
