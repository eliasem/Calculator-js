import TokenManagerState from 'calculator/constant/TokenManagerStates';

export default (tokenManager, button) => {

    if(tokenManager.answerStr === "0" && button.mathSymbol === '0'){ return; }

    tokenManager.push(button.mathSymbol, {
        replace: tokenManager.answerStr === "0" || tokenManager.state === TokenManagerState.EVALUATED
    });
};