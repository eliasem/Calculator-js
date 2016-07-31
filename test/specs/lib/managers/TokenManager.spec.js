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

            sinon.spy(callbacks, "change");
            sinon.spy(callbacks, "evaulation");

            let changeContext = {value:5};
            let evaulationContext = {value:50};

            underTest.change(callbacks.change, changeContext);
            underTest.evaluation(callbacks.evaulation, evaulationContext);

            underTest.trigger('change');

            expect(callbacks.change.called).to.equal(true);
            expect(callbacks.evaulation.called).to.equal(false);
        });

        it('should receive correct argument when evaluation is triggered', () => {
            let evaluationCallback = sinon.stub();

            underTest.evaluation(evaluationCallback);

            underTest.tokens = ['5','+','4'];

            underTest.trigger('evaluation');

            expect(evaluationCallback.getCall(0).args[0]).to.equal(9);
        });

        it('should receive correct argument when change is triggered', () => {
            let changeCallback = sinon.stub();

            underTest.change(changeCallback);

            underTest.tokens = ['5','+','4'];

            underTest.trigger('change', 'arg');

            expect(changeCallback.getCall(0).args[0]).to.equal('arg');
        });
    });

    describe("accessors", () => {

        describe('expressionStr and answerStr', () => {

            it('should hold correct values when ending with an operator', () => {
                underTest.push("10", {replace:true});
                underTest.push("+");
                underTest.push("40");
                underTest.push("&divide;");

                expect(underTest.expressionStr).to.equal("10 + 40 &divide; ");
                expect(underTest.answerStr).to.equal("");
            });

            it('should hold correct values when ending with a number', () => {
                underTest.push("10", {replace:true});
                underTest.push("+");
                underTest.push("40");

                expect(underTest.expressionStr).to.equal("10 + ");
                expect(underTest.answerStr).to.equal("40");
            });
        });

    });

    describe("adding tokens", function(){

        beforeEach(() => {
            sinon.stub(underTest, "trigger");
        });

        afterEach(() => {
            underTest.trigger.restore();
        });

        describe("push", () => {

            it('should change the state', () => {
                underTest.state = TokenManagerState.EVALUATED;

                underTest.push("1");

                expect(underTest.state).to.equal(TokenManagerState.NORMAL);
            });

            it('should trigger a change event when push is called', () => {
                underTest.push("1");

                expect(underTest.trigger.getCall(0).args[0]).to.equal(TokenManagerEvent.CHANGE);
            });

            it('should replace the last token when option is given', () => {
                underTest.push("1");
                underTest.push("2", {replace: true});

                expect(underTest.tokens).to.eql(["0", "2"]);
            });

            it('should push token to tokens', () => {
                underTest.push("1");
                expect(underTest.tokens).to.eql(["0", "1"]);
            });

        });

        describe("evaluate", () => {

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
                underTest.push("5");
                underTest.push("+");
                underTest.push("7");

                underTest.evaluate();
                expect(underTest.tokens).to.eql([12]);
            });
        });
    });

    describe("clearing", () => {
        it("clear the stack", () => {
            underTest.push("10", {replace:true});
            underTest.push("+");
            underTest.push("40");

            underTest.clear();

            expect(underTest.tokens).to.eql(["0"]);
        });

        it('should just append 0', () => {
            underTest.push("10", {replace:true});
            underTest.push("+");

            underTest.clear(true);

            expect(underTest.tokens).to.eql(["10", "+", "0"]);
        });

        it('should just clear the last number', () => {
            underTest.push("1", {replace:true});
            underTest.push("0");
            underTest.push("+");
            underTest.push("5");
            underTest.push("0");

            underTest.clear(true);

            expect(underTest.tokens).to.eql(["1", "0", "+", "0"]);
        });

        it('should not keep appending 0', () => {
            underTest.push("1", {replace:true});
            underTest.push("0");
            underTest.push("+");
            underTest.push("5");
            underTest.push("0");

            underTest.clear(true);
            underTest.clear(true);

            expect(underTest.tokens).to.eql(["1", "0", "+", "0"]);
        });
    });

    describe("backspace", () => {

        it("should add 0 if pressed atleast once", () => {
            underTest.push("9", {replace:true});
            underTest.backspace();

            expect(underTest.tokens).to.eql(["0"]);
        });

        it('should go up to the last operator', () => {
            underTest.push("9", {replace:true});
            underTest.push("+");
            underTest.push("1");
            underTest.backspace();

            expect(underTest.tokens).to.eql(["9", "+", "0"]);
        });

        it('should not go past last operator', () => {
            underTest.push("9", {replace:true});
            underTest.push("+");
            underTest.push("1");
            underTest.backspace();
            underTest.backspace();
            underTest.backspace();
            underTest.backspace();

            expect(underTest.tokens).to.eql(["9", "+", "0"]);
        });
    });

    describe("isLastToken", () => {
        it('should return if tokens is empty', () => {
            underTest.tokens = [];
            expect(underTest.isLastToken(["+", "-"])).to.equal(false);
        });

        it('should return correct value when called', () => {
            underTest.push("1");
            underTest.push("-");

            expect(underTest.isLastToken(["+", "-"])).to.equal(true);
            expect(underTest.isLastToken(["1"])).to.equal(false);
        });
    });
});