from unittest import TestCase, main
from zero_shift import solve


class TestZeroShift(TestCase):

    def test1(self):
        nums = [1, 0, 2, 3, 0, 4, 5, 0]
        expected = [1, 0, 0, 2, 3, 0, 0, 4]
        solve(nums)
        self.assertEqual(nums, expected)

    
    def test2(self):
        nums = [1, 2, 3]
        expected = [1, 2, 3]
        solve(nums)
        self.assertEqual(nums, expected)


    def test3(self):
        nums = [0]
        expected = [0]
        solve(nums)
        self.assertEqual(nums, expected)


    def test4(self):
        nums = [1, 0, 0, 0, 0]
        expected = [1, 0, 0, 0, 0]
        solve(nums)
        self.assertEqual(nums, expected)


    def test5(self):
        nums = [0, 0, 0, 9, 1, 0, 0, 1, 0]
        expected = [0, 0, 0, 0, 0, 0, 9, 1, 0]
        solve(nums)
        self.assertEqual(nums, expected)


    def test6(self):
        nums = [1, 0, 3, 0, 5]
        expected = [1, 0, 0, 3, 0]
        solve(nums)
        self.assertEqual(nums, expected)


if __name__ == "__main__":
    main()
