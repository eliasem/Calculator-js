import $ from 'jquery';
import sinon from 'sinon';

import CalculationManager from 'calculator/lib/managers/CalculationManager';
import Calculations from 'calculator/lib/Calculations';


describe ('Calculation Manager', () => {

    let sandbox;
    let underTest, calculations, testCalculation;

    function createButton(calculationName){
        return {
            $el : $('<div></div>'),
            calculations:{
                'calculation1': {calculationName: calculationName }
            }
        };
    }

    beforeEach(() => {
        sandbox = sinon.sandbox.create();

        testCalculation = sandbox.stub();

        calculations = new Calculations({
            'TestCalculation': testCalculation
        });

        underTest = new CalculationManager(calculations);
    });

    describe('when the button is pressed', () => {

        describe('no calculations set', () => {
            it('should not throw if actions is not given', () => {
                let button = createButton();
                delete button.calculations;

                underTest.registerButton(button);
                expect(() => { button.$el.trigger('keypress', button); } ).to.not.throw();
            });
        });

        describe('invalid calculation name', () => {
            it('should not error if the calculation name has not been set on first calculation', () => {
                let button = createButton();
                underTest.registerButton(button);
                expect(() => { button.$el.trigger('keypress', button); } ).to.not.throw();
            });

            it('should not error if the calculation name has not been set on second calculation', () => {
                let button = createButton('TestCalculation');
                button.calculations['calculation2'] = { calculationName: undefined};
                sandbox.spy(button.$el, 'on');

                underTest.registerButton(button);

                expect(() => { button.$el.trigger('keypress', button); } ).to.not.throw();

                expect(testCalculation.callCount).to.equal(1);
            });

        });

    });

});