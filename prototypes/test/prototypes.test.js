const chai = require('chai');

const expect = chai.expect;

describe('prototypes', () => {

    describe('function prototype', () => {
        it('no se puede acceder a un metodo del prototye de una funcion constructora a traves de dicha funcion', () => {
            function Stadium (name) {
                this.name = name;
            };
    
            Stadium.prototype.createMatch = (visitor) => console.log(`Valencia against ${visitor}`);
            try {
                Stadium.createMatch('celta');
            } catch (error) {
                expect(error.message).to.equal('Stadium.createMatch is not a function');
            }
        }); 
   
        it('los objetos creados con una funcion constructora pueden acceder a los metodos y propiedades del prototype de dicha funcion constructora', () => {
            function Stadium (name) {
                this.name = name;
            };
    
            Stadium.prototype.createMatch = (visitor) => `Valencia against ${visitor}`;
            
            const mestalla = new Stadium('mestalla');
            
            expect(mestalla.createMatch('celta')).to.equal('Valencia against celta');
        });    
    });

});