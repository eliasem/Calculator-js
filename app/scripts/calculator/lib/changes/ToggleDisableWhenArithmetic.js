export default (manager,button) => {
    button.$el.toggleClass('disabled', manager.isLastToken(['+', '-', '&times;', '&divide;']));
};