class FriendClass {

    constructor() {
        this.name = 'Edu';
    }

    introduceHimself() {
        return `Hi, I am ${this.name}`;
    }
}

const friendCreatedWithClass = new FriendClass();

// Create the implementation
const friendCreatedWithFactory = {};

module.exports = {
    friendCreatedWithClass,
    friendCreatedWithFactory,
};