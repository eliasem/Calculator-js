import $ from 'jquery';
import Panel from './Panel';
import HistoryPanel from './HistoryPanel';

export default function(config){
    this.$el = $(`<div class='${config.name}'></div>`);

    this.$toolbar = $(`<div class='toolbar'></div>`);
    this.$toolbar.append(`<div class='title'>${config.name}</div>`);
    let $toolbarButtons = $('<div class="buttons"></div>');

    for(let button of config.toolbar.buttons){
        $toolbarButtons.append(button.$el);
        this.buttons.push(button);
    }

    this.$toolbar.append($toolbarButtons);

    this.$el.append(this.$toolbar);

    this.$output = $(`<div class='output'></div>`);
    this.$expressionArea = $(`<div class='expressionArea'></div>`);
    this.$answer = $(`<div class='answer'></div>`);

    this.$output.append(this.$expressionArea);
    this.$output.append(this.$answer);

    this.$el.append(this.$output);

    for(let row =0; row< config.rows.length;  row++ ){
        let className = config.rows[row].className || '';
        let $row = $(`<div class='row ${className}'></div>`);

        for(let b in config.rows[row].buttons){
            $row.append(config.rows[row].buttons[b].$el);
            this.buttons.push(config.rows[row].buttons[b]);
        }

        this.$el.append($row);
    }

    this.memoryStack = new Panel({ className: 'memoryStackPanel'});
    this.history = new HistoryPanel(this.historyManager, { className: 'historyPanel'});

    this.$el.append(this.memoryStack.$el);
    this.$el.append(this.history.$el);
}