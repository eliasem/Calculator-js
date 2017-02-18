import sinon from 'sinon';
import backspace from 'calculator/lib/calculations/Backspace';
import TokenManagerStates from 'calculator/constant/TokenManagerStates';

describe('Backspace', () => {
    let tokenManager;

    beforeEach(() => {
        tokenManager = {
            tokens: [],
            trigger: sinon.stub(),
            state: TokenManagerStates.NORMAL
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

    it('should not trigger change if state is evaluated', () => {
        tokenManager.state = TokenManagerStates.EVALUATED;
        tokenManager.tokens.push('9');

        backspace(tokenManager);

        expect(tokenManager.trigger.called).to.equal(false);
    });
});