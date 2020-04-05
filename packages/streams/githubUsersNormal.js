import axios from './node_modules/axios';

export const loadUsers = async () => {
    const users = await axios.get('https://api.github.com/users');

    console.log(users.data.length);
}