import $ from 'jquery';
import sinon from 'sinon';

import ButtonManager from 'calculator/lib/math/ButtonManager';
import Actions from 'calculator/lib/Actions';


describe ('Button Manager', () => {

    let sandbox;
    let underTest, layout, actions, testAction;

    function createButton(actionName, actionArgs){
        return {
            $el : $("<div></div>"),
            actionName: actionName,
            actionArgs: actionArgs
        };
    }

    beforeEach(() => {
        sandbox = sinon.sandbox.create();
        layout = {
            getReference: sandbox.stub()
        };

        testAction = sandbox.stub();

        actions = new Actions({
            'TestAction': testAction
        });

        underTest = new ButtonManager(actions, layout);
    });

    describe('when the button is pressed', () => {

        it('should return if actionName is not valid', () => {
            let button = createButton();

            expect(() => { underTest.registerButton(button.$el); } ).to.not.throw();
        });

        it('should call the action with the correct args', () => {
            let button = createButton('TestAction', [1, 'normalArg', '&reference']);
            sandbox.spy(button.$el, 'on');

            let reference = {};
            layout.getReference.withArgs('&reference').returns(reference);

            underTest.registerButton(button.$el);

            button.$el.trigger('keypress', button);

            expect(testAction.called).to.equal(true);
            expect(testAction.getCall(0).args[0]).to.equal(1);
            expect(testAction.getCall(0).args[1]).to.equal('normalArg');
            expect(testAction.getCall(0).args[2]).to.equal(reference);
        });

    });

});