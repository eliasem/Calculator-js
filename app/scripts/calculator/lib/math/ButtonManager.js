export default class {
    constructor(actions, layout){
        this.actions = actions;
        this.layout = layout;
    }
    registerButton($button){
        $button.on('keypress', function(e, button){
            onKeypress.call(this, button);
        }.bind(this));
    }
}

function onKeypress(button){
    let action = this.actions.getAction(button.actionName);
    if(!action){ return; }

    let actionArgs = getActionArgs.call(this, button.actionArgs);

    action.apply(action, actionArgs);
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