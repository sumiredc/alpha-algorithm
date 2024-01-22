// %%typescript_test
/**
 * @see https://colab.research.google.com/drive/14s77rWbgfwqxKamPO0msnK3p2MQZ8C_r
 *
 * N = Pixel数
 *
 * @time_complexity O(N)
 * @space_complexity O(1)
 */

enum PixelStatus {
    CLEAN_BLACK = 2,
    BLACK = 1,
    WHITE = 0,
}

const directionDeltas: [number, number][] = [
    [-1, 0], // Left
    [0, -1], // Top
    [1, 0], // Right
    [0, 1], // Bottom
];

export const solve = (image: number[][]): number[][] => {
    // 左上から右下へ、1pxずつ検証
    for (let row = 0; row < image.length; row++) {
        for (let col = 0; col < image[0].length; col++) {
            image[row][col] = checkCellStatus(image, row, col);

            // 描画確定(CLEAN_BLACK) でなければ次のループへ
            if (image[row][col] !== PixelStatus.CLEAN_BLACK) {
                continue;
            }

            // 描画確定(CLEAN_BLACK) なら、4方を再帰的に探索して、保留(BLACK)を描画確定(CLEAN_BLACK)へ置換
            for (const delta of directionDeltas) {
                finalizeDrawing(image, row + delta[0], col + delta[1]);
            }
        }
    }

    // ノイズ(BLACK)を取り除き(WHITE)、描画部分(CLEAN_BLACK)を出力形式(BLACK)に戻す
    for (let row = 0; row < image.length; row++) {
        for (let col = 0; col < image[0].length; col++) {
            image[row][col] =
                image[row][col] === PixelStatus.CLEAN_BLACK
                    ? PixelStatus.BLACK
                    : PixelStatus.WHITE;
        }
    }

    return image;
};

/**
 * 対象セルの状態を判定
 *
 * @backtracking
 */
const checkCellStatus = (
    image: number[][],
    row: number,
    col: number,
    aroundCheck = true
): number => {
    // image に存在しない座標(外枠)は 描画確定(CLEAN_BLACK) とみなす
    if (isOuter(image, row, col)) {
        return PixelStatus.CLEAN_BLACK;
    }

    const cell = image[row][col];

    // 4方のチェックが不要 or 座標の値がホワイト(WHITE) であれば、値をそのまま返却
    if (!aroundCheck || cell === PixelStatus.WHITE) {
        return cell;
    }

    // この時点で、現在座標は 保留(BLACK)

    return isAdjacentCleanBlack(image, row, col)
        ? PixelStatus.CLEAN_BLACK
        : cell;
};

/**
 * 4方の値をチェックして、外枠 又は 描画確定(CLEAN_BLACK) と隣接していれば true
 */
const isAdjacentCleanBlack = (image: number[][], row: number, col: number) => {
    return directionDeltas.some(delta => {
        const y = row + delta[0];
        const x = col + delta[1];
        return isOuter(image, y, x) || image[y][x] === PixelStatus.CLEAN_BLACK;
    });
};

/**
 * 描画確定(CLEAN_BLACK)に隣接する保留(BLACK)を、描画確定(CLEAN_BLACK)に置換
 *
 * @backtracking
 */
const finalizeDrawing = (image: number[][], row: number, col: number) => {
    if (isOuter(image, row, col) || image[row][col] !== PixelStatus.BLACK) {
        return;
    }

    image[row][col] = PixelStatus.CLEAN_BLACK;

    for (const delta of directionDeltas) {
        finalizeDrawing(image, row + delta[0], col + delta[1]);
    }
};

/**
 * 外枠判定(外枠 === CLEAN_BLACK)
 */
const isOuter = (image: number[][], row: number, col: number) => {
    return !(row in image && col in image[row]);
};
