DROP DATABASE IF EXISTS project2_db;
CREATE DATABASE project2_db;
USE project2_db;

INSERT INTO Users (username, fullName, password)
VALUES ("JMill", "Jason Miller", "JMPassword"), 
("Marlee", "Mary Ann Lee", "MALPassword"), 
("KimiChan", "Kimber Woods", "KWPassword"), 
("Xander", "Alexander Jones", "AJPassword");

INSERT INTO Snippets (title, language, codeBlock, description, UserId)
VALUES ("code", "Javascript", "// Add new meme from user input in search box
$('#searchButton').on('click', function(event) {
    event.preventDefault();
    var newMeme = $('#searchBox').val().trim();
    topics.push(newMeme);
    renderButtons();
    $('#searchBox').val('');
})", "Add a button based on text input from search box using jQuery", 3);

INSERT INTO Comments (comment, username, SnippetId, UserId)
VALUES ("Awesome", "KimiChan", 1, 3), ("Love it", "Marlee", 1, 2);