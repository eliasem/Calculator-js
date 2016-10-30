import $ from 'jquery';
import sinon from 'sinon';

import ActionManager from 'calculator/lib/managers/ActionManager';
import Actions from 'calculator/lib/Actions';


describe ('Action Manager', () => {

    let sandbox;
    let underTest, layout, actions, testAction;

    function createButton(actionName, actionArgs){
        return {
            $el : $('<div></div>'),
            actions:{
                'action1': {actionName: actionName, actionArgs: actionArgs }
            }
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

        underTest = new ActionManager(actions, layout);
    });

    describe('when the button is pressed', () => {

        describe('no actions set', () => {
            it('should not throw if actions is not given', () => {
                let button = createButton();
                delete button.actions;

                underTest.registerButton(button);
                expect(() => { button.$el.trigger('keypress', button); } ).to.not.throw();
            });
        });

        describe('invalid action name', () => {
            it('should not error if the action name has not been set on first action', () => {
                let button = createButton();
                underTest.registerButton(button);
                expect(() => { button.$el.trigger('keypress', button); } ).to.not.throw();
            });

            it('should not error if the action name has not been set on second action', () => {
                let button = createButton('TestAction', [1, 'normalArg', '&reference']);
                button.actions['action2'] = { actionName: undefined, actionArgs: [2, 'secondArg', '&reference']};
                sandbox.spy(button.$el, 'on');

                let reference = {};
                layout.getReference.withArgs('&reference').returns(reference);

                underTest.registerButton(button);

                expect(() => { button.$el.trigger('keypress', button); } ).to.not.throw();

                expect(testAction.callCount).to.equal(1);
                expect(testAction.getCall(0).args[0]).to.equal(1);
                expect(testAction.getCall(0).args[1]).to.equal('normalArg');
                expect(testAction.getCall(0).args[2]).to.equal(reference);

            });

        });

        describe('correct args', () => {
            it('should call the one action', () => {
                let button = createButton('TestAction', [1, 'normalArg', '&reference']);
                sandbox.spy(button.$el, 'on');

                let reference = {};
                layout.getReference.withArgs('&reference').returns(reference);

                underTest.registerButton(button);

                button.$el.trigger('keypress', button);

                expect(testAction.called).to.equal(true);
                expect(testAction.getCall(0).args[0]).to.equal(1);
                expect(testAction.getCall(0).args[1]).to.equal('normalArg');
                expect(testAction.getCall(0).args[2]).to.equal(reference);
            });

            it('should call both actions', () => {
                let button = createButton('TestAction', [1, 'normalArg', '&reference']);
                button.actions['action2'] = { actionName: 'TestAction', actionArgs: [2, 'secondArg', '&reference']};
                sandbox.spy(button.$el, 'on');

                let reference = {};
                layout.getReference.withArgs('&reference').returns(reference);

                underTest.registerButton(button);

                button.$el.trigger('keypress', button);

                expect(testAction.called).to.equal(true);
                expect(testAction.getCall(0).args[0]).to.equal(1);
                expect(testAction.getCall(0).args[1]).to.equal('normalArg');
                expect(testAction.getCall(0).args[2]).to.equal(reference);

                expect(testAction.getCall(1).args[0]).to.equal(2);
                expect(testAction.getCall(1).args[1]).to.equal('secondArg');
                expect(testAction.getCall(1).args[2]).to.equal(reference);
            });
        });



    });

});