export default (tokenManager, memoryManager) => {
    tokenManager.memoryClick();
    memoryManager.minus(null, tokenManager.answerStr);
};