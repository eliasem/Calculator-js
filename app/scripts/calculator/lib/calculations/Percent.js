import {evaluateTokens, toString, getLastOperatorIndex} from 'calculator/token';
import TokenManagerEvent from 'calculator/constant/TokenManagerEvents';

export default (tokenManager, button) => {

    let lastOperatorIndex = getLastOperatorIndex(tokenManager.tokens);
    if(lastOperatorIndex === -1){
        tokenManager.clear();
        tokenManager.trigger(TokenManagerEvent.CUSTOM, '0', '0');
        return;
    }

    let evaluatedTokens = evaluateTokens(tokenManager.tokens.slice(0, lastOperatorIndex));
    let originalLastValue = tokenManager.tokens.slice(lastOperatorIndex+1)[0];
    let lastValue = originalLastValue;

    if(lastValue === undefined){ lastValue = evaluatedTokens; }

    let value = (parseFloat(lastValue) / 100 * parseFloat(evaluatedTokens)).toString();
    tokenManager.push(value, {replace: originalLastValue !== undefined});

    tokenManager.trigger(TokenManagerEvent.CUSTOM, toString(tokenManager.tokens), value);
};