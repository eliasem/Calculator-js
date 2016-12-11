export default (tokenManager, memoryManager) => {
    tokenManager.memoryClick();
    memoryManager.plus(null, tokenManager.answerStr);
};