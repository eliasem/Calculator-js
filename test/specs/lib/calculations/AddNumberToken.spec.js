import sinon from 'sinon';
import AddNumberToken from 'calculator/lib/calculations/AddNumberToken';
import TokenManagerState from 'calculator/constant/TokenManagerStates';

describe('Add Number Token', () => {

    let underTest, tokenManager, button;

    beforeEach(() => {
        button = {
            mathSymbol: '0'
        };

        tokenManager = {
            push: sinon.stub(),
            answerStr: "0",
            state: TokenManagerState.NORMAL
        };
    });

    it('should not be able to type 00', () => {
        button.mathSymbol = "0";
        tokenManager.answerStr = "0";

        underTest = new AddNumberToken(tokenManager, button);

        expect(tokenManager.push.called).to.equal(false);
    });

    it('should replace if answerStr is 0', () => {
        button.mathSymbol = "2";

        underTest = new AddNumberToken(tokenManager, button);

        expect(tokenManager.push.getCall(0).args[1].replace).to.equal(true);
    });

    it('should replace if the token manager is in the evaluated state', () => {
        tokenManager.answerStr = "2";
        tokenManager.state = TokenManagerState.EVALUATED;

        underTest = new AddNumberToken(tokenManager, button);

        expect(tokenManager.push.getCall(0).args[1].replace).to.equal(true);
    });

});