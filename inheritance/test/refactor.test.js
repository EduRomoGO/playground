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


    it.only('Evitando usar `this`', () => {
        const walk = ({animal}, mod) => {
            return mod ? `${animal} is walking ${mod}` : `${animal} is walking`;
        } 

        const petProps = {
            animal: 'dog',
        };

        const petMethods = {
            walk,
        };

        const wrappedPetMethods = Object.keys(petMethods).reduce(
            (acc, next) => {
                acc[next] = (...args) => petMethods[next](petProps, ...args);
                return acc;
            },
            {},
        );

        const petFactory = () => {
            return {
                ...petProps,
                ...wrappedPetMethods,
            }
        };

        const dogPet = petFactory();

        expect(dogPet.walk(dogPet.props)).to.equal('dog is walking');
        expect(dogPet.walk()).to.equal('dog is walking');
        expect(dogPet.walk('slowly')).to.equal('dog is walking slowly');
    });

});