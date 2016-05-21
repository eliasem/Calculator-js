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
        this._events = {};
    }

    on(eventName, funct, context){
        if(!this._events[eventName]){ this._events[eventName] = []; }
        this._events[eventName].push(new EventObject(funct, context));
    }

    trigger(eventName, ...args){
        if(!this._events[eventName]){ return; }

        this._events[eventName].forEach((eventObj) => {
            eventObj.call.apply(eventObj, args);
        });
    }
}