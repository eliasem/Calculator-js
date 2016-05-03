import $ from 'jquery';

export default class {
    constructor(options){
        options = options || {};

        this.$el = $(`<div class="panel ${options.className} displayNone"></div>`);
        this.$innerPanel = $('<div class="innerPanel"></div>');

        this.$el.append(this.$innerPanel);

        this.$el.click(() => {
                this.$el.addClass('displayNone');
        });

        this.$innerPanel.click((e) => { e.stopImmediatePropagation(); });
    }
}