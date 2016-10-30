import {toString, evaluateTokens} from 'calculator/token';

describe('token util', () => {

    describe('toString', () => {
        it('should pretty print the tokens', () => {
            expect(toString(['5','0', '-', '2'])).to.equal('50 - 2');
        });

        it('should pretty print the tokens and skip end operator if exists', () => {
            expect(toString(['5','0', '-', '2', '&times;'], {skipEndOperator:true})).to.equal('50 - 2');
            expect(toString(['5','0', '-', '2'], {skipEndOperator:true})).to.equal('50 - 2');
        });
    });

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