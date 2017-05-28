import sinon from 'sinon';
import TokenManager from 'calculator/lib/managers/TokenManager';
import negate from 'calculator/lib/calculations/Negate';

import 'calculator/mathjs/negate';

describe('Negate', () => {

    let tokenManager;

    beforeEach(() => {
        tokenManager = new TokenManager();
    });

    it('should negate the first and only number', () => {
        tokenManager.push('24', {replace: true});

        negate(tokenManager);

        expect(tokenManager.expressionStr).to.equal("");
        expect(tokenManager.answerStr).to.equal("-24");
    });

    it('should unnegate the first and only number', () => {
        tokenManager.push('24', {replace: true});

        negate(tokenManager);
        negate(tokenManager);

        expect(tokenManager.expressionStr).to.equal("");
        expect(tokenManager.answerStr).to.equal("24");
    });

    it('should not add - to 0 when its the first number', () => {
        tokenManager.push('0', {replace: true});

        negate(tokenManager);

        expect(tokenManager.answerStr).to.equal("0");
    });

    it('should not add - to 0', () => {
        tokenManager.push('24', {replace: true});
        tokenManager.push('+');
        tokenManager.push('0');

        negate(tokenManager);

        expect(tokenManager.expressionStr).to.equal("24 + ");
        expect(tokenManager.answerStr).to.equal("0");
    });

    it('should add - to the last number', () => {
        tokenManager.push('24', {replace: true});
        tokenManager.push('+');
        tokenManager.push('3');

        negate(tokenManager);

        expect(tokenManager.expressionStr).to.equal("24 + ");
        expect(tokenManager.answerStr).to.equal("-3");
    });

    it('should remove - to the last number', () => {
        tokenManager.push('24', {replace: true});
        tokenManager.push('+');
        tokenManager.push({type: 'negate', tokens: ['3']});

        negate(tokenManager);

        expect(tokenManager.expressionStr).to.equal("24 + ");
        expect(tokenManager.answerStr).to.equal("3");
    });

    it('should not touch tokenManager if negating the value of the equation', () => {
        tokenManager.push('24', {replace: true});
        tokenManager.push('+');

        negate(tokenManager);

        expect(tokenManager.expressionStr).to.equal("24 + ");
        expect(tokenManager.answerStr).to.equal("");
    });

});