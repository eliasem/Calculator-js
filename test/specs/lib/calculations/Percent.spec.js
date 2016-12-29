import sinon from 'sinon';
import TokenManager from 'calculator/lib/managers/TokenManager';
import percent from 'calculator/lib/calculations/Percent';

describe('Percent', () => {
    let tokenManager;

    beforeEach(() => {
        tokenManager = new TokenManager();

        sinon.stub(tokenManager, 'trigger');
    });

    it('should be 0 if no arithmetic exists', () => {
        tokenManager.push('9', {replace: true});
        tokenManager.trigger.reset();

        percent(tokenManager);

        expect(tokenManager.tokens).to.eql(['0']);
        expect(tokenManager.trigger.getCall(1).args[1]).to.equal('0');
        expect(tokenManager.trigger.getCall(1).args[2]).to.equal('0');
    });

    it('should preform percent operation correctly', () => {
        tokenManager.push('10', {replace: true});
        tokenManager.push('+');
        tokenManager.push('1');
        tokenManager.trigger.reset();

        percent(tokenManager);

        expect(tokenManager.tokens).to.eql(['10', '+', '0.1']);
        expect(tokenManager.trigger.getCall(1).args[1]).to.equal('10 + 0.1');
        expect(tokenManager.trigger.getCall(1).args[2]).to.equal('0.1');
    });

    it('should preform percent operation correctly even when ending with an operation', () => {
        tokenManager.push('10', {replace: true});
        tokenManager.push('+');
        tokenManager.push('40');
        tokenManager.push('+');
        tokenManager.trigger.reset();

        percent(tokenManager);

        expect(tokenManager.tokens).to.eql(['10', '+', '40', '+', '25']);
        expect(tokenManager.trigger.getCall(1).args[1]).to.equal('10 + 40 + 25');
        expect(tokenManager.trigger.getCall(1).args[2]).to.equal('25');
    });

    it('should have the lowest precedence', () => {
        tokenManager.push('10', {replace: true});
        tokenManager.push('+');
        tokenManager.push('40');
        tokenManager.push('&divide;');
        tokenManager.push('2');
        tokenManager.trigger.reset();

        percent(tokenManager);

        expect(tokenManager.tokens).to.eql(['10', '+', '40', '&divide;', '1' ]);
        expect(tokenManager.trigger.getCall(1).args[1]).to.equal('10 + 40 &divide; 1');
        expect(tokenManager.trigger.getCall(1).args[2]).to.equal('1');
    });
});