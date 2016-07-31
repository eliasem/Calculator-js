import TokenManagerState from 'calculator/constant/TokenManagerStates';
import History from 'calculator/lib/model/History';

export default class{
    constructor(tokenManager){
        this.historyStates = [];

        this.tokenManager = tokenManager;
        this.tokenManager.change(onChange, this);
    }
}

function onChange(tokens){
    if(this.tokenManager.state !== TokenManagerState.EVALUATED){ return; }
    this.historyStates.push(new History(tokens, this.tokenManager.answerStr));
}