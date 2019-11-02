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


    it('Evitando usar `this`', () => {
        const wrapMethodsToPassAlsoItemProps = (methods, props) => Object.keys(methods).reduce(
            (newMethods, next) => ({...newMethods, [next]: (...args) => methods[next](props, ...args)}),
            {},
        );
        const walk = ({animal}, mode) => {
            return mode ? `${animal} is walking ${mode}` : `${animal} is walking`;
        };

        // const eat = ()

        const petProps = {
            animal: 'dog',
        };

        const petMethods = {
            walk,
        };

        const petFactory = () => {
            return {
                ...petProps,
                ...wrapMethodsToPassAlsoItemProps(petMethods, petProps),
            };
        };

        const dogPet = petFactory();

        expect(dogPet.walk(dogPet.props)).to.equal('dog is walking');
        expect(dogPet.walk()).to.equal('dog is walking');
        expect(dogPet.walk('slowly')).to.equal('dog is walking slowly');
    });

});