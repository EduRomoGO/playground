// 'use strict';

const chai = require('chai');

const expect = chai.expect;

describe('scope-context', () => {
    this.owner = 'global scope owner';
    const painter = {
        owner: 'Jose',
        paint: function paintHouse() {
            function paintRoof(msg) {
                return `${msg} and im painting the roof of ${this.owner}'s house`;
            }

            return paintRoof(`im painting ${this.owner} house`);
        }
    }

    it('loses the scope of `this` when it is used inside of a function that is contained inside of another function', () => {
        expect(painter.paint()).to.equal(`im painting Jose house and im painting the roof of undefined's house`);
    });

    // Seems that `use strict` is implemented by default in node after a determined version
    it('when is lost, `this` points to global space, if not in `strict mode`, in strict mode `this` is `undefined`', () => {
        expect(painter.paint()).to.equal(`im painting Jose house and im painting the roof of undefined's house`);
    });

    it('we can use `Function.prototype.bind` to bind `this` to paintRoof', () => {
        painter.paint = function paintHouse() {
            function paintRoof(msg) {
                return `${msg} and im painting the roof of ${this.owner}'s house`;
            }

            // Create a new function with `this` bound to it
            const boundPaintRoof = paintRoof.bind(this);

            return boundPaintRoof(`im painting ${this.owner} house`);
        };

        expect(painter.paint()).to.equal(`im painting Jose house and im painting the roof of Jose's house`);
    });
});