import {findSmallestButGreaterThan} from 'calculator/utils';

describe('utils', () => {

    describe('findSmallestButGreaterThan', () => {

        it('should pass', () => {
            expect(findSmallestButGreaterThan([-2,1,5,7,-1,5], 0)).to.equal(1);
            expect(findSmallestButGreaterThan([-2,-1,-5,-7,-1,-5], 0)).to.equal(0);
            expect(findSmallestButGreaterThan([-1,3,5,6], -1)).to.equal(3);
            expect(findSmallestButGreaterThan([1,-1,2,-1], -1)).to.equal(1);
        });

    });

});