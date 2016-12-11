export default (manager,button) => {
    button.$el.toggleClass('disabled', manager.getMemoryStack().length === 0);
};