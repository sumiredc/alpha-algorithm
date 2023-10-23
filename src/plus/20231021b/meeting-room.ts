/**
 * @see https://colab.research.google.com/drive/1okAwgB8qZtxqbhiX8NuxNIJsEs4dgYbi
 *
 * @time_complexity   O(NlogN)
 * @space_complexity  O(N)
 */
export const solve = (schedules: number[][]): number => {
    schedules = mergeSort(schedules);
    return needRoomCount(schedules);
};

/**
 * 開始時刻の昇順ソート
 * DP Merge Sort
 *
 * @time_complexity   O(NlogN)
 * @space_complexity  O(N)
 */
export const mergeSort = (schedules: number[][]) => {
    const scope = new CurrentScope(schedules.length);
    do {
        schedules = scopeSort(schedules, scope);
    } while (scope.next());
    return schedules;
};

/**
 * 整列されたスコープのソート
 *
 * @lsv start <= lsv <= split
 * @rsv split < rsv <= end
 */
export const scopeSort = (schedules: number[][], scope: CurrentScope) => {
    const lsv = sliceDesc(schedules, scope.start, scope.split);
    const rsv = sliceDesc(schedules, scope.split + 1, scope.end);
    let sortIndex = scope.start;

    while (lsv.length > 0 || rsv.length > 0) {
        // - どちらか一方が終了している -> 未了側からsortedへ格納
        // - lsv と rsv の小さい方を採用
        if (lsv.length === 0) {
            schedules[sortIndex] = rsv.pop()!;
        } else if (rsv.length === 0) {
            schedules[sortIndex] = lsv.pop()!;
        } else if (lsv[lsv.length - 1][0] < rsv[rsv.length - 1][0]) {
            schedules[sortIndex] = lsv.pop()!;
        } else {
            schedules[sortIndex] = rsv.pop()!;
        }
        sortIndex++;
    }
    return schedules;
};

/**
 * 逆順にしてスライス
 */
export const sliceDesc = (
    schedules: number[][],
    start: number,
    end: number
) => {
    if (schedules.length <= end) {
        return [];
    }
    const sorted: number[][] = [];
    for (; end >= start; end--) {
        sorted.push(schedules[end]);
    }
    return sorted;
};

/**
 * 必要な部屋数の算出
 *
 * @time_complexity   O(N)
 * @space_complexity  O(N)
 */
export const needRoomCount = (schedules: number[][]) => {
    const rooms: number[][] = [];

    for (const schedule of schedules) {
        const checkIn = enterRoom(rooms, schedule);
        // 空いている部屋がなければ1部屋追加
        if (!checkIn) {
            rooms.push(schedule);
        }
    }
    return rooms.length;
};

// 部屋に入れるかどうか確認
export const enterRoom = (rooms: number[][], schedule: number[]) => {
    for (let i = rooms.length - 1; i >= 0; i--) {
        // 開始時間に空いていなければ、次の部屋を確認
        if (rooms[i][1] > schedule[0]) {
            continue;
        }
        // 開始時間に終わっていれば、チェックイン
        rooms[i] = schedule;
        return true;
    }
    return false;
};

// MergeSort のマージ対象のインデックス管理クラス
export class CurrentScope {
    private internalStart = 0;
    private internalSplit = 0;
    private internalEnd: number;
    private internalRange: number;
    private readonly lastIndex: number;

    constructor(private readonly length: number) {
        this.lastIndex = length - 1;
        if (length < 1 || length % 1 > 0) {
            throw new Error(
                'Please specify length greater than or equal to 1.'
            );
        }
        // length が 1 の場合 と それ以外の分岐を作成
        this.internalEnd = length > 1 ? 1 : 0;
        this.internalRange = length > 1 ? 2 : 1;
    }

    get start() {
        return this.internalStart;
    }

    get split() {
        return this.internalSplit;
    }

    get end() {
        return this.internalEnd;
    }

    get range() {
        return this.internalRange;
    }

    // 次のスコープを算出
    next(): boolean {
        if (this.isLastScope()) {
            return false;
        }
        if (this.isEndScope()) {
            this.nextToStartScope();
        } else {
            this.nextToScope();
        }
        return true;
    }

    private isLastScope() {
        return this.isStartScope() && this.isEndScope();
    }

    private isEndScope() {
        return this.end === this.lastIndex;
    }

    private isStartScope() {
        return this.start === 0;
    }

    private nextToStartScope() {
        this.internalStart = 0;
        this.internalSplit = this.start + this.range - 1;
        // range が length を超過しないように監視
        const nextRange = this.range * 2;
        this.internalRange = nextRange < this.length ? nextRange : this.length;
        this.internalEnd = this.range - 1;
    }

    private nextToScope() {
        this.internalStart += this.range;
        const nextSplit = this.split + this.range;
        // split が lastIndex を超過しないよう監視
        this.internalSplit =
            nextSplit < this.lastIndex ? nextSplit : this.lastIndex;
        // split が lastIndex を超過しないよう監視
        const nextEnd = this.end + this.range;
        this.internalEnd = nextEnd < this.lastIndex ? nextEnd : this.lastIndex;
    }
}
