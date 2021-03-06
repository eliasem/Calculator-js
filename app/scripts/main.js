import 'babelPolyfill';

import $ from 'jquery';

import Actions from 'calculator/lib/Actions';
import Calculations from 'calculator/lib/Calculations';
import actionConfig from 'calculator/config/actions';
import calculationConfig from 'calculator/config/calculations';

import Layout from 'calculator/lib/Layout';

import CalculationManager from 'calculator/lib/managers/CalculationManager';
import ActionManager from 'calculator/lib/managers/ActionManager';
import TokenManager from 'calculator/lib/managers/TokenManager';
import HistoryManager from 'calculator/lib/managers/HistoryManager';
import MemoryManager from 'calculator/lib/managers/MemoryManager';
import ChangeManager from 'calculator/lib/managers/ChangeManager';

import standard from 'calculator/config/standard';

import 'calculator/mathjs/negate';

export default class {
    constructor(options){
        let mode = standard;
        this.$el = $('<div class="calculator">');

        this.tokenManager = new TokenManager();
        this.historyManager = new HistoryManager(this.tokenManager);
        this.memoryManager = new MemoryManager(this.tokenManager);
        this.layout = new Layout(this.tokenManager, this.historyManager, this.memoryManager, mode);

        this.actions = new Actions(actionConfig);
        this.calculations = new Calculations(calculationConfig);

        this.calculationManager = new CalculationManager(this.calculations, this.tokenManager);
        this.actionManager = new ActionManager(this.actions, this.layout);

        this.changeManager = new ChangeManager(this.tokenManager, this.memoryManager, mode);

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