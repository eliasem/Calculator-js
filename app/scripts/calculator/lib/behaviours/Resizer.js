/*globals window*/

import $ from 'jquery';

export default class{
    constructor(layout){
        this.layout = layout;
    }

    start(){
        $(window).on('resize', resize.bind(this));
        resize.call(this);
    }
}

function resize(){
    var remainingHeight = window.innerHeight - this.layout.$output.height() - this.layout.$toolbar.height();
    var $rows = this.layout.$el.find('.row');
    var rowHeight = remainingHeight / $rows.length;

    $rows.css('height', `${rowHeight}px`);

    var panelHeight = remainingHeight - rowHeight;

    this.layout.history.$innerPanel.css({height: `${panelHeight}px`});
    this.layout.memoryStack.$innerPanel.css({height: `${panelHeight}px`});
}