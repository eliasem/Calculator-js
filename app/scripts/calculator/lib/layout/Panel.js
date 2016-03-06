import $ from 'jquery';

export default class {
    constructor(options){
        this.$el = $(`<div class="panel ${options.className} displayNone"></div>`);
        this.$innerPanel = $('<div class="innerPanel"></div>');

        this.$el.append(this.$innerPanel);

        this.$el.click(function(){
                this.$el.addClass('displayNone');
        }.bind(this));

        this.$innerPanel.click((e) => { e.stopImmediatePropagation(); });
    }
}