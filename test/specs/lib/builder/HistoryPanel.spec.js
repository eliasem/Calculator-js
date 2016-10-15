import sinon from 'sinon';
import HistoryPanel from 'calculator/lib/builder/HistoryPanel';

describe('History Panel', () => {
    let underTest, sandbox, historyManager;

    beforeEach(() => {
        sandbox = sinon.sandbox.create();

        historyManager = {
            historyStates: [{tokens: []},{tokens: []}],
            on: sandbox.stub()
        };

        underTest = new HistoryPanel(historyManager);
    });

    afterEach(() => {
        historyManager.historyStates = [];
    });

    describe('constructor', () => {

        it('should create the correct number of history views', () => {
            expect(underTest.$el.find('.history-state').length).to.equal(2);
        });

    });

    describe('on change', () => {

        it('should add another history view', () => {
            historyManager.historyStates.push({tokens: []});

            let call = historyManager.on.getCall(0);
            call.args[1].call(call.args[2]);

            expect(underTest.$el.find('.history-state').length).to.equal(3);
        });

    });
});