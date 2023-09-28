/**
 * @see https://colab.research.google.com/drive/1CIy9oMS6YYc0pVyYwc21av3ZpneNYh1r
 * @see https://docs.google.com/document/d/1mROIPSxpH6AYMAxKsBo0X71jkwdki4qOQpSLahn3UYw/edit
 *
 * @time_complexity     O(N)
 * @space_complexity  O(1)
 */

const BACKSPACE = '#';

export const solve = (s: string, t: string): boolean => {
    return deletePrevChar(s) === deletePrevChar(t);
};

const deletePrevChar = (s: string): string => {
    let pointer = s.length - 1;
    let backspaceCount = 0;

    while (pointer >= 0) {
        const currentChar = s.substring(pointer, pointer + 1);
        if (currentChar === BACKSPACE) {
            backspaceCount++;
            s = dropChar(s, pointer);
        } else if (backspaceCount > 0) {
            backspaceCount--;
            s = dropChar(s, pointer);
        }
        pointer--;
    }

    return s;
};

// index指定した箇所の文字を削除する関数
export const dropChar = (s: string, i: number) =>
    s.substring(0, i) + s.substring(i + 1, s.length);
