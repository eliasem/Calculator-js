import sinon from 'sinon';

import TokenManager from 'calculator/lib/managers/TokenManager';
import TokenManagerState from 'calculator/constant/TokenManagerStates';
import TokenManagerEvent from 'calculator/constant/TokenManagerEvents';

describe('Token Manager', () => {
    let underTest;

    beforeEach(() => {
        underTest = new TokenManager();
    });

    describe('constructor', () => {
        it('should create the accessors', () => {
            expect(underTest.expressionStr).to.equal('');
            expect(underTest.answerStr).to.equal('0');
        });
    });

    describe('events', () => {
        it('should trigger the change callbacks', () => {
            let callbacks ={
                change: function(){ expect(this.value).to.equal(5); },
                evaulation: function(){ expect(this.value).to.equal(50); }
            };

            sinon.spy(callbacks, 'change');
            sinon.spy(callbacks, 'evaulation');

            let changeContext = {value:5};
            let evaulationContext = {value:50};

            underTest.change(callbacks.change, changeContext);
            underTest.evaluation(callbacks.evaulation, evaulationContext);

            underTest.trigger(TokenManagerEvent.CHANGE);

            expect(callbacks.change.called).to.equal(true);
            expect(callbacks.evaulation.called).to.equal(false);
        });

        it('should receive correct argument when evaluation is triggered', () => {
            let evaluationCallback = sinon.stub();

            underTest.evaluation(evaluationCallback);

            underTest.tokens = ['5','+','4'];

            underTest.trigger(TokenManagerEvent.EVALUATION);

            expect(evaluationCallback.getCall(0).args[0]).to.equal(0);
            expect(evaluationCallback.getCall(0).args[1]).to.equal(9);
        });

        it('should receive correct argument when change is triggered', () => {
            let changeCallback = sinon.stub();

            underTest.change(changeCallback);

            underTest.tokens = ['5','+','4'];

            underTest.trigger(TokenManagerEvent.CHANGE, 'arg');

            expect(changeCallback.getCall(0).args[0]).to.equal(0);
            expect(changeCallback.getCall(0).args[1]).to.equal('arg');
        });
    });

    describe('accessors', () => {

        describe('expressionStr and answerStr', () => {

            it('should hold correct values when ending with an operator', () => {
                underTest.push('10', {replace:true});
                underTest.push('+');
                underTest.push('40');
                underTest.push('&divide;');

                expect(underTest.expressionStr).to.equal('10 + 40 &divide; ');
                expect(underTest.answerStr).to.equal('');
            });

            it('should hold correct values when ending with a number', () => {
                underTest.push('10', {replace:true});
                underTest.push('+');
                underTest.push('40');

                expect(underTest.expressionStr).to.equal('10 + ');
                expect(underTest.answerStr).to.equal('40');
            });

            it('should be able to handle sqrt tokens when ending with an operator', () => {
                underTest.push({type:'sqrt', tokens:['25']}, {replace:true});
                underTest.push('+');
                expect(underTest.expressionStr).to.equal('&radic;(25) + ');
                expect(underTest.answerStr).to.equal('');
            });

            it('should be able to handle sqrt tokens when ending with a number', () => {
                underTest.push({type:'sqrt', tokens:['25']}, {replace:true});
                underTest.push('+');
                underTest.push('40');
                expect(underTest.expressionStr).to.equal('&radic;(25) + ');
                expect(underTest.answerStr).to.equal('40');
            });

            it('should be able to handle negate token', () => {
                underTest.push('27', {replace:true});
                underTest.push('+');
                underTest.push({type:'negate', tokens:['3']});

                expect(underTest.expressionStr).to.equal('27 + ');
                expect(underTest.answerStr).to.equal('-3');
            });
        });

    });

    describe('adding tokens', () => {

        beforeEach(() => {
            sinon.stub(underTest, 'trigger');
        });

        afterEach(() => {
            underTest.trigger.restore();
        });

        describe('push', () => {

            it('should change the state', () => {
                underTest.state = TokenManagerState.EVALUATED;

                underTest.push('1');

                expect(underTest.state).to.equal(TokenManagerState.NORMAL);
            });

            it('should trigger a change event when push is called', () => {
                underTest.push('1');

                expect(underTest.trigger.getCall(0).args[0]).to.equal(TokenManagerEvent.CHANGE);
            });

            it('should replace the last token when option is given', () => {
                underTest.push('1');
                underTest.push('2', {replace: true});

                expect(underTest.tokens).to.eql(['0', '2']);
            });

            it('should push token to tokens', () => {
                underTest.push('1');
                expect(underTest.tokens).to.eql(['0', '1']);
            });

        });

        describe('evaluate', () => {

            it('should change the state', () =>{
                underTest.state = TokenManagerState.NORMAL;

                underTest.evaluate();

                expect(underTest.state).to.equal(TokenManagerState.EVALUATED);
            });

            it('should trigger a change event when evaluate is called', () => {
                underTest.evaluate();

                expect(underTest.trigger.getCall(0).args[0]).to.equal(TokenManagerEvent.CHANGE);
            });

            it('should push evaluated value tokens', () => {
                underTest.push('5');
                underTest.push('+');
                underTest.push('7');

                underTest.evaluate();
                expect(underTest.tokens).to.eql([12]);
            });

            it('should track if evaluation has already occurred', () => {
                underTest.push('5');
                underTest.push('+');
                underTest.push('7');

                underTest.evaluate();
                expect(underTest.hasAlreadyEvaluated()).to.equal(false);
                underTest.evaluate();
                expect(underTest.hasAlreadyEvaluated()).to.equal(true);
            });
        });
    });

    describe('clearing', () => {
        it('should set the state to normal', () => {
            underTest.state = TokenManagerState.EVALUATED;
            underTest.push('10', {replace:true});

            underTest.clear();

            expect(underTest.state).to.equal(TokenManagerState.NORMAL);
        });

        it('clear the stack', () => {
            underTest.push('10', {replace:true});
            underTest.push('+');
            underTest.push('40');

            underTest.clear();

            expect(underTest.tokens).to.eql(['0']);
        });

        it('should just append 0', () => {
            underTest.push('10', {replace:true});
            underTest.push('+');

            underTest.clear(true);

            expect(underTest.tokens).to.eql(['10', '+', '0']);
        });

        it('should just clear the last number', () => {
            underTest.push('1', {replace:true});
            underTest.push('0');
            underTest.push('+');
            underTest.push('5');
            underTest.push('0');

            underTest.clear(true);

            expect(underTest.tokens).to.eql(['1', '0', '+', '0']);
        });

        it('should not keep appending 0', () => {
            underTest.push('1', {replace:true});
            underTest.push('0');
            underTest.push('+');
            underTest.push('5');
            underTest.push('0');

            underTest.clear(true);
            underTest.clear(true);

            expect(underTest.tokens).to.eql(['1', '0', '+', '0']);
        });
    });

    describe('isLastToken', () => {
        it('should return if tokens is empty', () => {
            underTest.tokens = [];
            expect(underTest.isLastToken(['+', '-'])).to.equal(false);
        });

        it('should return correct value when called', () => {
            underTest.push('1');
            underTest.push('-');

            expect(underTest.isLastToken(['+', '-'])).to.equal(true);
            expect(underTest.isLastToken(['1'])).to.equal(false);
        });
    });

    describe('applyHistory', () => {
        beforeEach(() => {
            sinon.stub(underTest, 'trigger');
        });

        afterEach(() => {
            underTest.trigger.restore();
        });

        it('should trigger a change when history is set', () => {
            underTest.state = TokenManagerState.EVALUATED;
            underTest.tokens = ['5','+','4'];
            underTest.applyHistory({tokens: ['20', '+', '6' ]});

            expect(underTest.state).to.equal(TokenManagerState.NORMAL);
            expect(underTest.trigger.getCall(0).args[0]).to.equal(TokenManagerEvent.CUSTOM);
        });
    });

    describe('memoryClicked', () => {
        it('should set the state to evaluated', () => {
            underTest.state = TokenManagerState.NORMAL;
            underTest.memoryClick();

            expect(underTest.state).to.equal(TokenManagerState.EVALUATED);
        });
    });

    describe('setToInvalid', () => {

        it('should set the state and trigger change event', () => {
            let changeCallback = sinon.stub();

            underTest.change(changeCallback);
            underTest.setToInvalid(2);

            expect(underTest.state).to.equal(TokenManagerState.INVALID);
            expect(changeCallback.getCall(0).args[0]).to.equal(2);
        });

    });
});