import { ListNode } from '../../lib/listnode/listnode';

/**
 * @see https://colab.research.google.com/drive/15SWIztOXTJdY1_QLgl6s5GnQmFL1Y33G
 *
 * @time_complexity  O(nodeA^nodeB)
 * @space_complexity O(N)
 */
type SpaceCalResult = { val: number; nextCarryUp: number };

export const solve = (
    nodeA: ListNode | null,
    nodeB: ListNode | null
): ListNode => {
    let head: ListNode | null = null;
    let tail: ListNode | null = null;
    let mulCarryUp = 0;
    let padPlace = 0;

    //     nodeA
    // x   nodeB
    // ---------
    // tail-head
    while (nodeB !== null || mulCarryUp > 0) {
        const valB = nodeB?.val ?? 0;
        // 2回使用するため、紛失しないよう複製
        let nodeA2 = nodeA;
        let addCarryUp = 0;

        while (nodeA2 !== null || mulCarryUp > 0 || addCarryUp > 0) {
            const valA = nodeA2?.val ?? 0;
            // 途中結果の乗算処理
            const mulResult = mulPlace(valA, valB, mulCarryUp);
            // 繰り上げが発生したら次へ回す
            mulCarryUp = mulResult.nextCarryUp;

            // 最終結果の加算処理
            const addResult = addPlace(
                mulResult.val,
                tail?.next?.val ?? 0,
                addCarryUp
            );
            // 繰り上げが発生したら次へ回す
            addCarryUp = addResult.nextCarryUp;

            const node = new ListNode(addResult.val);

            if (tail === null) {
                // 初回
                head = tail = node;
            } else {
                // 1回目以降
                if (tail.next === null) {
                    // 次の位が未計算ならnodeをそのまま採用
                    tail.next = node;
                } else {
                    // 次の位がすでに計算済みであれば、valのみ書き換え
                    tail.next.val = node.val;
                }
                // 1つ進める
                tail = tail.next;
            }

            nodeA2 = nodeA2?.next ?? null;
        }
        nodeB = nodeB?.next ?? null;
        tail = getNodeList(head!, padPlace);
        // tail-headを1桁ずらす
        padPlace++;
    }

    return head!;
};

// 指定位置のNodeを取得
export const getNodeList = (head: ListNode, index: number): ListNode | null => {
    let tail: ListNode | null = head;
    for (let i = 0; i < index; i++) {
        if (tail === null) {
            break;
        }
        tail = tail.next;
    }
    return tail;
};

// 〇〇の位 の加算処理
export const addPlace = (
    lsv: number,
    rsv: number,
    carryUp: number
): SpaceCalResult => {
    const sum = lsv + rsv + carryUp;
    const val = getOnesPlace(sum);
    return { val, nextCarryUp: getTensPlace(sum) };
};

// 〇〇の位 の乗算処理
export const mulPlace = (
    lsv: number,
    rsv: number,
    carryUp: number
): SpaceCalResult => {
    const pro = lsv * rsv + carryUp;
    const val = getOnesPlace(pro);
    return { val, nextCarryUp: getTensPlace(pro) };
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
