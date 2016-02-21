import $ from 'jquery';

class Button {
    constructor(id, config){
        this.id = id;
        this.html = config.html;
        this.class = config.class;
        this.actionName = config.actionName;
        this.actionArgs = config.actionArgs;

        this.$el = $(`<div class="calc-button ${this.class}">${this.html}</div>`);

        this.$el.on('mousedown', e => $(e.target).addClass('pressed'));
        this.$el.on('mouseup', e => $(e.target).removeClass('pressed'));
        this.$el.on('click', onClick.bind(this));
    }
}

function onClick(){
    this.$el.trigger('keypress', this);
}

export default Button;