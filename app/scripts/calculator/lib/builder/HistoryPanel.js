import Panel from './Panel';
import template from 'text!templates/history.tpl';
import HistoryManagerEvents from 'calculator/constant/HistoryManagerEvents';
import History from 'calculator/lib/History';

const $scroll = Symbol('$scroll');
const $trash = Symbol('$trash');

export default class extends Panel{
    constructor(historyManager, options){
        super(options);

        this.historyManager = historyManager;
        this.historyManager.on(HistoryManagerEvents.CHANGE, updateHistory, this);

        this.$innerPanel.append(template);
        this[$scroll] = this.$innerPanel.find('.scroll');
        this[$trash] = this.$innerPanel.find('.trash');

        this[$trash].on('click', this.historyManager.clear.bind(this.historyManager));

        buildHistory.call(this);
        updateTrash.call(this);
    }
}

function updateHistory(){
    let state = this.historyManager.historyStates[this.historyManager.historyStates.length-1];

    if(state){
        addHistory.call(this, state);
    } else {
        this[$scroll].empty();
    }

    updateTrash.call(this);

}

function buildHistory() {
    this.historyManager.historyStates.forEach((state) => {
        addHistory.call(this, state);
    });
}

function addHistory(state){
    let historyView = new History(state);
    this.historyManager.registerHistory(historyView, state, this.$el);
    this[$scroll].prepend(historyView.$el);
}

function updateTrash(){
    let numberOfStates = this.historyManager.historyStates.length;
    this[$trash].toggle(numberOfStates !== 0);
}