import { ListNode } from '../../lib/listnode/listnode';

/**
 * @see https://colab.research.google.com/drive/15SWIztOXTJdY1_QLgl6s5GnQmFL1Y33G
 *
 * @time_complexity  O(N*M)
 * @space_complexity O(N+M)
 */
type SpaceCalResult = { val: number; nextCarryUp: number };

export const solve = (
    nodeA: ListNode | null,
    nodeB: ListNode | null
): ListNode => {
    const head: ListNode = new ListNode(-1);
    let tail: ListNode | null = head;
    let mulCarryUp = 0;
    let padPlace = 0;

    //     nodeA
    // x   nodeB
    // ---------
    // tail-head
    while (nodeB !== null || mulCarryUp > 0) {
        // 2行目の計算処理
        mulCarryUp = calSecondLine(nodeA, nodeB?.val ?? 0, tail, mulCarryUp);

        // 次のBを計算対象とする
        nodeB = nodeB?.next ?? null;
        tail = getNodeList(head.next!, padPlace);
        // tail-headを1桁ずらす
        padPlace++;
    }

    return head.next!;
};

// 2行目の乗算処理と結果の加算処理
export const calSecondLine = (
    nodeA: ListNode | null,
    valB: number,
    tail: ListNode | null,
    mulCarryUp: number
) => {
    let addCarryUp = 0;
    while (nodeA !== null || mulCarryUp > 0 || addCarryUp > 0) {
        const valA = nodeA?.val ?? 0;
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

        // 最終結果のnodeを作成し、tailを次の位へ移動
        const node = new ListNode(addResult.val);
        tail = updateTail(tail, node);

        // 次のAを計算対象とする
        nodeA = nodeA?.next ?? null;
    }
    return mulCarryUp;
};

// 現在のtail状況を判定して、次のループに渡すtailへ更新する
export const updateTail = (
    tail: ListNode | null,
    node: ListNode
): ListNode | null => {
    // 1回目以降
    if (tail === null) {
        tail = node;
    } else if (tail.next === null) {
        // 次の位が未計算ならnodeをそのまま採用
        tail.next = node;
    } else {
        // 次の位がすでに計算済みであれば、valのみ書き換え
        tail.next.val = node.val;
    }
    // 1つ進める
    tail = tail.next;

    return tail;
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
