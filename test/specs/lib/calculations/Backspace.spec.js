import sinon from 'sinon';
import backspace from 'calculator/lib/calculations/Backspace';

describe('Backspace', () => {
    let tokenManager;

    beforeEach(() => {
        tokenManager = {
            tokens: [],
            trigger: sinon.stub()
        };
    });

    it('should add 0 if pressed at least once', () => {
        tokenManager.tokens.push('9');

        backspace(tokenManager);

        expect(tokenManager.tokens).to.eql(['0']);
    });

    it('should go up to the last operator', () => {
        tokenManager.tokens.push('9');
        tokenManager.tokens.push('+');
        tokenManager.tokens.push('9');
        backspace(tokenManager);

        expect(tokenManager.tokens).to.eql(['9', '+', '0']);
    });

    it('should not go past last operator', () => {
        tokenManager.tokens.push('9');
        tokenManager.tokens.push('+');
        tokenManager.tokens.push('9');
        backspace(tokenManager);
        backspace(tokenManager);
        backspace(tokenManager);
        backspace(tokenManager);

        expect(tokenManager.tokens).to.eql(['9', '+', '0']);
    });
});