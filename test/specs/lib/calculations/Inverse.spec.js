import sinon from 'sinon';
import TokenManager from 'calculator/lib/managers/TokenManager';
import TokenManagerEvents from 'calculator/constant/TokenManagerEvents';
import TokenManagerStates from 'calculator/constant/TokenManagerStates';
import inverse from 'calculator/lib/calculations/Inverse';

describe('Inverse', () => {
    let tokenManager;

    beforeEach(() => {
        tokenManager = new TokenManager();

        sinon.stub(tokenManager, 'trigger');
    });

    it('should create token correctly', () => {
        tokenManager.push('-2', {replace: true});
        tokenManager.trigger.reset();

        inverse(tokenManager);

        expect(tokenManager.tokens).to.eql([{type:'inverse', tokens:['-2']}]);
        expect(tokenManager.trigger.getCall(1).args[0]).to.equal(TokenManagerEvents.EVALUATION);
    });

    it('should make tokenManager become invalid if 0', () => {
        tokenManager.push('0', {replace: true});
        tokenManager.trigger.reset();

        inverse(tokenManager);

        expect(tokenManager.tokens).to.eql([{type:'inverse', tokens:['0']}]);
        expect(tokenManager.state).to.equal(TokenManagerStates.INVALID);
    });

});