import {evaluateTokens, toString, getLastOperatorIndex} from 'calculator/token';
import TokenManagerEvents from 'calculator/constant/TokenManagerEvents';
import TokenManagerStates from 'calculator/constant/TokenManagerStates';

export default (tokenManager, button) => {
    tokenManager.push({
        type: 'square',
        tokens: tokenManager.tokens.slice()
    }, {replace: true});

    tokenManager.trigger(TokenManagerEvents.EVALUATION);
};