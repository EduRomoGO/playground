const chai = require('chai');
const expect = chai.expect;


describe('exercises (all the data passed to functions comes from data.js file, unless explicitly stated on the test)', () => {

    describe('basics', () => {
        // suggestion: use map
        xit('return a new array greeting all names', () => {
            expect(greetAll(names)).to.deep.equal(['hi juan', 'hi ivan', 'hi jose', 'hi sebas', 'hi miguel', 'hi ricardo', 'hi edu']);
        });
    });

});