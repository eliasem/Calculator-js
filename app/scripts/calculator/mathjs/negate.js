import {evaluateTokens} from 'calculator/token';

export function negate (tokens){
    return -evaluateTokens(tokens);
}