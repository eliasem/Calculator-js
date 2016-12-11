import $ from 'jquery';
import Panel from './Panel';
import template from 'text!templates/panel.tpl';

const $scroll = Symbol('$scroll');
const $trash = Symbol('$trash');

export default class extends Panel{
    constructor(memoryManager, options){
        super(options);

        this.memoryManager = memoryManager;

        this.memoryManager.change(updateMemory, this);

        this.$innerPanel.append(template);
        this[$scroll] = this.$innerPanel.find('.scroll');
        this[$trash] = this.$innerPanel.find('.trash');

        this[$trash].on('click', () => { this.memoryManager.clear.call(this.memoryManager); });

        buildMemories.call(this);
        updateTrash.call(this);
    }
}

function updateMemory(){
    let stack = this.memoryManager.getMemoryStack();
    let state = stack[stack.length-1];

    if(state){
        buildMemory.call(this, state);
    } else {
        this[$scroll].empty();
    }

    updateTrash.call(this);
}

function buildMemories(){

    let stack = this.memoryManager.getMemoryStack();

    stack.forEach((value) => buildMemory.call(this, value));

    updateTrash.call(this);
}

function buildMemory(view){
    this[$scroll].prepend(view.$el);
}

function updateTrash(){
    let numberOfStates = this.memoryManager.getMemoryStack().length;
    this[$trash].toggle(numberOfStates !== 0);
}
