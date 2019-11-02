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
            (newMethods, next) => ({...newMethods, [next]: (...args) => methods[next]({...methods, ...props}, ...args)}),
            {},
        );
        const walk = ({animal}, mode) => {
            return mode ? `${animal} is walking ${mode}` : `${animal} is walking`;
        };

        const eat = ({animal}, food) => `${animal} is eating ${food}`;

        const showSkills = (propsAndMethods) => {
            const getMethods = (obj) => Object.getOwnPropertyNames(propsAndMethods).filter(item => typeof obj[item] === 'function');
            const itemSkills = getMethods(propsAndMethods);

            return `${propsAndMethods.animal} can ${itemSkills.toString()}`;
        }

        const petProps = {
            animal: 'dog',
        };

        const petMethods = {
            walk,
            eat,
            showSkills,
        };

        const petFactory = () => {
            return {
                ...petProps,
                ...wrapMethodsToPassAlsoItemProps(petMethods, petProps),
            };
        };

        const dogPet = petFactory();

        expect(dogPet.showSkills()).to.equal('dog can walk,eat,showSkills');
        expect(dogPet.eat('steak')).to.equal('dog is eating steak');
        expect(dogPet.walk(dogPet.props)).to.equal('dog is walking');
        expect(dogPet.walk()).to.equal('dog is walking');
        expect(dogPet.walk('slowly')).to.equal('dog is walking slowly');
    });

});