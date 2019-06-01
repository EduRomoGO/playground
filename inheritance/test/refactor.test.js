const chai = require('chai');
const expect = chai.expect;

const { objectCreatedWithClass } = require('../src/refactor.js');


describe('refactor', () => {

    describe('from class to factory', () => {
        xit('works', () => {
            expect(objectCreatedWithClass.greet()).to.equal(`hola ${objectCreatedWithClass.name}`);
        });
    });

});