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
            answerStr: '0',
            state: TokenManagerState.NORMAL,
            clear: sinon.stub()
        };
    });

    it('should not be able to type 00', () => {
        button.mathSymbol = '0';
        tokenManager.answerStr = '0';

        underTest = new AddNumberToken(tokenManager, button);

        expect(tokenManager.push.called).to.equal(false);
    });

    it('should replace if answerStr is 0', () => {
        button.mathSymbol = '2';

        underTest = new AddNumberToken(tokenManager, button);

        expect(tokenManager.push.getCall(0).args[1].replace).to.equal(true);
    });

    it('should replace if the token manager is in the evaluated state', () => {
        tokenManager.answerStr = '2';
        tokenManager.state = TokenManagerState.EVALUATED;

        underTest = new AddNumberToken(tokenManager, button);

        expect(tokenManager.push.getCall(0).args[1].replace).to.equal(true);
    });

    it('should not add more than one .', () => {
        tokenManager.answerStr = '1.0';
        button.mathSymbol = '.';

        underTest = new AddNumberToken(tokenManager, button);

        expect(tokenManager.push.called).to.equal(false);
    });

    it('should not remove 0 if the . is the first button pressed', () => {
        tokenManager.answerStr = '0';
        button.mathSymbol = '.';

        underTest = new AddNumberToken(tokenManager, button);

        expect(tokenManager.push.getCall(0).args[1].replace).to.equal(false);
    });

    it('should add 0 if . is the first button pressed after been evaluated', () => {
        tokenManager.answerStr = '9';
        button.mathSymbol = '.';
        tokenManager.state = TokenManagerState.EVALUATED;

        underTest = new AddNumberToken(tokenManager, button);

        expect(tokenManager.push.getCall(0).args[0]).to.equal('0');
        expect(tokenManager.push.getCall(1).args[0]).to.equal('.');
    });

    it('should clear when tokenManager is invalid', () => {
        tokenManager.state = TokenManagerState.INVALID;

        underTest = new AddNumberToken(tokenManager, button);

        expect(tokenManager.push.called).to.equal(false);
        expect(tokenManager.clear.called).to.equal(true);
    });

});