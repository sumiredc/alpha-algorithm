// %%typescript_test
/**
 * @see https://colab.research.google.com/drive/14s77rWbgfwqxKamPO0msnK3p2MQZ8C_r
 *
 * N = Pixel数
 *
 * @time_complexity O(N)
 * @space_complexity O(1)
 */

enum PixelTmpStatus {
    KEEP = 2,
    PENDING = 1,
    NONE = 0,
}

enum PixclStatus {
    ON = 1,
    OFF = 0,
}

export const solve = (image: number[][]): number[][] => {
    // 左上から右下へ、1pxずつ検証
    for (let row = 0; row < image.length; row++) {
        for (let col = 0; col < image[0].length; col++) {
            image[row][col] = checkCel(image, row, col);

            // 描画確定(Keep)と判定されたら、4方を再帰的に探索して、保留(Pending)を描画確定(Keep)に置き換える
            if (image[row][col] === PixelTmpStatus.KEEP) {
                finalizeDrawing(image, row - 1, col); // Left
                finalizeDrawing(image, row, col - 1); // Top
                finalizeDrawing(image, row + 1, col); // Right
                finalizeDrawing(image, row, col + 1); // Bottom
            }
        }
    }

    // ノイズ(Pending)を取り除き(Off)、描画部分(Keep)を出力形式(On)に戻す
    for (let row = 0; row < image.length; row++) {
        for (let col = 0; col < image[0].length; col++) {
            image[row][col] =
                image[row][col] === PixelTmpStatus.KEEP
                    ? PixclStatus.ON
                    : PixclStatus.OFF;
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
    // image に存在しない座標(外枠)は 描画確定(Keep) とみなす
    if (!(row in image) || !(col in image[row])) {
        return PixelTmpStatus.KEEP;
    }

    const cel = image[row][col];

    // 4方のチェックが不要 or 座標の値がホワイト(None) であれば、値をそのまま返却
    if (!aroundCheck || cel === PixelTmpStatus.NONE) {
        return cel;
    }

    // この時点で、現在座標は 保留(Pending)

    // 4方の値を取得（再帰的に実施しない）
    const rect: number[] = [
        checkCel(image, row - 1, col, false), // Left
        checkCel(image, row, col - 1, false), // Top
        checkCel(image, row + 1, col, false), // Right
        checkCel(image, row, col + 1, false), // Bottom
    ];

    // 描画確定(Keep)に隣接していれば、描画確定(Keep)
    return rect.includes(PixelTmpStatus.KEEP) ? PixelTmpStatus.KEEP : cel;
};

/**
 * 描画確定(Keep)に隣接する保留(Pending)を、描画確定(Keep)に変換する
 * @backtracking
 */
const finalizeDrawing = (image: number[][], row: number, col: number) => {
    if (
        !(row in image) ||
        !(col in image[row]) ||
        image[row][col] !== PixelTmpStatus.PENDING
    ) {
        return;
    }

    image[row][col] = PixelTmpStatus.KEEP;

    finalizeDrawing(image, row - 1, col); // Left
    finalizeDrawing(image, row, col - 1); // Top
    finalizeDrawing(image, row + 1, col); // Right
    finalizeDrawing(image, row, col + 1); // Bottom
};
