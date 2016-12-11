import sinon from 'sinon';
import MemoryManager from 'calculator/lib/managers/MemoryManager';
import MemoryManagerEvent from 'calculator/constant/MemoryManagerEvents';


describe('Memory Manager', () => {
    let underTest, tokenManager;

    beforeEach(() => {
        tokenManager = {
            answerStr:'10'
        };

        underTest = new MemoryManager(tokenManager);
    });

    describe('triggering event', ()=> {

        it('should call the function with the passed in arguments', () => {
            let stub = sinon.stub();
            underTest.change(stub);

            underTest.trigger(MemoryManagerEvent.CHANGE, 'arg');
            expect(stub.getCall(0).args).to.deep.equal(['arg']);
        });

    });

    describe('save', () => {

        beforeEach(() => {
            sinon.stub(underTest, 'trigger');
        });

        it('should save the value', () => {
            underTest.save('9');
            underTest.save('11');

            expect(underTest.getMemoryStack().length).to.equal(2);
        });

        it('should trigger a change event', () => {
            underTest.save('9');

            expect(underTest.trigger.getCall(0).args[0]).to.equal(MemoryManagerEvent.CHANGE);
        });

    });

    describe('getLast', () => {
        beforeEach(() => {
            underTest.save('9');
            underTest.save('11');
        });

        it('should return the last state', () => {
            expect(underTest.getLast().value).to.equal(11);
        });
    });

    describe('clear', () => {
        beforeEach(() => {
            sinon.stub(underTest, 'trigger');
        });

        it('should clear the stack', () => {
            underTest.save('9');
            underTest.save('11');

            underTest.clear();

            expect(underTest.getMemoryStack().length).to.equal(0);
        });

        it('should trigger a change event', () => {
            underTest.clear();

            expect(underTest.trigger.getCall(0).args[0]).to.equal(MemoryManagerEvent.CHANGE);
        });
    });

    describe('restore',() => {

        it('should return the last value', () => {
            underTest.save('9');
            underTest.save('11');
            underTest.save('3');

            expect(underTest.restore()).to.equal(3);
        });

        it('should return null if stack is empty', () => {
            expect(underTest.restore()).to.equal(null);
        });

    });

    describe('plus', () => {

        beforeEach(() => {
            sinon.stub(underTest, 'trigger');
        });

        it('should add the value to the last memory value', () => {
            underTest.save('8');
            underTest.plus(null, '3');

            expect(underTest.getMemoryStack().map(v => v.value)).to.deep.equal([11]);
        });

        it('should push value if memory stack is empty', () => {
            underTest.plus(null, '15');

            expect(underTest.getMemoryStack().map(v => v.value)).to.deep.equal([15]);
        });

        it('should use the tokenManager answerStr if no value is passed', () => {
            underTest.save('8');
            underTest.plus(null);

            expect(underTest.getMemoryStack().map(v => v.value)).to.deep.equal([18]);
        });
    });

    describe('minus', () => {

        beforeEach(() => {
            sinon.stub(underTest, 'trigger');
        });

        it('should minus the value to the last memory value', () => {
            underTest.save('1');
            underTest.minus(null, '3');

            expect(underTest.getMemoryStack().map(v => v.value)).to.deep.equal([-2]);
        });

        it('should push value if memory stack is empty', () => {
            underTest.minus(null, '15');

            expect(underTest.getMemoryStack().map(v => v.value)).to.deep.equal([-15]);
        });

        it('should use the tokenManager answerStr if no value is passed', () => {
            underTest.save('8');
            underTest.minus(null);

            expect(underTest.getMemoryStack().map(v => v.value)).to.deep.equal([-2]);
        });
    });

});