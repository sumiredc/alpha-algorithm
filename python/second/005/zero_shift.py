from typing import List

def solve(nums: List[int]) -> None:
    # 事前に 0 の数を カウントしておく
    zeros = nums.count(0)
    last_index = len(nums) - 1

    # 後ろから走査
    for i in range(last_index, -1, -1):
        current = nums[i]

        # 0 の数を加算した index が配列内に存在すれば、検証中の値を移動
        if i + zeros <= last_index:
            nums[i + zeros] = current
        if current == 0:
            zeros -= 1
            if i + zeros <= last_index:
                nums[i + zeros] = 0
