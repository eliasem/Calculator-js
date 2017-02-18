import { getLastOperatorIndex } from 'calculator/token';
import TokenManagerEvent from 'calculator/constant/TokenManagerEvents';
import TokenManagerStates from 'calculator/constant/TokenManagerStates';

export default (tokenManager, button) => {
    let lastOperatorIndex = getLastOperatorIndex(tokenManager.tokens);
    if(lastOperatorIndex === tokenManager.tokens.length - 1){ return; }

    tokenManager.tokens.splice(-1);

    if(lastOperatorIndex === tokenManager.tokens.length - 1  || !tokenManager.tokens.length){
        tokenManager.tokens.push('0');
    }

    if(tokenManager.state === TokenManagerStates.EVALUATED){ return; }

    tokenManager.trigger(TokenManagerEvent.CHANGE);
};