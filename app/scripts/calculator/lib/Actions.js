export default class {
    constructor(actions){
        this.actions = actions;
    }

    getAction(actionName){
        return this.actions[actionName];
    }
}