-- In Progress - Do Not Use

USE project2_db;

INSERT INTO User (username, fullName, password)
VALUES ("JMill", "Jason Miller", "JMPassword"), 
("Marlee", "Mary Ann Lee" "MALPassword"), 
("KimiChan", "Kimber Woods", "KWPassword"), 
("Xander", "Alexander Jones", "AJPassword");

INSERT INTO Snippet (title, language, codeBlock, description)
VALUES ("HTML:5", "Javascript", "// Add new meme from user input in search box
$('#searchButton').on('click', function(event) {
    event.preventDefault();
    var newMeme = $('#searchBox').val().trim();
    topics.push(newMeme);
    renderButtons();
    $('#searchBox').val('');
})", "Add a button based on text input from search box using jQuery");