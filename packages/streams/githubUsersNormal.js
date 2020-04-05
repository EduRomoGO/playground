import axios from './node_modules/axios';

export const loadUsers = async () => {
    const { data: users } = await axios.get('https://api.github.com/users');

    const getRandomUser = users => {
        return users[Math.floor(Math.random() * users.length)];
    }

    const user1 = getRandomUser(users)
    const user2 = getRandomUser(users)

    const fillData = (user, number) => {
        const userNode = document.querySelector(`.user${number}`);

        userNode.querySelector('img').src = user ? user.avatar_url : ''
        userNode.querySelector('.name').textContent = user ? user.login : ''
    }
    
    document.querySelector('button').addEventListener('click', () => {
        fillData(null, 1)
        fillData(null, 2)    

        setTimeout(() => {
            const user1 = getRandomUser(users)
            const user2 = getRandomUser(users)
        
            fillData(user1, 1)
            fillData(user2, 2)    
        }, 300);
    });

    [...document.querySelectorAll('span')].map(n => n.addEventListener('click', (event) => {
        fillData(null, event.target.dataset.id)
        setTimeout(() => {
            const user = getRandomUser(users)
    
            fillData(user, event.target.dataset.id)
        }, 300);
    }))

    fillData(user1, 1)
    fillData(user2, 2)

    console.log(user1)
    console.log(user2)
}