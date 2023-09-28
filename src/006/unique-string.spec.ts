import { solve } from './unique-string';

describe.each([
    ['aaabbccc', 2],
    ['aab', 0],
    ['aaaaaabbbbbbbbccccccccdddddddeeeeeeffffffg', 8],
    ['abababababababababababababababaabababababaababababaabaabaabababccccc', 0],
    [
        'abcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyz',
        259,
    ],
    [
        'dasadjwlqdoqwfewfharphfgrewrhowhhfhsdfohfoihoasfdsadhkdfkjlbavjblvxnbknogwrelgjfheowafphpwohoidfhodhfo',
        31,
    ],
    [
        'axaxaxaxaxaxaxaaxaxaxaxaaxaxxxxxaaaaaaxxaaxaaaxxaaxxaaaaxaxxwhwqhhwqhqqww',
        1,
    ],
    [
        'abcdefghijklkmnopqstuvwxyzwqlcalkwelnaaaaannnnnccccccdiiiieieqqqpppdllqlfqlflqwkfnnroorqooqozkkaappprprttotxzzznnqabcdefghijklkmnopqstuvwxyzwqlcalkwelnaaaaannnnnccccccdiiiieieqqqpppdllqlfqlflqwkfnnroorqooqozkkaappprprttotxzzznnqabcdefghijklkmnopqstuvwxyzwqlcalkwelnaaaaannnnnccccccdiiiieieqqqpppdllqlfqlflqwkfnnroorqooqozkkaappprprttotxzzznnqabcdefghijklkmnopqstuvwxyzwqlcalkwelnaaaaannnnnccccccdiiiieieqqqpppdllqlfqlflqwkfnnroorqooqozkkaappprprttotxzzznnqabcdefghijklkmnopqstuvwxyzwqlcalkwelnaaaaannnnnccccccdiiiieieqqqpppdllqlfqlflqwkfnnroorqooqozkkaappprprttotxzzznnqabcdefghijklkmnopqstuvwxyzwqlcalkwelnaaaaannnnnccccccdiiiieieqqqpppdllqlfqlflqwkfnnroorqooqozkkaappprprttotxzzznnqabcdefghijklkmnopqstuvwxyzwqlcalkwelnaaaaannnnnccccccdiiiieieqqqpppdllqlfqlflqwkfnnroorqooqozkkaappprprttotxzzznnqabcdefghijklkmnopqstuvwxyzwqlcalkwelnaaaaannnnnccccccdiiiieieqqqpppdllqlfqlflqwkfnnroorqooqozkkaappprprttotxzzznnq',
        50,
    ],
    ['z', 0],
])('unique string', (s: string, expected: number) => {
    it(`solve ${s}`, () => {
        const actual = solve(s);
        expect(actual).toBe(expected);
    });
});
