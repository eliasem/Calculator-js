import $ from 'jquery';
import standard from '../config/standard';

let Mode = {
    standard: standard
};


export default class {
    constructor(options){
        this.mode = 'standard';

        this.buttons = [];

        buildLayout.call(this);
    }
    getReference(referenceString){
        return this['$' + referenceString.substr(1)];
    }
}


function getConfig(mode){
    return Mode[mode];
}

function buildLayout(){
    let config = getConfig(this.mode);

    if(!config){ return; }

    this.$el = $(`<div class="${this.mode}"></div>`);

    this.$toolbar = $(`<div class="toolbar"></div>`);
    this.$toolbar.append(`<div class="title">${this.mode}</div>`);
    this.$toolbar.append(`<div class="history icon icon-history"></div>`);

    this.$el.append(this.$toolbar);

    this.$output = $(`<div class="output"></div>`);
    this.$expressionArea = $(`<div class="expressionArea"></div>`);
    this.$answer = $(`<div class="answer"></div>`);

    this.$output.append(this.$expressionArea);
    this.$output.append(this.$answer);

    this.$el.append(this.$output);

    for(let row =0; row< config.rows.length;  row++ ){
        let $row = $(`<div class="row ${config.rows[row].className}"></div>`);

        for(let b in config.rows[row].buttons){
            $row.append(config.rows[row].buttons[b].$el);
            this.buttons.push(config.rows[row].buttons[b]);
        }

        $row.css('height', `${80/config.rows.length}vh` );

        this.$el.append($row);
    }
}