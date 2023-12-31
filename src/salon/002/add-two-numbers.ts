import { ListNode } from '../../lib/listnode/listnode';

/**
 * @see https://colab.research.google.com/drive/1ObjTW6JMj3GFhvATbxm5Vyha58KhVrLJ
 *
 * @time_complexity  O(max(M,N))
 * @space_complexity O(max(M,N))
 */
export const solve = (
    nodeA: ListNode | null,
    nodeB: ListNode | null
): ListNode | null => {
    // 初回計算
    const addPlaceResult = addPlace(nodeA!.val, nodeB!.val, 0);
    const head: ListNode | null = new ListNode(addPlaceResult.val);
    let tail: ListNode | null = head;
    let carryUp = addPlaceResult.nextCarryUp;

    // 次の位へ移動
    nodeA = nodeA?.next ?? null;
    nodeB = nodeB?.next ?? null;

    while (nodeA !== null || nodeB !== null || carryUp > 0) {
        const a = nodeA?.val ?? 0;
        const b = nodeB?.val ?? 0;

        // 現在の位 と 繰り上げする値を算出
        const { val, nextCarryUp } = addPlace(a, b, carryUp);
        carryUp = nextCarryUp;
        const node = new ListNode(val);

        // 2回目以降
        tail.next = node;
        tail = tail.next;
        nodeA = nodeA?.next ?? null;
        nodeB = nodeB?.next ?? null;
    }
    return head;
};

// 〇〇の位 の加算処理
export const addPlace = (
    lsv: number,
    rsv: number,
    carryUp: number
): { val: number; nextCarryUp: number } => {
    const sum = lsv + rsv + carryUp;
    const val = getOnesPlace(sum);
    return { val, nextCarryUp: getTensPlace(sum) };
};

// 1の位の取得
export const getOnesPlace = (v: number) => {
    return v % 10;
};

// 10の位の取得
export const getTensPlace = (v: number) => {
    if (v < 10) {
        return 0;
    }
    return (v - (v % 10)) / 10;
};
