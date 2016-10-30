import sinon from 'sinon';
import HistoryPanel from 'calculator/lib/builder/HistoryPanel';

describe('History Panel', () => {
    let underTest, sandbox, historyManager;

    beforeEach(() => {
        sandbox = sinon.sandbox.create();

        historyManager = {
            historyStates: [{tokens: []},{tokens: []}],
            on: sandbox.stub(),
            registerHistory: sinon.stub(),
            clear: sandbox.stub()
        };

        underTest = new HistoryPanel(historyManager);
    });

    afterEach(() => {
        historyManager.historyStates = [];
    });

    describe('constructor', () => {

        it('should create the correct number of history views', () => {
            expect(underTest.$el.find('.history-state').length).to.equal(2);
            expect(historyManager.registerHistory.callCount).to.equal(2);
        });

    });

    describe('on change', () => {

        it('should add another history view', () => {
            historyManager.historyStates.push({tokens: []});

            let call = historyManager.on.getCall(0);
            call.args[1].call(call.args[2]);

            expect(underTest.$el.find('.history-state').length).to.equal(3);
            expect(historyManager.registerHistory.callCount).to.equal(3);
        });

        it('should clear the view if the history manager was cleared', () => {
            historyManager.historyStates = [];

            let call = historyManager.on.getCall(0);
            call.args[1].call(call.args[2]);

            expect(underTest.$el.find('.history-state').length).to.equal(0);
        });

    });

    describe('when trash is clicked', () => {
        it('should clear the history manager', () => {
            underTest.$el.find('.trash').click();
            expect(historyManager.clear.called).to.equal(true);
        });
    });
});