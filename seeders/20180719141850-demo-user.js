"use strict";

// eslint-disable
module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert("Users", [
            {
                username: "userOne",
                fullName: "User One",
                password: "supersecret"
            }, {
                username: "userTwo",
                fullName: "User Two",
                password: "supersecret2"
            }
        ], {});
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete("Users", null, {});
    }
};

// eslint-enable