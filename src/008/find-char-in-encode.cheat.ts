/**
 * @see https://colab.research.google.com/drive/1gK0DjJE8KyvgWxTDUlUHN1DuLyWOMPes
 *
 * @time_complexity     O(N)
 * @space_complexity    O(N)
 */

type StructureRow = { chars: string; times: number };
const numSet = new Set(['2', '3', '4', '5', '6', '7', '8', '9']);

export const solve = (s: string, x: number): string => {
    // 文字列, 繰り返し回数 が1行になったsの構造を作成
    const stringStructure = makeStringStructure(s);

    let encodeString = '';
    let targetChar = '';
    for (const { chars, times } of stringStructure) {
        encodeString += chars;
        // リピートした結果の文字長を事前に算出
        const nextLength = encodeString.length * times;

        // x が 文字長以上であれば、x番目を算出
        if (nextLength >= x) {
            targetChar = searchCharInUnitString(encodeString, x);
            break;
        }
        // このループまでの文字列を作成
        encodeString = encodeString.repeat(times);
    }
    return targetChar;
};

// 数字の含まれた文字列を 文字列, 繰り返し回数 の構造に変換
const makeStringStructure = (s: string) => {
    const structure: StructureRow[] = [];
    structure.push(makeStructureRow());

    for (const char of [...s]) {
        let index = structure.length - 1;
        if (numSet.has(char)) {
            // 数字
            structure[index].times *= Number(char);
        } else {
            // 文字
            if (structure[index].times !== 1) {
                structure.push(makeStructureRow());
                index = structure.length - 1;
            }
            structure[index].chars += char;
        }
    }
    return structure;
};

export const makeStructureRow = (): StructureRow => ({ chars: '', times: 1 });

// 文字列から◯番目を検索
export const searchCharInUnitString = (
    unitString: string,
    num: number
): string => {
    let index = unitString.length - 1;
    const remain = num % unitString.length;
    if (remain > 0) {
        index = remain - 1;
    }
    return unitString.substring(index, index + 1);
};
