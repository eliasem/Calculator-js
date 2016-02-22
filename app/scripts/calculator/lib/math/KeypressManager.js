export default class{
    constructor(){
        this.stack = [];
    }
    registerKeypress($button){
        $button.on('keypress', function(e, button){
            addKey.call(this, button.id);
        }.bind(this));
    }
}

function addKey(id){
    this.stack.push(id);
}