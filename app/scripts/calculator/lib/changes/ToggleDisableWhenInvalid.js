import TokenManagerState from 'calculator/constant/TokenManagerStates';

export default (manager,button) => {
    button.$el.toggleClass('disabled', manager.state === TokenManagerState.INVALID);
};