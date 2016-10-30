import Referencable from 'calculator/lib/behaviours/Referencable';

describe('Referencable', () => {
    it('should return the correct reference', () => {
        var context = {a:4, '$ab': 7};
        expect(Referencable.prototype.getReference.call(context, '&a')).to.equal(context.a);
        expect(Referencable.prototype.getReference.call(context, '&ab')).to.equal(context['$ab']);
        expect(Referencable.prototype.getReference.call(context, '&b')).to.equal(undefined);
    });
});