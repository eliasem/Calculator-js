import $ from 'jquery';
import EventApi from 'calculator/lib/event/EventApi';
import Memory from 'calculator/lib/Memory';
import MemoryManagerEvent from 'calculator/constant/MemoryManagerEvents';
import HistoryStateEvent from 'calculator/constant/HistoryStateEvents';

let eventApi = Symbol('eventApi');
let memoryStack = Symbol('memoryStack');
let tokenManager = Symbol('tokenManager');

export default class{
    constructor(tManager){
        this[eventApi] = new EventApi();
        this[memoryStack] = [];
        this[tokenManager] = tManager;
    }

    change(funct, context){
        this.on(MemoryManagerEvent.CHANGE, funct, context);
    }

    on(eventName, funct, context){
        this[eventApi].on(eventName, funct, context);
    }

    trigger(eventName, ...arg){
        this[eventApi].trigger.apply(this[eventApi], [eventName].concat(arg) );
    }

    getMemoryStack(){
        return this[memoryStack];
    }

    getLast(){
        let stack = this.getMemoryStack();
        return stack[stack.length -1];
    }

    clear(state){
        let stack;

        if(state){
            state.$el.remove();
            stack = removeAtIndex(this[memoryStack],this[memoryStack].indexOf(state));
        } else {
            this[memoryStack].forEach(v => v.$el.remove() );
            stack = [];
        }

        this[memoryStack] = stack;
        this.trigger(MemoryManagerEvent.CHANGE);
    }

    restore(){
        let length = this[memoryStack].length;
        if(length === 0) { return null; }
        return this[memoryStack][length -1].value;
    }

    plus(state, value){
        let length = this[memoryStack].length;
        value = value === undefined? this[tokenManager].answerStr : value;
        if(length === 0) {
            this.save(value.toString());
            return;
        }
        let index = state ? this[memoryStack].indexOf(state) : length -1;
        this[memoryStack][index].plusToValue(parseFloat(value));
    }

    minus(state, value){
        let length = this[memoryStack].length;
        value = value === undefined? this[tokenManager].answerStr : value;
        if(length === 0) {
            this.save((-value).toString());
            return;
        }
        let index = state ? this[memoryStack].indexOf(state) : length -1;
        this[memoryStack][index].minusFromValue(parseFloat(value));
    }

    save(value){
        let view = new Memory(value);
        let $view = $(view);

        $view.on(HistoryStateEvent.CLEAR, () => { this.clear.call(this, view); });
        $view.on(HistoryStateEvent.PLUS, () => { this.plus.call(this, view); });
        $view.on(HistoryStateEvent.MINUS, () => { this.minus.call(this, view); });

        this[memoryStack].push(view);
        this.trigger(MemoryManagerEvent.CHANGE);
    }
}

function removeAtIndex(array, index){
    return array.slice(0,index).concat(array.slice(index+1));
}

