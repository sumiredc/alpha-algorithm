import { solve, dropChar } from './compare-string';

describe('dropChar', () => {
    it('dropChar', () => {
        expect(dropChar('ab##', 3)).toBe('ab#');
    });
});

describe.each([
    ['ab#c', 'ad#c', true],
    ['ab##', 'c#d#', true],
    ['a##c', '#a#c', true],
    ['a#c', 'b', false],
    ['y#fo##f', 'y#fx#o##f', true],
    ['abc#', 'bac#', false],
    ['bxj##tw', 'bxo#j##tw', true],
    ['aaa###a', 'aaaa###a', false],
    ['xywrrmp', 'xywrrmu#p', true],
    [
        '#####aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa########################################s#a#d#n#a#l#s#k#d#n#w#q#l#k#d#n#q#w#l#k#n#d#k#l#w#q#n#d#q#w#elqne#############l#n#2#q#e###########',
        '#####aaaaaaaaaaaaaaaaaaaaaaaaabaaaaaaaaaaaaaa########################################s#a#d#n#a#l#s#k#d#n#w#q#l#k#d#n#q#w#l#k#n#d#k#l#w#q#n#d#q#w#elqne#############l#n#2#q#e###########',
        true,
    ],
    ['coll#or', 'co#olor', true],
    ['sy##sm#ex', 's#ys#mex#', false],
    ['#################', '##########################################', true],
])('compare-string', (s: string, t: string, expected: boolean) => {
    it(`solve ${s} ${t}`, () => {
        const actual = solve(s, t);
        expect(actual).toBe(expected);
    });
});
