import EventApi from 'calculator/lib/event/EventApi';
import Referencable from 'calculator/lib/behaviours/Referencable';
import changeConfig from 'calculator/config/changes';

const changes = Symbol('changes');

export default class extends Referencable{
    constructor(tokenManager, memoryManager, config){
        super();

        this[changes] = changeConfig;
        this.tokenManager = tokenManager;
        this.memoryManager = memoryManager;

        for(let button of config.toolbar.buttons){
            processChanges.call(this, button);
        }


        for(let row =0; row< config.rows.length;  row++ ){
            for(let button of config.rows[row].buttons){
                processChanges.call(this, button);
            }
        }
    }
}

function processChanges(button){
    for(let change in button.changes){
        if(!button.changes.hasOwnProperty(change)){ continue; }
        let manager = this.getReference(button.changes[change].on);
        let changeFunc = getChange.call(this, button.changes[change].changeName);
        manager.change(function(){ changeFunc(manager, button); });
    }
}

function getChange(changeName){
    return this[changes][changeName];
}