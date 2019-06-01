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


    it.only('Intentando evitar el this', () => {
        const walk = ({animal}) => `${animal} is walking`; 

        const petProps = {
            animal: 'dog',
        };

        const petMethods = {
            walk,
        };

        const wrappedPetMethods = Object.keys(petMethods).reduce(
            (acc, next) => {
                acc[next] = (...args) => petMethods[next](...args, petProps);
                return acc;
            },
            {},
        );

        const petFactory = () => {
            return {
                props: petProps,
                ...wrappedPetMethods,
            }
        };

        const dogPet = petFactory();

        expect(dogPet.walk(dogPet.props)).to.equal('dog is walking');
        expect(dogPet.walk()).to.equal('dog is walking');
    });

});