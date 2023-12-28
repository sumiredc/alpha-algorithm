/**
 * @see https://colab.research.google.com/drive/1FVLCiJKx4fUVLYB4sE3o4yT0HPIycZxj
 *
 * @time_complexity O(NlogN + N) = O(NlogN)
 * @space_complexity O(1)
 */
export const solve = (balloons: number[][]): number => {
    // バルーンが0件なら処理不要
    if (balloons.length === 0) {
        return 0;
    }

    // 開始値で昇順ソート
    balloons.sort((a, b) => a[0] - b[0]);

    /** 必要な弾数 */
    let bullets = 0;
    /** 重なりを判定する境界値 = 直前のバルーンの右端 */
    let boundary = balloons[0][0] - 1;

    for (let i = 0; i < balloons.length; i++) {
        /**
         *             (^ω^)
         * lBoundary |---|---| rBoundary
         *               |
         */
        const lBoundary = balloons[i][0];
        const rBoundary = balloons[i][1];

        if (boundary < lBoundary) {
            // バルーンの開始値が境界値を超えていれば
            // 追加の弾が必要
            bullets++;
            boundary = rBoundary;
        } else if (boundary > rBoundary) {
            // 検証中のバルーンの右端が、境界値より小さければ
            // 境界値を上書き
            boundary = rBoundary;
        }
    }
    return bullets;
};
