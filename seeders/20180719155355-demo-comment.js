"use strict";

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert("Comment", [{
            comment: "This is totally Awesome!!",
            snippetId: 1,
            userId: 1
        }], {});
        
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete("Comment", null, {});
        
    }
};
