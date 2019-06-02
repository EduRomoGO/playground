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

        it('prototype is shared between objects created by same constructor function', () => {
            //Create an empty constructor function
            function Person(){
            }

            //Add property name, age to the prototype property of the Person constructor function
            Person.prototype.name = "Edu" ;
            Person.prototype.age = 26;

            //Create objects using the Person constructor function
            var person1= new Person();
            var person2 = new Person();

            expect(person1.prototype).to.equal(person2.prototype);
        });
        
        it('any modification to prototype props affect every object having this prototype', () => {
            //Create an empty constructor function
            function Person(){
            }
            //Add property name, age to the prototype property of the Person constructor function
            Person.prototype.name = "Edu" ;
            Person.prototype.age = 26;
            Person.prototype.friends = ['Juanmi'] //Arrays are of reference type in JavaScript

            //Create objects using the Person constructor function
            var person1 = new Person();
            var person2 = new Person();

            // Add a new element to the friends array. Here you are not modifying the reference
            person1.friends.push("Alejandro");

            expect(person1.friends).to.equal(person2.friends);

            // Here the reference is modified, so friends prototype property is not affected. Instead a property friends is created inside person1
            person1.friends = [...person1.friends, 'Edu'];

            expect(person1.hasOwnProperty('friends')).to.be.true;
            expect(person1.friends).to.deep.equal(['Juanmi', 'Alejandro', 'Edu']);
            expect(person2.friends).to.deep.equal(['Juanmi', 'Alejandro']);
        });
        
    });

});