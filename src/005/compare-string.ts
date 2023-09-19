/**
 * @see https://colab.research.google.com/drive/1CIy9oMS6YYc0pVyYwc21av3ZpneNYh1r
 * @see https://docs.google.com/document/d/1mROIPSxpH6AYMAxKsBo0X71jkwdki4qOQpSLahn3UYw/edit
 *
 * @time_complexity     O(N)
 * @spatial_complexity  O(N)
 */

const BACKSPACE = '#';

export const solve = (s: string, t: string): boolean => {
    return deletePrevChar(s) === deletePrevChar(t);
};

const deletePrevChar = (s: string): string => {
    let stack: string = '';

    for (const char of [...s]) {
        if (char === BACKSPACE) {
            stack = stack.substring(0, stack.length - 1);
        } else {
            stack += char;
        }
    }

    return stack;
};
