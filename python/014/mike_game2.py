from typing import List
from enum import Enum

# See https://colab.research.google.com/drive/1uGpLF4b4SWoOSI83F7Hjjk7ieXSmNKbM
# N = 幅
# time_complexity: O(N)
# space_complexity: O(1)

class Status(Enum):
    NONE = 0
    GHOST = 1
    COIN = 2

def solve(matrix: List[List[int]]) -> int:
    sky = matrix[0]
    ground = matrix[1]
    coin = 0

    # ゴール手前までを検証
    nextIdx = 1
    while nextIdx < len(ground) - 1:
        if sky[nextIdx] == Status.GHOST.value and ground[nextIdx] == Status.GHOST.value:
            raise ValueError("これ以上進めません")

        # 次のマスへ進む
        if _shouldMoveToNext(sky, ground, nextIdx):
            coin += _getCoinCount(ground[nextIdx])
            nextIdx += 1
            continue

        # ジャンプ（2マス進む）
        coin += _getCoinCount(sky[nextIdx]) + _getCoinCount(ground[nextIdx + 1])
        nextIdx += 2

    # ゴール地点のコインを回収
    goal = len(ground) - 1
    coin += _getCoinCount(ground[goal])

    return coin

# 次のマスに進むべきかどうか を判定
def _shouldMoveToNext(sky: List[int], ground: List[int], nextIdx: int) -> bool:
    if ground[nextIdx] == Status.GHOST.value:
        return False

    return sky[nextIdx] == Status.GHOST.value or \
            ground[nextIdx + 1] == Status.GHOST.value or \
            ground[nextIdx] == Status.COIN.value or \
            sky[nextIdx] != Status.COIN.value

# 指定位置で得られるコインの枚数を算出
def _getCoinCount(position: int) -> int:
    return 1 if position == Status.COIN.value else 0
