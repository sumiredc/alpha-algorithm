import {solve} from './brankets';

describe.each([
    ['()', true],
    ['()[]{}', true],
    ['(}]', false],
    [']', false],
    ['[[{()}](((({})){{(())}}]]', false],
    ['([)]', false],
    [
        '{({([[]{}(((())[]))]((){}))[[{}][[]][{}]()]})((([[][][{}][]]({}([]({{{}}}))))))}',
        true,
    ],
    ['({{[}]})', false],
])('power', (s: string, expected: boolean) => {
    it(`solve ${s}`, () => {
        const actual = solve(s);
        expect(actual).toBe(expected);
    });
});
