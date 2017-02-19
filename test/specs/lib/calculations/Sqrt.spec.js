import sinon from 'sinon';
import TokenManager from 'calculator/lib/managers/TokenManager';
import TokenManagerEvents from 'calculator/constant/TokenManagerEvents';
import TokenManagerStates from 'calculator/constant/TokenManagerStates';
import sqrt from 'calculator/lib/calculations/Sqrt';

describe('Sqrt', () => {
    let tokenManager;

    beforeEach(() => {
        tokenManager = new TokenManager();

        sinon.stub(tokenManager, 'trigger');
    });

    it('should be invalid if input is negative', () => {
        tokenManager.push('-9', {replace: true});
        tokenManager.trigger.reset();

        sqrt(tokenManager);

        expect(tokenManager.tokens).to.eql([{type:'sqrt', tokens:['-9']}]);
        expect(tokenManager.trigger.getCall(1).args[0]).to.equal(TokenManagerEvents.CHANGE);
        expect(tokenManager.trigger.getCall(2).args[0]).to.equal(TokenManagerEvents.EVALUATION);
        expect(tokenManager.state).to.equal(TokenManagerStates.INVALID);
    });

});