import { objectEntries } from 'calculator/utils';

export default class {
    constructor(actions, layout){
        this.actions = actions;
        this.layout = layout;
    }
    registerButton(button){
        if(!button.actions){ return; }

        button.$el.on('keypress', function(e, button){
            onKeypress.call(this, button);
        }.bind(this));
    }
}

function onKeypress(button){
    for(let [objectName,objectValue] of objectEntries(button.actions)){
        let action = this.actions.getAction(objectValue.actionName);
        if(!action){ return; }

        let actionArgs = getActionArgs.call(this, objectValue.actionArgs);

        action.apply(action, actionArgs);
    }
}

function getActionArgs(argStrings) {
    let actionArgs = [];

    for (let argString of argStrings){
        let arg = argString;

        if(arg[0] === '&'){
            arg = this.layout.getReference(arg);
        }

        actionArgs.push(arg);
    }

    return actionArgs;
}