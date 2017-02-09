import sinon from 'sinon';
import TokenManager from 'calculator/lib/managers/TokenManager';
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

        expect(tokenManager.tokens).to.eql(['0']);
        expect(tokenManager.trigger.getCall(1).args[1]).to.equal('0');
        expect(tokenManager.trigger.getCall(1).args[2]).to.equal('0');
    });

});