const chai = require('chai');

const expect = chai.expect;

describe('scope-context', () => {

    it('loses the scope of `this` when it is used inside of a function that is contained inside of another function', () => {
        const painter = {
            owner: 'Jose',
            paint: function paintHouse() {
                function paintRoof(msg) {
                    return `${msg} and im painting the roof of ${this.owner}'s house`;
                }

                return paintRoof(`im painting ${this.owner} house`);
            }
        }

        expect(painter.paint()).to.equal(`im painting Jose house and im painting the roof of undefined's house`);
    });

    // it('we can use bind to `Function.prototype.bind` to bind `this` to paintRoof')

});