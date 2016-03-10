import 'babelPolyfill';

import $ from 'jquery';

import Actions from 'calculator/lib/Actions';
import Calculations from 'calculator/lib/Calculations';
import actionConfig from 'calculator/config/actions';
import calculationConfig from 'calculator/config/calculations';

import Layout from 'calculator/lib/Layout';

import CalculationManager from 'calculator/lib/managers/CalculationManager';
import ActionManager from 'calculator/lib/managers/ActionManager';

export default class {
    constructor(options){
        this.$el = $("<div class='calculator'>");

        this.layout = new Layout();

        this.actions = new Actions(actionConfig);
        this.calculations = new Calculations(calculationConfig);

        this.calculationManager = new CalculationManager(this.calculations);
        this.actionManager = new ActionManager(this.actions, this.layout);

        registerButtons.call(this);

        this.$el.append(this.layout.$el);
    }
}

function registerButtons(){
    for (let button of this.layout.buttons){
        this.calculationManager.registerButton(button);
        this.actionManager.registerButton(button);
    }
}