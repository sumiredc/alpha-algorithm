/**
 * @see https://colab.research.google.com/drive/1BRjNPb2OkKj1EqVG-303OXn44dOBzm3m
 *
 * @time_complexity O(N²)
 * @space_complexity O(1)
 */
export const solve = (heights: number[]): number => {
    let bestCapacity = 0;
    for (let leftIdx = 0; leftIdx < heights.length - 1; leftIdx++) {
        const left = heights[leftIdx];
        for (
            let rightIdx = leftIdx + 1;
            rightIdx < heights.length;
            rightIdx++
        ) {
            const right = heights[rightIdx];
            const width = rightIdx - leftIdx;
            const height = left > right ? right : left;
            const capacity = width * height;
            if (bestCapacity < capacity) {
                bestCapacity = capacity;
            }
        }
    }
    return bestCapacity;
};

export const solve2 = (heights: number[]): number => {
    let bestScore = 0;
    let leftIndex = 0;
    let rightIndex = heights.length - 1;
    while (leftIndex <= rightIndex) {
        const height = Math.min(heights[leftIndex], heights[rightIndex]);
        const width = rightIndex - leftIndex;
        bestScore = Math.max(bestScore, height * width);
        if (heights[leftIndex] > heights[rightIndex]) {
            rightIndex--;
        } else {
            leftIndex++;
        }
    }
    return bestScore;
};
