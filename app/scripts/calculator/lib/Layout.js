import $ from 'jquery';

import Referencable from './behaviours/Referencable';
import Resizer from './behaviours/Resizer';
import buildLayout from './builder/layout';


export default class Layout extends Referencable{
    constructor(tokenManager, historyManager, config){
        super();
        this.buttons = [];
        this.tokenManager = tokenManager;
        this.historyManager = historyManager;

        createLayout.call(this, config);

        this.resizer = new Resizer(this);

        this.tokenManager.change(renderExpression, this);
        this.tokenManager.change(renderAnswer, this);
        this.tokenManager.evaluation(renderEvaluationAnswer, this);
        renderAnswer.call(this);
    }
    resizeLayout(){
        this.resizer.start();
    }
}

function createLayout(config){
    if(!config){ return; }

    buildLayout.call(this, config);
}

function renderExpression(){
    this.$expressionArea.html(this.tokenManager.expressionStr);
}
function renderAnswer(){
    this.$answer.html(this.tokenManager.answerStr);
}

function renderEvaluationAnswer(answer){
    this.$answer.html(answer);
}
