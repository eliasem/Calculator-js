let events = Symbol('events');

class EventObject{
    constructor(funct, context){
        this.funct = funct;
        this.context = context;
    }

    call(){
        this.funct.apply(this.context, arguments);
    }
}

export default class EventApi{
    constructor(){
        this[events] = {};
    }

    on(eventName, funct, context){
        if(!this[events][eventName]){ this[events][eventName] = []; }
        this[events][eventName].push(new EventObject(funct, context));
    }

    trigger(eventName, ...args){
        if(!this[events][eventName]){ return; }

        this[events][eventName].forEach((eventObj) => {
            eventObj.call.apply(eventObj, args);
        });
    }
}