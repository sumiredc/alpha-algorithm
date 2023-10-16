/**
 * @see https://colab.research.google.com/drive/1LoGGuF3BsR9MeBPiPDiyIJpxfU9RCXYu
 *
 * @time_complexity O(K! * 9CK)
 * @space_complexity O(K! * 9CK)
 */
type SearchCombinationsParams = {
    startNumber: number;
    unfinishedCombiNums: NumberCollection;
};

export const solve = (k: number, n: number): number[][] => {
    // k個の組み合わせの最大値より大きい or k個の組み合わせの最小値より小さい
    // -> 該当する組み合わせが存在しない
    if (sumAP(9 - k + 1, 1, k) < n || sumAP(1, 1, k) > n) {
        return [];
    }

    const numberCombination = new NumberCombinations(k, n).execute();
    return numberCombination.combiNumsAll;
};

/**
 * 等差配列の和
 * n/2(a + an)  ※ an = 末項
 *
 * @param {number} a 初項
 * @param {number} d 公差
 * @param {number} n 項数
 * @returns {number}
 */
export const sumAP = (a: number, d: number, n: number): number => {
    return (n / 2) * (a + (a + d * (n - 1)));
};

export class NumberCombinations {
    private internalCombiNumsAll: number[][] = [];

    /**
     * @param {number} k 長さ
     * @param {number} n 合計
     */
    constructor(
        private readonly k: number,
        private readonly n: number
    ) {}

    get combiNumsAll(): number[][] {
        return this.internalCombiNumsAll;
    }

    execute(): this {
        this.searchCombinations({
            startNumber: 1,
            unfinishedCombiNums: new NumberCollection(),
        });
        return this;
    }

    private searchCombinations(params: SearchCombinationsParams) {
        const { startNumber, unfinishedCombiNums } = params;

        // k:長さ または n:合計 が 条件を超過していれば処理中断
        if (
            this.isOverLength(unfinishedCombiNums) ||
            this.isOverSum(unfinishedCombiNums)
        ) {
            return;
        }

        for (let i = startNumber; i <= 9; i++) {
            // 現在のループ値をセットして検証
            unfinishedCombiNums.push(i);

            // 条件一致したら、internalCombiNumsAll に結果を追加
            if (this.isMatchLengthAndSum(unfinishedCombiNums)) {
                this.internalCombiNumsAll.push(unfinishedCombiNums.toArray());
                break;
            }
            // この時点で sum が n を over したら、これ以上検証不要
            if (this.isOverSum(unfinishedCombiNums)) {
                break;
            }

            // 次の数字を追加して検証(length + 1)
            this.searchCombinationsWithAddNumber(i, unfinishedCombiNums);

            // 次のループを検証するため現在のループ情報を取り除く
            unfinishedCombiNums.pop();
        }
    }

    // 条件 k:長さ を超えているか
    private isOverLength(nc: NumberCollection): boolean {
        return nc.length > this.k;
    }

    // 条件 n:合計 を超えているか
    private isOverSum(nc: NumberCollection): boolean {
        return nc.sum > this.n;
    }

    // 条件 k:長さ と n:合計 を満たしているか
    private isMatchLengthAndSum(nc: NumberCollection): boolean {
        return nc.length === this.k && nc.sum === this.n;
    }

    // currentStartNumber を進めて再帰的に検証
    private searchCombinationsWithAddNumber(
        currentStartNumber: number,
        unfinishedCombiNums: NumberCollection
    ): void {
        // 現在の数字が9以上なら検証不要
        if (currentStartNumber >= 9) {
            return;
        }
        // combinationNumbers が書き換わらないよう clone して渡す
        this.searchCombinations({
            startNumber: currentStartNumber + 1,
            unfinishedCombiNums: unfinishedCombiNums.clone(),
        });
    }
}

/**
 * 数値配列の合計値をO(1)で算出するためクラス管理
 * ※ 初期配列が指定された場合のみ、初回O(N)で合計値を算出
 */
export class NumberCollection {
    private internalSum = 0;

    constructor(private readonly numbers: number[] = []) {
        // numbersが引数指定されたら合計値を算出
        if (numbers.length > 0) {
            this.internalSum = numbers.reduce(
                (prev, current) => prev + current,
                0
            );
        }
    }

    get sum(): number {
        return this.internalSum;
    }

    get length(): number {
        return this.numbers.length;
    }

    push(n: number): this {
        this.numbers.push(n);
        this.internalSum += n;
        return this;
    }

    pop(): number | undefined {
        if (this.length === 0) {
            return undefined;
        }
        const n: number = this.numbers.pop()!;
        this.internalSum -= n;
        return n;
    }

    toArray(): number[] {
        return this.numbers;
    }

    /**
     * クラスの複製
     * @time_complexity O(N)
     * @space_complexity O(N)
     */
    clone(): NumberCollection {
        return new NumberCollection(this.numbers.slice());
    }
}
