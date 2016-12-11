export default (tokenManager, memoryManager) => {
    tokenManager.memoryClick();
    memoryManager.save(tokenManager.answerStr);
};