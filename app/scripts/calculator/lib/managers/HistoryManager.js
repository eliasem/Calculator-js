import TokenManagerState from 'calculator/constant/TokenManagerStates';
import History from 'calculator/lib/model/History';
import EventApi from 'calculator/lib/event/EventApi';

export default class extends EventApi {
    constructor(tokenManager){
        super();
        this.historyStates = [];

        this.tokenManager = tokenManager;
        this.tokenManager.change(onChange, this);
    }
}

function onChange(tokens){
    if(this.tokenManager.state !== TokenManagerState.EVALUATED){ return; }
    this.historyStates.push(new History(tokens, this.tokenManager.answerStr));
    this.trigger('change');
}