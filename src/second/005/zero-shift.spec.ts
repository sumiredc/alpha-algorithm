import { testcase } from './testcase';
import { solve } from './zero-shift';

describe.each(testcase())(
    'zero-shift',
    (nums: number[], expected: number[]) => {
        it(`solve ${nums.join(',')}`, () => {
            solve(nums);
            expect(nums.join(',')).toBe(expected.join(','));
        });
    }
);
