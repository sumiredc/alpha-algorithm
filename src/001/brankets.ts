const openBrankets = new Set(['{', '(', '[']);
const brankets = new Set(['{}', '()', '[]']);

/**
 * @see https://colab.research.google.com/drive/1vK5gRo8NV4w7BLKG_EbLIaF9nz050V6I#scrollTo=ulSuWMlWUexR
 * @see https://docs.google.com/document/d/1_sC8n4FiMwECVewDafR3rQmjV9G77cEDGQV4LzLULGg/edit#heading=h.qnbmjfbv9qo0
 *
 * @time_complexity     O(√N)
 * @space_complexity  O(√N)
 */

export const solve = (s: string): boolean => {
    // 奇数なら条件一致はありえない
    if (s.length % 2) {
        return false;
    }

    const stack: string[] = [];

    for (let i = 0; i < s.length; i++) {
        const char = s[i];
        const lastIdx = stack.length - 1;

        // 開始カッコの場合は、スタックに格納
        if (openBrankets.has(char)) {
            stack.push(char);
            continue;
        }
        // 終了カッコの場合は、最後にスタックへ格納したカッコとペアになっているか確認
        const branket = stack[lastIdx] + char;
        if (brankets.has(branket)) {
            // 一致すればペア成立としてスタックから開始カッコを取り出し
            stack.pop();
        } else {
            // ペア不成立の場合、条件一致はありえない
            return false;
        }
    }
    return stack.length === 0;
};
