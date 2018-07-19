"use strict";

// eslint-disable
module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert("Users", [{
            username: "userOne",
            fullName: "User One",
            password: "supersecret"
        }], {});
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete("Users", null, {});
    }
};

// eslint-enable