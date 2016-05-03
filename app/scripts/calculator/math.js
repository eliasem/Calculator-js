import mathjs from 'mathjs';
import {findSmallestButGreaterThan} from 'calculator/utils';

function getMethodName(token){
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

export function evaluateTokens(tokens){
    let nextOperatorIndex = getNextOperatorIndex(tokens, 0);
    let chain = mathjs.chain(tokens.slice(0, nextOperatorIndex === -1 ? tokens.length : nextOperatorIndex).join(''));

    for(let i = nextOperatorIndex; i < tokens.length && nextOperatorIndex !== -1;){
        let methodName = getMethodName(tokens[i]);
        i++;

        nextOperatorIndex = getNextOperatorIndex(tokens, i);

        if(nextOperatorIndex === -1){ nextOperatorIndex = tokens.length; }
        if(i === tokens.length){ continue; }

        chain = chain[methodName](tokens.slice(i, nextOperatorIndex).join(''));

        i = nextOperatorIndex;
    }

    return chain.done();
}