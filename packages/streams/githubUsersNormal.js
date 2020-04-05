import axios from './node_modules/axios';

const fetchUsers = async () => {
    const offset = Math.floor(Math.random() * Math.floor(500));
    const { data: users } = await axios.get(`https://api.github.com/users?since=${offset}`);

    return users;
}

const getRandomUser = users => {
    return users[Math.floor(Math.random() * users.length)];
}

export const loadUsers = async () => {
    const users = await fetchUsers();

    const user1 = getRandomUser(users)
    const user2 = getRandomUser(users)

    const fillData = (user, number) => {
        const userNode = document.querySelector(`.user${number}`);

        userNode.querySelector('img').src = user ? user.avatar_url : ''
        userNode.querySelector('.name').textContent = user ? user.login : ''
    }
    
    document.querySelector('button').addEventListener('click', async () => {
        const users = await fetchUsers();

        fillData(null, 1)
        fillData(null, 2)    

        setTimeout(() => {
            const user1 = getRandomUser(users)
            const user2 = getRandomUser(users)
        
            fillData(user1, 1)
            fillData(user2, 2)    
        }, 300);
    });

    [...document.querySelectorAll('span')].map(n => n.addEventListener('click', async (event) => {
        const users = await fetchUsers();

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