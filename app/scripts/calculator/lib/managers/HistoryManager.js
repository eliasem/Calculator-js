import TokenManagerState from 'calculator/constant/TokenManagerStates';
import History from 'calculator/lib/model/History';
import EventApi from 'calculator/lib/event/EventApi';
import HistoryManagerEvents from 'calculator/constant/HistoryManagerEvents';
import PanelConstants from 'calculator/constant/Panel';

const previousTokens = Symbol('previousTokens');

export default class extends EventApi {
    constructor(tokenManager){
        super();
        this.historyStates = [];
        this[previousTokens] = null;

        this.tokenManager = tokenManager;
        this.tokenManager.change(onChange, this);
    }

    registerHistory(view, state, $parentView){
        view.$el.on('click', () => {
            this.tokenManager.applyHistory(state);
            $parentView.trigger(PanelConstants.CLOSE_EVENT);
        });
    }

    clear() {
        this.historyStates = [];
        this.trigger(HistoryManagerEvents.CHANGE);
    }
}

function onChange(tokens){
    if(this.tokenManager.state !== TokenManagerState.EVALUATED){ return; }
    if(this.tokenManager.hasAlreadyEvaluated()) { return; }

    this.historyStates.push(new History(tokens, this.tokenManager.answerStr));
    this[previousTokens] = tokens;
    this.trigger(HistoryManagerEvents.CHANGE);
}