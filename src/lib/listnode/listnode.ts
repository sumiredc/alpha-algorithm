export class ListNode {
    constructor(
        public val: number = 0,
        public next: ListNode | null = null
    ) {}
}

export const makeListNode = (nums: number[]) => {
    const head = new ListNode(nums[0]);
    let tail = head;
    for (let i = 1; i < nums.length; i++) {
        tail.next = new ListNode(nums[i]);
        tail = tail.next;
    }
    return head;
};

export const toStrNumber = (head: ListNode | null) => {
    let s = '';
    while (head !== null) {
        s += String(head.val);
        head = head.next;
    }
    return s;
};
