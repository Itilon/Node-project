const userList = [{
    id: 1,
    username: 'Pesho',
    password: '123456',
},
{
    id: 2,
    username: 'Gosho',
    password: '1',
}];

const users = {
    findById(id) {
        id = parseInt(id, 10);
        const user = userList.find((u) => u.id === id);
        return new Promise((resolve, reject) => {
            if (!user) {
                reject('No such User');
            } else {
                resolve(user);
            }
        });
    },

    findByUsername(username) {
        const usernameToLower = username.toLowerCase();
        const user = userList.find((u) => u.username
            .toLowerCase() === usernameToLower);
        return new Promise((resolve, reject) => {
            if (!user) {
                reject('No such User');
            } else {
                resolve(user);
            }
        });
    },
};

module.exports = {
    users,
};
