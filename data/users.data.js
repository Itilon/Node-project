const BaseData = require('./base/base.data');
const User = require('../models/user.model');
const { ObjectID } = require('mongodb');

class UsersData extends BaseData {
    constructor(db) {
        super(db, User, User);
    }

    findByUsername(username) {
        return this
            .filterBy({
                username: new RegExp(username, 'i'),
            })
            .then(([user]) => user);
    }

    checkPassword(username, password) {
        return this.findByUsername(username)
            .then((user) => {
                if (!user) {
                   return Promise.reject('Invalid user');
                }

                if (user.password !== password) {
                   return Promise.reject('Invalid password');
                }

                return true;
            });
    }

    updateById(model, value) {
        // eslint-disable-next-line new-cap
        value._id = ObjectID(value._id);

        return this.collection.updateOne(
            { _id: model._id },
            { $push:
                {
                    posts:
                    {
                        $each: [value],
                        $position: 0,
                    },
                },
            },
            model);
    }
}

module.exports = UsersData;
