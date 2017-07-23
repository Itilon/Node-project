const BaseData = require('./base/base.data');
const User = require('../models/user.model');

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

class UsersData extends BaseData {
    constructor(db) {
        super(db, User);
    }

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
    }

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
    }

    checkPassword(username, password) {
        this.collection.findOne({
            username,
        })
        .then((user) => {
            if (!user) {
                throw Error('No such user');
            }
            if (user.password !== password) {
                throw Error('Invalid password');
            }
            return true;
        });
    }
}

module.exports = UsersData;
