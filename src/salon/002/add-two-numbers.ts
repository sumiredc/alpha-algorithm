import { ListNode } from '../../lib/listnode/listnode';

/**
 * @see https://colab.research.google.com/drive/1ObjTW6JMj3GFhvATbxm5Vyha58KhVrLJ
 *
 * @time_complexity  O(N)
 * @space_complexity O(N)
 */
export const solve = (
    nodeA: ListNode | null,
    nodeB: ListNode | null
): ListNode | null => {
    // 初回計算
    const addPlaceResult = addPlace(nodeA!.val, nodeB!.val, 0);
    let head: ListNode | null = new ListNode(addPlaceResult.val);
    let tail: ListNode | null = head;
    let roundUp = addPlaceResult.nextRoundUp;

    // 次の位へ移動
    nodeA = nodeA?.next ?? null;
    nodeB = nodeB?.next ?? null;

    while (nodeA !== null || nodeB !== null || roundUp > 0) {
        const a = nodeA?.val ?? 0;
        const b = nodeB?.val ?? 0;

        // 現在の位 と 繰り上げする値を算出
        const { val, nextRoundUp } = addPlace(a, b, roundUp);
        roundUp = nextRoundUp;
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
    roundUp: number
): { val: number; nextRoundUp: number } => {
    const sum = lsv + rsv + roundUp;
    const val = getOnesPlace(sum);
    return { val, nextRoundUp: getTensPlace(sum) };
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
