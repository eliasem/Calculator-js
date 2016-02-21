import 'babelPolyfill';

import $ from 'jquery';

import Actions from 'calculator/lib/Actions';
import actionConfig from 'calculator/config/actions';

import Layout from 'calculator/lib/Layout';

import KeypressManager from 'calculator/lib/math/KeypressManager';
import ButtonManager from 'calculator/lib/math/ButtonManager';

export default class {
    constructor(options){
        this.$el = $("<div class='calculator'>");

        this.layout = new Layout();

        this.actions = new Actions(actionConfig);

        this.keypressManager = new KeypressManager();
        this.buttonManager = new ButtonManager(this.actions, this.layout);

        registerButtons.call(this);

        this.$el.append(this.layout.$el);
    }
}

function registerButtons(){
    for (let button of this.layout.buttons){
        this.keypressManager.registerKeypress(button.$el);
        this.buttonManager.registerButton(button.$el);
    }
}