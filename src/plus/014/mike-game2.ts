/**
 * @see https://colab.research.google.com/drive/1uGpLF4b4SWoOSI83F7Hjjk7ieXSmNKbM
 *
 * N = 幅
 * @time_complexity O(N)
 * @space_complexity O(1)
 */

enum Status {
    NONE = 0,
    GHOST = 1,
    COIN = 2,
}

export const solve = (matrix: number[][]): number => {
    const sky = matrix[0];
    const ground = matrix[1];
    let coin = 0;

    // ゴール手前までを検証
    for (let next = 1; next < ground.length - 1; next++) {
        if (sky[next] === Status.GHOST && ground[next] === Status.GHOST) {
            throw new Error('これ以上進めません');
        }

        // 次のマスに進む
        if (shouldMoveToNext(sky, ground, next)) {
            coin += getCoinCount(ground[next]);
            continue;
        }

        // ジャンプする（2マス進む）
        coin += getCoinCount(sky[next]) + getCoinCount(ground[next + 1]);
        next++;
    }

    // ゴール地点のコインを回収
    const goal = ground.length - 1;
    coin += getCoinCount(ground[goal]);

    return coin;
};

// 次のマスに進むべきかどうか を判定
const shouldMoveToNext = (sky: number[], ground: number[], next: number) => {
    // 次の床がゴースト -> false
    if (ground[next] === Status.GHOST) {
        return false;
    }
    // 空がゴースト or 次の次の床がゴースト or 次の床がコイン or 次の空に何もない
    return (
        sky[next] === Status.GHOST ||
        ground[next + 1] === Status.GHOST ||
        ground[next] === Status.COIN ||
        sky[next] !== Status.COIN
    );
};

// 指定位置で得られるコインの枚数を算出
const getCoinCount = (position: number) => {
    return position === Status.COIN ? 1 : 0;
};
