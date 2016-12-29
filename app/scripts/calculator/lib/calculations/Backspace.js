import { getLastOperatorIndex } from 'calculator/token';
import TokenManagerEvent from 'calculator/constant/TokenManagerEvents';

export default (tokenManager, button) => {
    let lastOperatorIndex = getLastOperatorIndex(tokenManager.tokens);
    if(lastOperatorIndex === tokenManager.tokens.length - 1){ return; }

    tokenManager.tokens.splice(-1);

    if(lastOperatorIndex === tokenManager.tokens.length - 1  || !tokenManager.tokens.length){
        tokenManager.tokens.push('0');
    }

    tokenManager.trigger(TokenManagerEvent.CHANGE);
};