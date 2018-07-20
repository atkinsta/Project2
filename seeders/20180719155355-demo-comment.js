"use strict";

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert("Comment", [{
            comment: "This is totally Awesome!!",
            SnippetId: 1,
            UserId: 1
        },{
            comment: "I love this I've been trying to do this forever!",
            SnippetId: 1,
            UserId: 2
        },{
            comment: "Can't wait to try this at home!",
            SnippetId: 2,
            UserId: 3
        },{
            comment: "Sweet!",
            SnippetId: 2,
            UserId: 1
        },{
            comment: "I wish I could code like this!",
            SnippetId: 3,
            UserId: 2
        }
        ], {});
        
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete("Comment", null, {});
        
    }
};
