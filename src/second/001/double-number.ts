/**
 * @see https://colab.research.google.com/drive/1kjYIagIzh7SgiK9CeNdQVhEZDUyj5IkT#scrollTo=yAVsWg1QZyhe
 * @time_complexity O(N)
 * @space_complexity O(N)
 */

export const solve = (nums: number[]): boolean => {
    const halfNums = new Set<number>();

    for (const n of nums) {
        if (halfNums.has(n / 2) || halfNums.has(n * 2)) {
            return true;
        }
        halfNums.add(n);
    }
    return false;
};
