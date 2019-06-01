class FriendClass {

    constructor() {
        this.name = 'Edu';
    }

    introduceHimself() {
        return `Hi, I am ${this.name}`;
    }
}

const friendCreatedWithClass = new FriendClass();


// TODO: solution
const friendFactory = () => {
    return {
        name: 'Edu',
        introduceHimself: function () {
            return `Hi, I am ${this.name}`;
        },
    };
};

// Create the implementation
const friendCreatedWithFactory = friendFactory();

module.exports = {
    friendCreatedWithClass,
    friendCreatedWithFactory,
};