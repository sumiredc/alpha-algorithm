/**
 * @time_complexity O(n + k)
 * @space_complexity O(n - k)
 */
export const solve = (s: string, k: number): string => {
    const stack: number[] = [];
    for (const n of s) {
        const num = parseInt(n);
        while (k > 0 && stack.length > 0 && stack[stack.length - 1] > num) {
            stack.pop();
            k--;
        }
        stack.push(num);
        if (stack.length === 1 && stack[0] === 0) {
            stack.pop();
        }
    }
    while (k > 0) {
        stack.pop();
        k--;
    }
    return stack.length === 0 ? '0' : stack.join('');
};
