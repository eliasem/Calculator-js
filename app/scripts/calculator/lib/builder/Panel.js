import $ from 'jquery';
import PanelConstants from 'calculator/constant/Panel';

export default class {
    constructor(options){
        options = options || {};

        this.$el = $(`<div class='panel ${options.className} displayNone'></div>`);
        this.$innerPanel = $('<div class="innerPanel"></div>');

        this.$el.append(this.$innerPanel);
        this.$el.on(PanelConstants.CLOSE_EVENT, () => {
            this.$el.addClass('displayNone');
        });

        this.$el.click(() => {
            this.$el.trigger(PanelConstants.CLOSE_EVENT);
        });

        this.$innerPanel.click((e) => { e.stopImmediatePropagation(); });
    }
}