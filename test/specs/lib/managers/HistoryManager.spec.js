import $ from 'jquery';
import sinon from 'sinon';

import HistoryManager from 'calculator/lib/managers/HistoryManager';
import TokenManager from 'calculator/lib/managers/TokenManager';
import HistoryManagerEvents from 'calculator/constant/HistoryManagerEvents';

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
            tokenManager.push('9', {replace:true});
            tokenManager.push('+');
            tokenManager.push('1');

            tokenManager.evaluate();

            expect(underTest.historyStates[0].tokens.length).to.equal(3);
            expect(underTest.historyStates[0].answer).to.equal('10');
        });

        it('should not save when equal is pressed multiple times', () => {
            tokenManager.push('9', {replace:true});
            tokenManager.push('+');
            tokenManager.push('1');

            tokenManager.evaluate();
            tokenManager.evaluate();
            tokenManager.evaluate();

            expect(underTest.historyStates.length).to.equal(1);
        });
    });

    describe('register history', () => {
        let view, state, $parentView;

        beforeEach(() => {
            view = {
                $el : $('<div></div>')
            };

            state = {
                tokens: ['40', '+', '2'],
                answer: '42'
            };

            $parentView = $('<div></div>');

            sandbox.stub(tokenManager, 'applyHistory');
        });

        it('should apply the history when clicked', () => {
            underTest.registerHistory(view, state, $parentView);
            view.$el.click();

            expect(tokenManager.applyHistory.called).to.equal(true);
        });
    });


    describe('clear', () => {

        it('should empty the states and trigger a change when clear is called', () => {
            sandbox.stub(underTest, 'trigger');

            underTest.historyStates.push({});
            underTest.historyStates.push({});

            underTest.clear();

            expect(underTest.historyStates.length).to.equal(0);
            expect(underTest.trigger.getCall(0).args[0]).to.equal(HistoryManagerEvents.CHANGE);
        });

    });
});
