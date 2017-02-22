import $ from 'jquery';

import Referencable from './behaviours/Referencable';
import Resizer from './behaviours/Resizer';
import buildLayout from './builder/layout';
import TokenManagerStates from 'calculator/constant/TokenManagerStates';
import errorMessages from 'calculator/config/errors';


export default class Layout extends Referencable {
    constructor(tokenManager, historyManager, memoryManager, config){
        super();
        this.buttons = [];
        this.tokenManager = tokenManager;
        this.historyManager = historyManager;
        this.memoryManager = memoryManager;

        createLayout.call(this, config);

        this.resizer = new Resizer(this);

        this.tokenManager.change(renderExpression, this);
        this.tokenManager.change(renderAnswer, this);
        this.tokenManager.custom(renderCustomExpressionAndAnswer, this);
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
function renderAnswer(errorCode){
    displayValidAnswer.call(this, errorCode, this.tokenManager.answerStr);
}

function renderEvaluationAnswer(errorCode, answer){
    displayValidAnswer.call(this, errorCode, answer);
}

function displayValidAnswer(errorCode, answer){
    if(this.tokenManager.state === TokenManagerStates.INVALID ){
        this.$answer.html(errorMessages[errorCode]);
    } else {
        this.$answer.html(answer);
    }
}

function renderCustomExpressionAndAnswer(expression, answer){
    this.$expressionArea.html(expression);
    displayValidAnswer.call(this, answer);
}
