import Panel from './Panel';

export default class extends Panel{
    constructor(historyManager, options){
        super(options);

        this.historyManager = historyManager;
    }
}