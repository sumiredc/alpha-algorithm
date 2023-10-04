import {
    makeListNode as ln,
    makeListNode,
    toStrNumber,
} from '../../lib/listnode/listnode';
import {
    addPlace,
    getNodeList,
    getOnesPlace,
    getTensPlace,
    mulPlace,
    solve,
} from './mul-two-numbers';

describe.each([
    [[9, 9], [9, 9], '1089'],
    [[9, 9, 9], [9, 9, 9], '100899'],
    [[9, 9, 9, 9], [9, 9, 9, 9], '10008999'],
    [[9, 9, 9, 9, 9], [9, 9, 9, 9, 9], '1000089999'],
    [
        [
            9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9,
            9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9,
            9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9,
            9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9,
        ],
        [
            9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9,
            9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9,
            9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9,
            9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9,
        ],
        '1000000000000000000000000000000000000000000000000000000000000000000000000000000089999999999999999999999999999999999999999999999999999999999999999999999999999999',
    ],
    [[2, 1], [3], '63'],
    [[2, 1], [4, 3], '804'],
    [[1, 2, 3], [4, 5, 6], '439902'],
    [[5, 4, 3, 2, 1], [2, 3], '040593'],
    [[1], [1], '1'],
    [
        [2, 1, 8, 9, 7, 8, 1, 4, 8, 9, 2, 4, 6, 1],
        [4, 2, 1, 4, 8, 7, 8, 3, 2],
        '8864071249270045813293',
    ],
    [
        [
            2, 3, 4, 3, 1, 6, 4, 8, 3, 2, 0, 9, 5, 1, 9, 1, 0, 1, 3, 2, 5, 6, 7,
            8, 2, 4, 6, 5, 0, 4, 1, 5, 3, 0, 5, 6, 1, 5, 9, 6,
        ],
        [
            1, 4, 3, 5, 1, 8, 5, 7, 1, 0, 1, 5, 8, 0, 9, 1, 4, 3, 5, 6, 0, 1, 6,
            5, 0, 6, 8, 1, 5, 6, 9, 1, 6, 5, 8, 1, 0, 1, 3, 0, 3,
        ],
        '213062007348971295724119411115979497433627535780869710086738948911320415218507012',
    ],
])('mul-two-numbers', (a: number[], b: number[], expected: string) => {
    it(`solve, a: ${a.join(',')}, b: ${b.join(',')}`, () => {
        const actual = toStrNumber(solve(ln(a), ln(b)));
        expect(actual).toBe(expected);
    });
});

describe.each([
    [1, 1],
    [2, 2],
    [5, 5],
    [6, undefined],
])('getNodeList', (index: number, expected: number | undefined) => {
    const node = makeListNode([0, 1, 2, 3, 4, 5]);
    it(`index: ${index}`, () => {
        let actual = getNodeList(node, index);
        expect(actual?.val).toBe(expected);
    });
});

describe.each([
    [3, 2, 1, 6, 0],
    [9, 9, 0, 8, 1],
])(
    'addPlace',
    (
        lsv: number,
        rsv: number,
        carry: number,
        expected1: number,
        expected2: number
    ) => {
        it(`lsv: ${lsv}, : ${rsv}, : ${carry}`, () => {
            let actual = addPlace(lsv, rsv, carry);
            expect(actual.val).toBe(expected1);
            expect(actual.nextCarry).toBe(expected2);
        });
    }
);

describe.each([
    [3, 5, 5, 0, 2],
    [3, 5, 1, 6, 1],
])(
    'mulPlace',
    (
        lsv: number,
        rsv: number,
        carry: number,
        expected1: number,
        expected2: number
    ) => {
        it(`lsv: ${lsv}, : ${rsv}, : ${carry}`, () => {
            let actual = mulPlace(lsv, rsv, carry);
            expect(actual.val).toBe(expected1);
            expect(actual.nextCarry).toBe(expected2);
        });
    }
);

describe.each([
    [10, 0],
    [11, 1],
    [2, 2],
])('getOnesPlace', (v: number, expected: number) => {
    it(`v: ${v}`, () => {
        expect(getOnesPlace(v)).toBe(expected);
    });
});

describe.each([
    [10, 1],
    [5, 0],
    [35, 3],
])('getTensPlace', (v: number, expected: number) => {
    it(`v: ${v}`, () => {
        expect(getTensPlace(v)).toBe(expected);
    });
});
