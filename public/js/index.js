$(document).ready(function() {
    $(document).on("click", "#home", function() {
        location.href = "/home";
    });

    $(document).on("click", "#logoff", function() {
        location.href = "/logout";
    });

    // POST to submit new snippet
    $(document).on("click", "#submitSnippet", function() {
        event.preventDefault();
        let newSnippet = {
            title: $("#title")
                .val()
                .trim(),
            language: $("#languageOptions").val(),
            codeBlock: $("#codeBlock").val(),
            description: $("#description").val()
        };

        $.ajax({
            url: "/api/snippets",
            method: "POST",
            data: newSnippet
        }).then(function() {
            location.reload();
        });
    });

    // GET to get filtered languages
    $(document).on("click", ".langSelect", function() {
        location.href = "/snippets/" + $(this).val();
    });

    // POST new comment on submitComment button click
    $(document).on("click", ".submitComment", function() {
        event.preventDefault();

        // Nav parent/children to get comment text for specific Snippet
        var commentP = $(this).parent();
        var commentC = commentP.children();
        var commentCC = commentC.children(".commentText");
        var commentText = commentCC.val();
        var id = $(this).data("id");

        console.log("comment: ", commentText, " -- id: ", id);

        $.ajax({
            url: "/api/comments",
            method: "POST",
            data: {
                comment: commentText,
                SnippetId: id
            }
        }).then(function(newComment) {
            $(".commentText").val("");

            var html =
        "<p>" + newComment.comment + " - - " + newComment.username + "</p>";
            $("#" + newComment.SnippetId + "").append(html);
        });
    });

    // login form
    var loginForm = $("form.login");
    loginForm.on("submit", function(event) {
        event.preventDefault();
        var newLogin = {
            username: $("input#userField")
                .val()
                .trim(),
            password: $("input#passwordField")
                .val()
                .trim()
        };

        if (!newLogin.username || !newLogin.password) {
            return;
        }

        $.ajax({
            url: "/api/login",
            method: "POST",
            data: newLogin
        })
            .then(function(data) {
                window.location.replace(data);
            })
            .catch(function(err) {
                handleLoginErr(err, "Invalid username or password.");
            });
    });

    // signup form
    var signupForm = $("form.signup");
    signupForm.on("submit", function(event) {
        event.preventDefault();
        var newUser = {
            username: $("input#newUsername")
                .val()
                .trim(),
            fullName: $("input#newFullname")
                .val()
                .trim(),
            password: $("input#newPassword")
                .val()
                .trim()
        };

        if (!newUser.username || !newUser.password) {
            return;
        }

        $.ajax({
            url: "/api/signup",
            method: "POST",
            data: newUser
        })
            .then(function(data) {
                if (data.errors) {
                    handleLoginErr(data.errors, "That username is already taken!");
                }
                else {
                    window.location.replace(data);
                }
            })
            .catch(function(err) {
                handleLoginErr(err, "That username is taken!")
            });
    });

    function handleLoginErr(err, text) {
        console.log(err);
        $("#alert .msg").text(text);
        $("#alert").fadeIn(500);
    }

    // Open snippet modal
    $(document).on("click", "#makeSnippet", function() {
        $("#makeSnippetModal").show();
    });
});
