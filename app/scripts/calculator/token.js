import mathjs from 'mathjs';
import {findSmallestButGreaterThan} from 'calculator/utils';

const typeToSymbol = {
    'sqrt': '&radic;'
};

export function toString (tokens, options){
    options = options || { skipEndOperator: false };
    options.skipEndOperator = options.skipEndOperator === true;

    let s = '';

    for(let t = 0; t < tokens.length; ++t){
        let str = tokens[t];

        if(t === tokens.length -1 && options.skipEndOperator && isOperator(str)){ continue; }
        else if(isOperator(str)){
            str = ` ${str} `;
        }

        if(str.type){
            let symbol = typeToSymbol[str.type] || str.type;
            str = `${symbol}(${toString(str.tokens)})`;
        }

        s += str;
    }

    return s;
}

export function evaluateTokens(tokens){
    let nextOperatorIndex = getNextOperatorIndex(tokens, 0);
    let chain;

    if(nextOperatorIndex === -1 ){
        if(tokens[tokens.length-1].type){
            chain = mathjs.chain(evaluateTokens(tokens[tokens.length-1].tokens))[getMethodName(tokens[tokens.length-1])]();
        }
        else{
            chain = mathjs.chain(tokens.slice(0, tokens.length).join(''));
        }
    }
    else {
        if(tokens[nextOperatorIndex-1].type){
            chain = mathjs.chain(evaluateTokens(tokens[nextOperatorIndex-1].tokens))[getMethodName(tokens[nextOperatorIndex-1])]();
        }
        else {
            chain = mathjs.chain(tokens.slice(0, nextOperatorIndex).join(''));
        }
    }

    for(let i = nextOperatorIndex; i < tokens.length && nextOperatorIndex !== -1;){
        let methodName = getMethodName(tokens[i]);
        let hasType = !!tokens[i].type;
        let methodTokens = tokens[i].tokens;
        i++;

        nextOperatorIndex = getNextOperatorIndex(tokens, i);

        if(nextOperatorIndex === -1){ nextOperatorIndex = tokens.length; }
        if(i === tokens.length){ continue; }

        if(hasType){
            chain = chain[methodName](methodTokens.join(''));
        }
        else{
            chain = chain[methodName](evaluateTokens(tokens.slice(i, nextOperatorIndex)));
        }


        i = nextOperatorIndex;
    }

    return chain.done();
}

export function getLastOperatorIndex(tokens){
    var operatorIndex = -1;
    operatorIndex =  Math.max(tokens.lastIndexOf('+'), operatorIndex);
    operatorIndex =  Math.max(tokens.lastIndexOf('-'), operatorIndex);
    operatorIndex =  Math.max(tokens.lastIndexOf('&times;'), operatorIndex);
    operatorIndex =  Math.max(tokens.lastIndexOf('&divide;'), operatorIndex);

    return operatorIndex;
}

function isOperator(token){
    return token === '+' || token === '-' || token === '&times;' || token === '&divide;';
}

function getMethodName(token){
    switch(token.type){
        case 'sqrt': return 'sqrt';
        case 'square': return 'square';
    }

    switch(token){
        case '+': return 'add';
        case '-': return 'subtract';
        case '&times;': return 'multiply';
        case '&divide;': return 'divide';
    }
}

function getNextOperatorIndex(tokens, start){
    return findSmallestButGreaterThan([
        tokens.indexOf('+', start),
        tokens.indexOf('-', start),
        tokens.indexOf('&times;', start),
        tokens.indexOf('&divide;', start)
    ], -1);
}
