import $ from 'jquery';
import HistoryStateEvent from 'calculator/constant/HistoryStateEvents';

import template from 'text!templates/memoryState.tpl';

const $value = Symbol('$value');

export default class {
    constructor(value){
        this.$el = $(template);

        this[$value] = this.$el.find('.value');
        this.value = parseFloat(value);
        build.call(this);
    }
    plusToValue(toAdd){
        this.value += parseFloat(toAdd);
        updateValueInView.call(this);
    }
    minusFromValue(toMinus){
        this.value -= parseFloat(toMinus);
        updateValueInView.call(this);
    }
}
function build() {
    updateValueInView.call(this);
    this.$el.find('.memoryClear').on('click', clear.bind(this));
    this.$el.find('.memoryPlus').on('click', plus.bind(this));
    this.$el.find('.memoryMinus').on('click', minus.bind(this));
}

function updateValueInView(){
    this[$value].html(this.value);
}

function clear(){
    this.$el.remove();
    $(this).trigger(HistoryStateEvent.CLEAR, this);
}

function plus(){
    $(this).trigger(HistoryStateEvent.PLUS, this);
}

function minus(){
    $(this).trigger(HistoryStateEvent.MINUS, this);
}