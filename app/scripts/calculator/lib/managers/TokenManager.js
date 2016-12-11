import {evaluateTokens, toString} from 'calculator/token';
import TokenManagerState from 'calculator/constant/TokenManagerStates';
import TokenManagerEvent from 'calculator/constant/TokenManagerEvents';
import EventApi from 'calculator/lib/event/EventApi';

let eventApi = Symbol('eventApi');
let stateTracker = Symbol('stateTracker');

export default class {
    constructor(){
        this[eventApi] = new EventApi();
        this[stateTracker] = 0;

        this.tokens = ['0'];
        this.state = TokenManagerState.NORMAL;

        createAccessors.call(this);
    }

    change(funct, context){
        this[eventApi].on(TokenManagerEvent.CHANGE, funct, context);
    }

    evaluation(funct, context){
        this[eventApi].on(TokenManagerEvent.EVALUATION, funct, context);
    }

    appliedHistory(funct, context){
        this[eventApi].on(TokenManagerEvent.APPLIED_HISTORY, funct, context);
    }

    trigger(eventName, ...arg){
        arg = eventName === TokenManagerEvent.EVALUATION ? [evaluateTokens(this.tokens)] : arg;

        this[eventApi].trigger.apply(this[eventApi], [eventName].concat(arg) );
    }

    push(value, options){
        updateState.call(this, TokenManagerState.NORMAL);

        options = options || {};

        if(options.replace){ this.tokens.pop(); }

        this.tokens.push(value);
        this.trigger(TokenManagerEvent.CHANGE);
    }

    evaluate(){
        updateState.call(this, TokenManagerState.EVALUATED);

        let value = evaluateTokens(this.tokens);
        let tokens = this.tokens.slice(0);
        this.tokens.splice(0);

        this.tokens.push(value);
        this.trigger(TokenManagerEvent.CHANGE, tokens);
    }

    hasAlreadyEvaluated(){
        return this[stateTracker] !== 1;
    }

    isLastToken(tokens){
        if(!this.tokens.length) return false;

        let lastToken = this.tokens[this.tokens.length-1];

        for(let i=0; i< tokens.length; ++i ){
            if(lastToken === tokens[i]){ return true; }
        }

        return false;
    }

    clear(last){
        updateState.call(this, TokenManagerState.NORMAL);
        if(!last){
            this.tokens.splice(0);
        }
        else{
            let lastOperatorIndex = getLastOperatorIndex.call(this);
            this.tokens.splice(lastOperatorIndex+1, this.tokens.length);
        }

        this.tokens.push('0');

        this.trigger(TokenManagerEvent.CHANGE);
    }

    backspace(){
        let lastOperatorIndex = getLastOperatorIndex.call(this);
        if(lastOperatorIndex === this.tokens.length - 1){ return; }

        this.tokens.splice(-1);

        if(lastOperatorIndex === this.tokens.length - 1  || !this.tokens.length){
            this.tokens.push('0');
        }

        this.trigger(TokenManagerEvent.CHANGE);
    }

    applyHistory(history){
        updateState.call(this, TokenManagerState.NORMAL);

        this.tokens.splice(0);
        this.tokens.push.apply(this.tokens, history.tokens);

        this.trigger(TokenManagerEvent.APPLIED_HISTORY, toString(history.tokens), evaluateTokens(history.tokens));
    }

    memoryClick(){
        updateState.call(this, TokenManagerState.EVALUATED);
    }
}

function createAccessors(){
    Object.defineProperties(this, {
        'expressionStr' : {
            get: () => {
                var lastOperatorIndex = getLastOperatorIndex.call(this);
                return toString(this.tokens.slice(0, lastOperatorIndex + 1));
            }
        },
        'answerStr' : {
            get: () => {
                var lastOperatorIndex = getLastOperatorIndex.call(this);
                return toString(this.tokens.slice(lastOperatorIndex + 1));
            }
        }
    });
}

function getLastOperatorIndex(){
    var operatorIndex = -1;
    operatorIndex =  Math.max(this.tokens.lastIndexOf('+'), operatorIndex);
    operatorIndex =  Math.max(this.tokens.lastIndexOf('-'), operatorIndex);
    operatorIndex =  Math.max(this.tokens.lastIndexOf('&times;'), operatorIndex);
    operatorIndex =  Math.max(this.tokens.lastIndexOf('&divide;'), operatorIndex);

    return operatorIndex;
}

function updateState(state){
    this.state = state;
    if(state === TokenManagerState.EVALUATED){ this[stateTracker]++; }
    else { this[stateTracker] = 0; }
}

