import {evaluateTokens} from 'calculator/math';
import TokenManagerState from 'calculator/constant/TokenManagerStates';
import TokenManagerEvent from 'calculator/constant/TokenManagerEvents';
import EventApi from 'calculator/lib/event/EventApi';

export default class {
    constructor(){
        this._eventApi = new EventApi();

        this.tokens = [0];
        this.state = TokenManagerState.NORMAL;

        createAccessors.call(this);
    }

    change(funct, context){
        this._eventApi.on(TokenManagerEvent.CHANGE, funct, context);
    }

    evaluation(funct, context){
        this._eventApi.on(TokenManagerEvent.EVALUATION, funct, context);
    }

    trigger(eventName){
        let arg = eventName === TokenManagerEvent.EVALUATION ? evaluateTokens(this.tokens) : null;

        this._eventApi.trigger(eventName, arg);
    }

    push(value, options){
        this.state = TokenManagerState.NORMAL;

        options = options || {};

        if(options.replace){ this.tokens.pop(); }

        this.tokens.push(value);
        this.trigger(TokenManagerEvent.CHANGE);
    }

    evaluate(){
        this.state = TokenManagerState.EVALUATED;

        let value = evaluateTokens(this.tokens);
        this.tokens.splice(0);

        this.tokens.push(value);
        this.trigger(TokenManagerEvent.CHANGE);
    }

    isLastToken(tokens){
        if(!this.tokens.length) return false;

        let lastToken = this.tokens[this.tokens.length-1];

        for(let i=0; i< tokens.length; ++i ){
            if(lastToken === tokens[i]){ return true; }
        }

        return false;
    }
}

function createAccessors(){
    Object.defineProperties(this, {
        "expressionStr" : {
            get: () => {
                var lastOperatorIndex = getLastOperatorIndex.call(this);
                return toString(this.tokens.slice(0, lastOperatorIndex + 1));
            }
        },
        "answerStr" : {
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

function toString (tokens){
    let s = "";

    for(let t = 0; t < tokens.length; ++t){
        if(tokens[t] === '+' || tokens[t] === '-' || tokens[t] === '&times;' || tokens[t] === '&divide;'){
            s += ` ${tokens[t]} `;
            continue;
        }

        s += tokens[t];
    }

    return s;
}