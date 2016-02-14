import $ from 'jquery';

class Button {
    constructor(config){
        this.html = config.html;
        this.class = config.class;

        this.$el = $(`<div class="calc-button ${this.class}">${this.html}</div>`);
    }
}

export default Button;