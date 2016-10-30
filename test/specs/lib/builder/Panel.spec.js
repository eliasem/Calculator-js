import Panel from 'calculator/lib/builder/Panel';

describe('Panel', () => {

    var underTest;

    describe('creation', () => {
        it('should create the $el element', () =>{
            underTest = new Panel();

            expect(underTest.$el.hasClass('displayNone')).to.equal(true);
        });

        it('should use given className', () => {
            underTest = new Panel({ className: 'class'});

            expect(underTest.$el.hasClass('class')).to.equal(true);
        });
    });

    describe('events', () => {

        it('should add class displayNone when clicked', () => {
            underTest = new Panel();
            underTest.$el.removeClass('displayNone');

            expect(underTest.$el.hasClass('displayNone')).to.equal(false);
            underTest.$el.trigger('click');
            expect(underTest.$el.hasClass('displayNone')).to.equal(true);
        });

    });

});