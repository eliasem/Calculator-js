export default (tokenManager, memoryManager) => {
    tokenManager.push(memoryManager.getLast().value, { replace: true });
};