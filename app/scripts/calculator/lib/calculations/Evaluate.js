import TokenManagerState from 'calculator/constant/TokenManagerStates';

export default (tokenManager, button) => {
    if(tokenManager.state === TokenManagerState.INVALID){
        tokenManager.clear();
        return;
    }

    tokenManager.evaluate();
};