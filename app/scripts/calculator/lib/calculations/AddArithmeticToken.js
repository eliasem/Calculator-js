import TokenManagerEvent from 'calculator/constant/TokenManagerEvents';

export default (tokenManager, button) => {
    tokenManager.push(button.mathSymbol, {
        replace: tokenManager.isLastToken(['+', '-', '&times;', '&divide;'])
    });

    tokenManager.trigger(TokenManagerEvent.EVALUATION);
};