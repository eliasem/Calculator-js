import sinon from 'sinon';
import TokenManager from 'calculator/lib/managers/TokenManager';
import TokenManagerEvents from 'calculator/constant/TokenManagerEvents';
import TokenManagerStates from 'calculator/constant/TokenManagerStates';
import square from 'calculator/lib/calculations/Square';

describe('Square', () => {
    let tokenManager;

    beforeEach(() => {
        tokenManager = new TokenManager();

        sinon.stub(tokenManager, 'trigger');
    });

    it('should be able to square a number', () => {
        tokenManager.push('-5', {replace: true});
        tokenManager.trigger.reset();

        square(tokenManager);

        expect(tokenManager.tokens).to.eql([{type:'square', tokens:['-5']}]);
        expect(tokenManager.trigger.getCall(1).args[0]).to.equal(TokenManagerEvents.EVALUATION);
    });

});