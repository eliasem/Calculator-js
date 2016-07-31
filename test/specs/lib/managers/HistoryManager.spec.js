import $ from 'jquery';
import sinon from 'sinon';

import HistoryManager from 'calculator/lib/managers/HistoryManager';
import TokenManager from 'calculator/lib/managers/TokenManager';

describe('History Manager', () => {

    let sandbox, underTest, tokenManager;

    beforeEach(() =>{
        sandbox = sinon.sandbox.create();

        tokenManager = new TokenManager();
        underTest = new HistoryManager(tokenManager);
    });

    afterEach(() => {
        sandbox.restore();
    });

    describe('saving state', () => {

        it('should save when the token manager is in the evaluated state', () => {
            tokenManager.push("9", {replace:true});
            tokenManager.push("+");
            tokenManager.push("1");

            tokenManager.evaluate();

            expect(underTest.historyStates[0].tokens.length).to.equal(3);
            expect(underTest.historyStates[0].answer).to.equal("10");
        });
    });
});
