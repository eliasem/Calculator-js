import $ from 'jquery';
import { toString } from 'calculator/token';

import template from 'text!templates/historyState.tpl';

export default class {
    constructor(state){
        this.$el = $(template);

        build.call(this,state);
    }
}
function build(state) {
    this.$el.find('.top').html(`${toString(state.tokens, {skipEndOperator: true})} =`);
    this.$el.find('.bottom').html(state.answer);
}