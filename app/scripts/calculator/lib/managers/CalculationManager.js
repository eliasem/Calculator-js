import { objectEntries } from 'calculator/utils';

export default class{
    constructor(calculations){
        this.calculations = calculations;
        this.stack = [];
    }
    registerButton(button){
        if(!button.calculations){ return; }

        button.$el.on('keypress', function(e, button){
            onKeypress.call(this, button);
        }.bind(this));
    }
}

function onKeypress(button){
    for(let [objectName,objectValue] of objectEntries(button.calculations)){
        let calculation = this.calculations.getCalculation(objectValue.calculationName);
        if(!calculation){ return; }

        calculation.apply(calculation, [this, button]);
    }
}
