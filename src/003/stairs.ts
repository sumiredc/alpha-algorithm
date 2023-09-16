/**
 * @see https://colab.research.google.com/drive/1D6EXk0UFIWjgGC_B5cJU-r7kX0JIDr13#scrollTo=XbvDWXd6jtED
 *
 * @time_complexity     O(N)
 * @spatial_complexity  O(1)
 */
export const solve = (n: number): number => {
    let sum = 0;
    // 検証値をそれぞれ倍数加算していき並行検証
    // 最も小さい検証値の倍数が入力値以上になればループ終了
    for (
        let mulNums = [3, 5];
        mulNums[0] < n;
        mulNums = [mulNums[0] + 3, mulNums[1] + 5]
    ) {
        sum += mulNums[0];
        // ５の倍数は、３の倍数に該当せず検証値未満であれば加算
        if (mulNums[1] < n && mulNums[1] % 3 !== 0) {
            sum += mulNums[1];
        }
    }
    return sum;
};
