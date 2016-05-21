import sinon from 'sinon';

import EventApi from 'calculator/lib/event/EventApi';


describe ('Event Api', () => {

    let underTest;

    beforeEach(() => {
        underTest = new EventApi();
    });

    describe('Event triggering', () => {

        it('should not trigger function with a different event name that does not exist', () => {
            let changeStub = sinon.stub();
            underTest.on("change", changeStub);

            underTest.trigger('add');

            expect(changeStub.called).to.equal(false);
        });

        it('should not trigger function with a different event name that does exists', () => {
            let changeStub = sinon.stub();
            underTest.on("change", changeStub);

            let addStub = sinon.stub();
            underTest.on("add", addStub);

            underTest.trigger('add');

            expect(changeStub.called).to.equal(false);
            expect(addStub.called).to.equal(true);
        });

        it('should trigger functions with same event name and pass arguments', () => {
            let changeStub = sinon.stub();
            let changeStub2 = sinon.stub();
            underTest.on("change", changeStub);
            underTest.on("change", changeStub2);

            underTest.trigger('change', 4, 5);

            expect(changeStub.getCall(0).args).to.eql([4,5]);
            expect(changeStub.callCount).to.equal(1);
            expect(changeStub2.getCall(0).args).to.eql([4,5]);
            expect(changeStub2.callCount).to.equal(1);
        });

        it('should run functions in the context given', () => {

            let changeObj ={
                change: function(){ expect(this.value).to.equal(5); },
                change2: function(){ expect(this.value).to.equal(50); }
            };

            sinon.spy(changeObj, "change");
            sinon.spy(changeObj, "change2");

            let changeContext = {value:5};
            let changeContext2 = {value:50};
            underTest.on("change", changeObj.change, changeContext);
            underTest.on("change", changeObj.change2, changeContext2);

            underTest.trigger('change', 4, 5);

            expect(changeObj.change.callCount).to.equal(1);
            expect(changeObj.change2.callCount).to.equal(1);
        });

    });

});