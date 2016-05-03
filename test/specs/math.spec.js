import {evaluateTokens} from 'calculator/math';

describe('math', () => {

    describe('evaluateTokens', () => {

        it('should handle incomplete calculations', () => {
            expect(evaluateTokens(['5','0', '-', '2', '&times;'])).to.equal(48);
        });

        it('should handle complete calculations', () => {
            expect(evaluateTokens(['5','0'])).to.equal('50');
            expect(evaluateTokens(['5','0', '&times;', '2'])).to.equal(100);
        });

    });

});