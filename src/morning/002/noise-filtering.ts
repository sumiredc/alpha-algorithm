// %%typescript_test
/**
 * @see https://colab.research.google.com/drive/14s77rWbgfwqxKamPO0msnK3p2MQZ8C_r
 *
 * 下記フラグを使い分ける
 *
 * 2: 描画確定
 * 1: 保留（ノイズ or 描画）
 * 0: ホワイト
 *
 * @time_complexity O(N)
 * @space_complexity O(1)
 */
export const solve = (image: number[][]): number[][] => {
    // 左上から右下へ、1pxずつ検証
    for (let row = 0; row < image.length; row++) {
        for (let col = 0; col < image[0].length; col++) {
            image[row][col] = checkCel(image, row, col);

            // 描画確定(2)と判定されたら、4方を再帰的に探索して、保留(1)を描画確定(2)に置き換える
            if (image[row][col] === 2) {
                finalizeDrawing(image, row - 1, col); // ←
                finalizeDrawing(image, row, col - 1); // ↑
                finalizeDrawing(image, row + 1, col); // →
                finalizeDrawing(image, row, col + 1); // ↓
            }
        }
    }

    // ノイズ(1)を取り除き(0)、描画部分(2)を出力形式(1)に戻す
    for (let row = 0; row < image.length; row++) {
        for (let col = 0; col < image[0].length; col++) {
            image[row][col] = image[row][col] === 2 ? 1 : 0;
        }
    }

    return image;
};

/**
 * @backtracking
 */
const checkCel = (
    image: number[][],
    row: number,
    col: number,
    aroundCheck = true
): number => {
    // image に存在しない座標(外枠)は 描画確定(2) とみなす
    if (!(row in image) || !(col in image[row])) {
        return 2;
    }

    const cel = image[row][col];

    // 4方のチェックが不要 or 座標の値がホワイト(0) であれば、値をそのまま返却
    if (!aroundCheck || cel === 0) {
        return cel;
    }

    // この時点で、現在座標は 保留(1)

    // 4方の値を取得（再帰的に実施しない）
    const rect: number[] = [
        checkCel(image, row - 1, col, false), // ←
        checkCel(image, row, col - 1, false), // ↑
        checkCel(image, row + 1, col, false), // →
        checkCel(image, row, col + 1, false), // ↓
    ];

    // 描画確定(2)に隣接していれば、描画確定(2)
    return rect.includes(2) ? 2 : cel;
};

/**
 * 描画確定(2)に隣接する保留(1)を、描画確定(2)に変換する
 * @backtracking
 */
const finalizeDrawing = (image: number[][], row: number, col: number) => {
    if (!(row in image) || !(col in image[row]) || image[row][col] !== 1) {
        return;
    }

    image[row][col] = 2;

    finalizeDrawing(image, row - 1, col); // ←
    finalizeDrawing(image, row, col - 1); // ↑
    finalizeDrawing(image, row + 1, col); // →
    finalizeDrawing(image, row, col + 1); // ↓
};
