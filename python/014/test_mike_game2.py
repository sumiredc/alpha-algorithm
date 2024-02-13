from unittest import TestCase
from mike_game2 import solve

class TestMikeGame2(TestCase):

    def test1(self):
      matrix = [
        [0, 2, 0, 2, 0, 2, 1, 0],
        [0, 0, 2, 0, 1, 2, 0, 0],
      ]
      expected = 3
      self.assertEqual(solve(matrix), expected)
      
    def test2(self):
      matrix = [
        [1, 2, 1, 1, 0, 0, 0, 2, 0, 0, 2, 2, 1, 0, 0, 2, 1, 2, 1, 2, 0],
        [0, 2, 2, 2, 1, 2, 1, 0, 2, 1, 2, 0, 2, 1, 0, 1, 2, 0, 2, 0, 0],
      ]
      expected = 13
      self.assertEqual(solve(matrix), expected)
    
    def test3(self):
      matrix = [
        [2, 0, 0, 2],
        [0, 0, 0, 0],
      ]
      expected = 0
      self.assertEqual(solve(matrix), expected)
    
    def test4(self):
      matrix = [
        [2, 2, 1, 2],
        [0, 1, 2, 0],
      ]
      expected = 2
      self.assertEqual(solve(matrix), expected)
      
    def test5(self):
      matrix = [
        [
            1, 1, 2, 0, 2, 0, 0, 1, 2, 2, 0, 0, 2, 0, 0, 0, 1, 1, 0, 1, 0,
            2, 1, 0, 0, 1, 0, 0, 1,
        ],
        [
            0, 0, 2, 0, 2, 2, 1, 0, 2, 0, 2, 1, 0, 2, 0, 1, 0, 0, 0, 0, 0,
            1, 2, 1, 2, 2, 1, 0, 2,
        ],
      ]
      expected = 12
      self.assertEqual(solve(matrix), expected)
