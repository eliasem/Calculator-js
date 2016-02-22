import sinon from 'sinon';

import Button from 'calculator/lib/Button';

describe('Button', () => {
    let underTest;

    beforeEach(() => {
        underTest = new Button('id', {});
    });

    it('should trigger keypress event when clicked', () => {
        let stub = sinon.stub();

        underTest.$el.on('keypress', stub);

        underTest.$el.trigger('click');

        expect(stub.called).to.equal(true);
    });
});