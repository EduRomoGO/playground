const chai = require('chai');
const expect = chai.expect;

describe('prototypal inheritance', () => {
    
    it('delegate prototype', () => {
        const walk = () => 'im walking';
        const fly = () => 'im flying';
        const cuack = () => 'cuack';
        const breath = () => 'im breathing';

        const animalFactory = () => ({breath});

        const myAnimal = animalFactory();

        const duckFactory = () => ({...Object.create(myAnimal), cuack, fly, walk});
        
        const someDuck = duckFactory();
        
        expect(someDuck.cuack()).to.equal('cuack');
    });

    it('concatenative inheritance', () => {
        const horn = () => 'pi piii';
        const carProto = { wheels: 4, doorOptions: [3, 5]};

        const ferrariFactory = () => ({...carProto, brand: 'ferrari', horn});
    });
})
