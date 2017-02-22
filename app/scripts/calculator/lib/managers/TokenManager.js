import {evaluateTokens, toString, getLastOperatorIndex} from 'calculator/token';
import TokenManagerState from 'calculator/constant/TokenManagerStates';
import TokenManagerEvent from 'calculator/constant/TokenManagerEvents';
import EventApi from 'calculator/lib/event/EventApi';

let eventApi = Symbol('eventApi');
let stateTracker = Symbol('stateTracker');
let errorCode = Symbol('errorCode');

export default class {
    constructor(){
        this[eventApi] = new EventApi();
        this[stateTracker] = 0;

        this.tokens = ['0'];
        this.state = TokenManagerState.NORMAL;
        this[errorCode] = 0;

        createAccessors.call(this);
    }

    change(funct, context){
        this[eventApi].on(TokenManagerEvent.CHANGE, funct, context);
    }

    evaluation(funct, context){
        this[eventApi].on(TokenManagerEvent.EVALUATION, funct, context);
    }

    custom(funct, context){
        this[eventApi].on(TokenManagerEvent.CUSTOM, funct, context);
    }

    trigger(eventName, ...arg){
        arg = eventName === TokenManagerEvent.EVALUATION ? [evaluateTokens(this.tokens)] : arg;

        this[eventApi].trigger.apply(this[eventApi], [eventName, this[errorCode]].concat(arg) );
    }

    setToInvalid(error){
        updateState.call(this, TokenManagerState.INVALID);
        this[errorCode] = error;
        this.trigger(TokenManagerEvent.CHANGE);
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

    applyHistory(history){
        updateState.call(this, TokenManagerState.NORMAL);

        this.tokens.splice(0);
        this.tokens.push.apply(this.tokens, history.tokens);

        this.trigger(TokenManagerEvent.CUSTOM, toString(history.tokens), evaluateTokens(history.tokens));
    }

    memoryClick(){
        updateState.call(this, TokenManagerState.EVALUATED);
    }

    clear(last){
        updateState.call(this, TokenManagerState.NORMAL);
        this[errorCode] = 0;

        if(!last){
            this.tokens.splice(0);
        }
        else{
            let lastOperatorIndex = getLastOperatorIndex(this.tokens);
            this.tokens.splice(lastOperatorIndex+1, this.tokens.length);
        }

        this.tokens.push('0');

        this.trigger(TokenManagerEvent.CHANGE);
    }
}

function createAccessors(){
    Object.defineProperties(this, {
        'expressionStr' : {
            get: () => {
                var lastOperatorIndex = getLastOperatorIndex(this.tokens);
                if(this.tokens[this.tokens.length-1].type){
                    return toString(this.tokens.slice(0, this.tokens.length));
                }
                return toString(this.tokens.slice(0, lastOperatorIndex + 1));
            }
        },
        'answerStr' : {
            get: () => {
                var lastOperatorIndex = getLastOperatorIndex(this.tokens);
                if(this.tokens[this.tokens.length-1].type){
                    return '';
                }
                return toString(this.tokens.slice(lastOperatorIndex + 1));
            }
        }
    });
}

function updateState(state){
    this.state = state;
    if(state === TokenManagerState.EVALUATED){ this[stateTracker]++; }
    else { this[stateTracker] = 0; }
}

