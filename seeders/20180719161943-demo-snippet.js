"use strict";

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert("Snippet", [
            {
                title: "This is code",
                language: "javascript",
                codeBlock: "javascript code code code",
                description: "Some Code",
                UserId: 1
            }, {
                title: "Block of Code",
                language: "c++",
                codeBlock: "some code in C++",
                description: "A block of code",
                UserId: 2
            },
            {
                title: "a Snippet for you",
                language: "java",
                codeBlock: "some java code",
                description: "code snippet",
                UserId: 3
            }
        ], {});
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete("Snippet", null, {});
    }
};
