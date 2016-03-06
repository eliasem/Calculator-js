import $ from 'jquery';

class Button {
    constructor(id, config){
        this.id = id;
        this.html = config.html;
        this.class = config.class;
        this.actions = config.actions;

        this.$el = $(`<div class="calc-button ${this.class}">${this.html}</div>`);

        this.$el.on('mousedown', e => $(e.currentTarget).addClass('pressed'));
        this.$el.on('mouseup mouseout', e => $(e.currentTarget).removeClass('pressed'));
        this.$el.on('click', onClick.bind(this));
    }
}

function onClick(){
    this.$el.trigger('keypress', this);
}

export default Button;