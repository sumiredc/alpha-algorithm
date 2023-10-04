import { logging } from './logger';

describe('unit test', () => {
    it('logging', () => {
        expect(logging('test')).toBeTruthy();
    });
});
