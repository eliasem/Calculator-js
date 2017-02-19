import sinon from 'sinon';
import evaluate from 'calculator/lib/calculations/Evaluate';
import TokenManagerStates from 'calculator/constant/TokenManagerStates';

describe('Evaluate', () => {
    let tokenManager;

    beforeEach(() => {
        tokenManager = {
            clear: sinon.stub(),
            evaluate: sinon.stub(),
            state: TokenManagerStates.NORMAL
        };
    });

    it('should call evaluate', () => {
        evaluate(tokenManager);

        expect(tokenManager.evaluate.called).to.equal(true);
    });

    it('should go up to the last operator', () => {
        tokenManager.state = TokenManagerStates.INVALID;
        evaluate(tokenManager);

        expect(tokenManager.evaluate.called).to.equal(false);
        expect(tokenManager.clear.called).to.equal(true);
    });
});