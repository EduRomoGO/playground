function introduceHimself () {
    return `Hi, I am ${this.name}`;    
}

// When adding methods dinamically you have to use the prototype

class FriendClass {

    constructor() {
        this.name = 'Edu';
    }
    
}

FriendClass.prototype.introduceHimself = introduceHimself;
const friendCreatedWithClass = new FriendClass();
// friendCreatedWithClass.introduceHimself = introduceHimself;


const friendFactory = () => {
    return {
        name: 'Edu',
        introduceHimself,
    };
};

// Create the implementation
const friendCreatedWithFactory = friendFactory();

// Ambas soluciones estan basadas en la programacion orientada a objetos,
// por lo que el uso del this es casi inevitable. Pero podria haber una
// alternativa. Ver en refactor.test.js ejemplo de como hacerlo. Habría
// que evaluar si esa alternativa merece la pena o no



module.exports = {
    introduceHimself,
    friendCreatedWithClass,
    friendCreatedWithFactory,
};