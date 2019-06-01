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


// TODO: solution
const friendFactory = () => {
    return {
        name: 'Edu',
        introduceHimself,
    };
};

// Create the implementation
const friendCreatedWithFactory = friendFactory();

module.exports = {
    friendCreatedWithClass,
    friendCreatedWithFactory,
};