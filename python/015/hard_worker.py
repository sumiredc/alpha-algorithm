from typing import List

# See https://colab.research.google.com/drive/1jjLSye6v7nXfwhPYx4t1IfXy1_lQvcz0
# N = jobs.length
# time_complexity O(N * 3 * 3 + 3) = O(N)
# space_complexity O(3:prev_totals + 3:current_totals) = O(1)


def solve(jobs: List[List[int]]) -> int:
    prev_totals = [0, 0, 0]

    for job_row in jobs:
        current_totals = [0, 0, 0]

        for job_id, reward in enumerate(job_row):
            current_totals[job_id] = _get_max_reward(prev_totals, job_id) + reward

        prev_totals = current_totals

    return max(prev_totals)


def _get_max_reward(job_row: List[int], ignore_id: int) -> int:
    max_reward = -1
    for job_id, reward in enumerate(job_row):
        if job_id == ignore_id:
            continue
        max_reward = max(max_reward, reward)

    if max_reward == -1:
        raise ValueError("Reward情報が取得できませんでした")

    return max_reward
