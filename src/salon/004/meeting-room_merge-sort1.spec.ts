import {
    CurrentScope,
    mergeSort,
    sliceDesc,
    solve,
} from './meeting-room_merge-sort1';
import { testcase } from './testcase';

describe.each(testcase)('solve', (schedules: number[][], expected: number) => {
    it(`schedules: ${JSON.stringify(schedules)}`, () => {
        const actual = solve(schedules);
        expect(actual).toBe(expected);
    });
});

describe.each([
    [
        [
            [15, 20],
            [5, 10],
            [0, 30],
        ],
        [
            [0, 30],
            [5, 10],
            [15, 20],
        ],
    ],
    [
        [
            [7, 10],
            [2, 4],
        ],
        [
            [2, 4],
            [7, 10],
        ],
    ],
])('mergeSort', (schedules: number[][], expected: number[][]) => {
    it(`schedules: ${JSON.stringify(schedules)}`, () => {
        const actual = mergeSort(schedules);
        expect(JSON.stringify(actual)).toBe(JSON.stringify(expected));
    });
});

describe.each([
    [
        [
            [15, 20],
            [5, 10],
            [0, 30],
        ],
        0,
        1,
        [
            [5, 10],
            [15, 20],
        ],
    ],
    [
        [
            [284, 301],
            [305, 324],
            [324, 343],
            [464, 465],
        ],
        1,
        3,
        [
            [464, 465],
            [324, 343],
            [305, 324],
        ],
    ],
])(
    'sliceDesc',
    (
        schedules: number[][],
        start: number,
        end: number,
        expected: number[][]
    ) => {
        it(`schedule: ${JSON.stringify(
            schedules
        )}, start: ${start}, end: ${end}`, () => {
            const actual = sliceDesc(schedules, start, end);
            expect(JSON.stringify(actual)).toBe(JSON.stringify(expected));
        });
    }
);

describe.each([[1], [2], [13], [100], [120], [999]])(
    'CurrentScope properties check',
    (length: number) => {
        const scope = new CurrentScope(length);
        it(`length: ${length}`, () => {
            do {
                expect(scope.start <= scope.split).toBeTruthy();
                expect(scope.split <= scope.end).toBeTruthy();
                expect(scope.start <= scope.end).toBeTruthy();
                expect(scope.end <= length).toBeTruthy();
            } while (scope.next());
        });
    }
);
