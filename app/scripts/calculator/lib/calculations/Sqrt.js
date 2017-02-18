import {evaluateTokens, toString, getLastOperatorIndex} from 'calculator/token';
import TokenManagerEvent from 'calculator/constant/TokenManagerEvents';

export default (tokenManager, button) => {
    tokenManager.push({
        type: 'sqrt',
        tokens: [tokenManager.answerStr]
    }, {replace: true});

    tokenManager.trigger(TokenManagerEvent.EVALUATION);
};