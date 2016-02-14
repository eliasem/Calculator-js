import 'babelPolyfill';

import $ from 'jquery';

import Layout from 'calculator/lib/Layout';

export default class {
    constructor(options){
        this.$el = $("<div class='calculator'>");

        setupLayout.call(this);
    }
}

function setupLayout(){
    this.$el.append(new Layout().$el);
}