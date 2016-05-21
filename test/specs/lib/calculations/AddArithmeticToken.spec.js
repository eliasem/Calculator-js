import sinon from 'sinon';
import AddArithmeticToken from 'calculator/lib/calculations/AddArithmeticToken';
import TokenManagerEvent from 'calculator/constant/TokenManagerEvents';

describe('Add Arithmetic Token', () => {

    let underTest, tokenManager, button;

    beforeEach(() => {
        button = {};

        tokenManager = {
            push: sinon.stub(),
            trigger: sinon.stub(),
            isLastToken: sinon.stub()
        };
    });

    it('should trigger evaluation event', () => {
        underTest = new AddArithmeticToken(tokenManager, button);

        expect(tokenManager.trigger.getCall(0).args[0]).to.equal(TokenManagerEvent.EVALUATION);
    });

    it('should not replace the pushing to the token manager', () => {
        tokenManager.isLastToken.returns(false);

        underTest = new AddArithmeticToken(tokenManager, button);

        expect(tokenManager.push.getCall(0).args[1].replace).to.equal(false);
    });

    it('should replace the pushing to the token manager', () => {
        tokenManager.isLastToken.returns(true);

        underTest = new AddArithmeticToken(tokenManager, button);

        expect(tokenManager.push.getCall(0).args[1].replace).to.equal(true);
    });

});