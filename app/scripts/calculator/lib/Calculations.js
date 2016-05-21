export default class {
    constructor(calculations){
        this.calculations = calculations;
    }

    getCalculation(calculationName){
        return this.calculations[calculationName];
    }
}