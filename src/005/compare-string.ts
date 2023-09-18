/**
 * @see https://colab.research.google.com/drive/1CIy9oMS6YYc0pVyYwc21av3ZpneNYh1r
 *
 * @time_complexity     O(N)
 * @spatial_complexity  O(1)
 */

const BACKSPACE = '#';

export const solve = (s: string, t: string): boolean => {
    return backspace(s) === backspace(t);
};

const backspace = (s: string): string => {
    while (s.indexOf(BACKSPACE) !== -1) {
        const index = s.indexOf(BACKSPACE);

        if (index === 0) {
            // 先頭のBACKSPACE記号を削除
            s = s.substring(1, s.length);
        } else {
            // BACKSPACEの1文字前と、BACKSPACE記号を削除
            s = s.substring(0, index - 1) + s.substring(index + 1, s.length);
        }
    }
    return s;
};
