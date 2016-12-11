import sinon from 'sinon';
import $ from 'jquery';
import MemoryPanel from 'calculator/lib/builder/MemoryPanel';
import Memory from 'calculator/lib/Memory';

describe('Memory Panel', () => {
    let underTest, memoryManager;

    function createView(value){
        return new Memory(value);
    }

    beforeEach(() => {
        memoryManager = {
            clear: sinon.stub(),
            change: sinon.stub(),
            getMemoryStack: sinon.stub().returns([createView(1),createView(2)])
        };

        underTest = new MemoryPanel(memoryManager);
    });

    describe('constructor', () => {

        it('should create the correct number of memory views', () => {
            expect(underTest.$el.find('.memory-state').length).to.equal(2);
        });

    });

    describe('on change', () => {

        it('should add another memory view', () => {
            memoryManager.getMemoryStack.returns([createView(1),createView(2),createView(3)]);

            let call = memoryManager.change.getCall(0);
            call.args[0].call(call.args[1]);

            expect(underTest.$el.find('.memory-state').length).to.equal(3);
        });

        it('should clear the view if the history manager was cleared', () => {
            memoryManager.getMemoryStack.returns([]);

            let call = memoryManager.change.getCall(0);
            call.args[0].call(call.args[1]);

            expect(underTest.$el.find('.memory-state').length).to.equal(0);
        });

    });

    describe('when trash is clicked', () => {
        it('should clear the history manager', () => {
            underTest.$el.find('.trash').click();
            expect(memoryManager.clear.called).to.equal(true);
        });
    });
});