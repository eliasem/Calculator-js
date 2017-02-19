import {evaluateTokens, toString, getLastOperatorIndex} from 'calculator/token';
import TokenManagerEvents from 'calculator/constant/TokenManagerEvents';
import TokenManagerStates from 'calculator/constant/TokenManagerStates';

export default (tokenManager, button) => {
    let answerStr = tokenManager.answerStr;

    tokenManager.push({
        type: 'sqrt',
        tokens: [answerStr]
    }, {replace: true});

    if(parseFloat(answerStr) < 0){
        tokenManager.setToInvalid();
    }

    tokenManager.trigger(TokenManagerEvents.EVALUATION);
};