import Panel from './Panel';
import template from 'text!templates/history.tpl';

import History from 'calculator/lib/History';

const $scroll = Symbol("$scroll");

export default class extends Panel{
    constructor(historyManager, options){
        super(options);

        this.historyManager = historyManager;
        this.historyManager.on('change', addHistory, this);

        this.$innerPanel.append(template);
        this[$scroll] = this.$innerPanel.find('.scroll');

        buildHistory.call(this);
    }
}

function buildHistory() {

    this.historyManager.historyStates.forEach((state) => {
        addHistory.call(this, state);
    });
}

function addHistory(){
    let state = this.historyManager.historyStates[this.historyManager.historyStates.length-1];
    let historyView = new History(state);

    this[$scroll].prepend(historyView.$el);
}