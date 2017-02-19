import TokenManagerState from 'calculator/constant/TokenManagerStates';

export default (tokenManager, button) => {

    let mathSymbol = button.mathSymbol;
    let removeZero = true;

    if(tokenManager.state === TokenManagerState.INVALID){
        tokenManager.clear();
        return;
    }

    if(tokenManager.answerStr === '0' && button.mathSymbol === '0'){ return; }
    if(tokenManager.answerStr.indexOf('.') !== -1 && button.mathSymbol === '.'){ return; }
    if(tokenManager.answerStr === '0' && button.mathSymbol === '.'){ removeZero = false; }

    if(tokenManager.state === TokenManagerState.EVALUATED && button.mathSymbol === '.'){
        tokenManager.push('0');
    }

    tokenManager.push(mathSymbol, {
        replace: (tokenManager.answerStr === '0' && removeZero) || tokenManager.state === TokenManagerState.EVALUATED
    });
};