/**
 * @see https://colab.research.google.com/drive/1xHk_rnrHxv7MqfYpORWolxUZ_YXkWepU
 *
 * @time_complexity   O(N)
 * @space_complexity  O(1)
 */
let pattern = 0;

export const solve = (path: boolean[]): number => {
    pattern = 0;
    if (!path[0] || !path[path.length - 1]) {
        return 0;
    }
    if (path.length === 1) {
        return 1;
    }
    rollTheDice(0, path);
    return pattern;
};

export const rollTheDice = (currentIndex: number, path: boolean[]) => {
    if (currentIndex > path.length - 1) {
        return;
    }
    const dice = [1, 2, 3];

    for (const v of dice) {
        const nextIndex = currentIndex + v;
        if (!path[nextIndex]) {
            continue;
        }
        if (nextIndex === path.length - 1) {
            pattern++;
            break;
        }

        rollTheDice(nextIndex, path);
    }
};
