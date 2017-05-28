import {evaluateTokens, toString, getLastOperatorIndex} from 'calculator/token';
import TokenManagerEvents from 'calculator/constant/TokenManagerEvents';
import TokenManagerStates from 'calculator/constant/TokenManagerStates';


/*
*   Currently doesn't support negating evaluated answerStr
*/
export default (tokenManager, button) => {

    let lastOperatorIndex = getLastOperatorIndex(tokenManager.tokens);

    if(lastOperatorIndex === tokenManager.tokens-1){ return; }

    let replace = true;

    if(tokenManager.tokens[tokenManager.tokens.length-1].type === 'negate'){

        let tokens = tokenManager.tokens[tokenManager.tokens.length-1].tokens;

        tokenManager.push(tokens[0], { replace: true });
        for(let i =1; i< tokens.length; ++i){
            tokenManager.push(tokens[i]);
        }

    } else {
        let tokens = tokenManager.tokens.slice(lastOperatorIndex + 1);

        if(tokens[0] === '0' && tokens.length === 1){ return; }

        if(tokens.length === 0){ return; }

        tokenManager.tokens.splice((lastOperatorIndex + 1), tokenManager.tokens.length - (lastOperatorIndex + 1));

        tokenManager.push({
            type: 'negate',
            tokens: tokens
        }, {replace: false});
    }


   /* if(!replace){
        tokenManager.trigger(TokenManagerEvents.CUSTOM, tokenManager.expressionStr, tokenManager.answerStr);
    } else {
        tokenManager.trigger(TokenManagerEvents.EVALUATION);
    }
*/
};