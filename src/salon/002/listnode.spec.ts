import { ListNode, makeListNode, toStrNumber } from './listnode';

describe.each([
    [[5, 3, 3], '533'],
    [[1, 2, 3], '123'],
])('makeListNodes and toString', (nums: number[], expected: string) => {
    it('check', () => {
        let head: ListNode | null = makeListNode(nums);
        const actual = toStrNumber(head);
        expect(actual).toBe(expected);
    });
});
