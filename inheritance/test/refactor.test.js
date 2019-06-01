const chai = require('chai');
const expect = chai.expect;

const { friendCreatedWithClass, friendCreatedWithFactory } = require('../src/refactor.js');

describe('refactor', () => {

    describe('from class to factory', () => {
        it('should work', () => {
            expect(friendCreatedWithClass.introduceHimself()).to.equal(`Hi, I am ${friendCreatedWithClass.name}`);
            expect(friendCreatedWithFactory.introduceHimself()).to.equal(`Hi, I am ${friendCreatedWithClass.name}`);
            expect(friendCreatedWithClass.introduceHimself()).to.equal(friendCreatedWithFactory.introduceHimself());
        });
    });

});