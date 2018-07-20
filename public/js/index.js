$(document).ready(function() {
    $(document).on("click", "#home", function() {
        location.href = "/";
    });

    // $(document).on("click", "#makeSnippet", function() {
    //     $("#makeSnippetModal").modal("show");
    // });

    $(document).on("click", "#submitSnippet", function() {
        event.preventDefault();
        let newSnippet = {
            title: $("#title")
                .val()
                .trim(),
            language: $("#myDropdown").val(),
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

    $(document).on("click", ".langSelect", function() {
        $.ajax({
            url: "/api/snippets/" + $(this).val(),
            method: "GET"
        });
    });

    $(document).on("click", "#submitComment", function() {
        event.preventDefault();
        $.ajax({
            url: "/api/comments",
            method: "POST",
            data: {
                comment: $("#commentContent")
                    .val()
                    .trim(),
                SnippetId: $(this)
                    .parent()
                    .attr("data-snipId")
            }
        });
    });

    var loginForm = $("form.login");
    loginForm.on("submit", function(event) {
        event.preventDefault();
        var newLogin = {
            username: $("input#userField").val().trim(),
            password: $("input#passwordField").val().trim()
        };

        if (!newLogin.username || !newLogin.password) {
            return;
        }

        $.ajax({
            url: "/api/login",
            method: "POST",
<<<<<<< HEAD
            data: newLogin
=======
            data: newLogin,
        }).then(function(data) {
            window.location.replace(data);
        }).catch(function(err) {
            console.log(err);
>>>>>>> e700f4f555cf9c6cf7fe8dec11462f1010326711
        });
    });

    var signupForm = $("form.signup");
    signupForm.on("submit", function(event) {
        event.preventDefault();
        var newUser = {
<<<<<<< HEAD
            username: $("#newUsername")
                .val()
                .trim(),
            fullName: $("#newFullname")
                .val()
                .trim(),
            password: $("#newPassword")
                .val()
                .trim()
=======
            username: $("input#newUsername").val().trim(),
            fullName: $("input#newFullname").val().trim(),
            password: $("input#newPassword").val().trim()
>>>>>>> e700f4f555cf9c6cf7fe8dec11462f1010326711
        };

        if (!newUser.username || !newUser.password) {
            return;
        }

        $.ajax({
            url: "/api/signup",
            method: "POST",
            data: newUser
<<<<<<< HEAD
        });
        location.href = "/signup";
=======
        }).then(function(data) {
            window.location.replace(data);
        }).catch(handleLoginErr);
>>>>>>> e700f4f555cf9c6cf7fe8dec11462f1010326711
    });

    function handleLoginErr(err) {
        $("#alert .msg").text(err.reponseJSON);
        $("#alert").fadeIn(500);
    }

    $(document).on("click", ".like", function() {
        $.ajax({
            url: "/api/snippets/like/" + $(this).attr("data-id"),
            method: "PUT"
        });
    });
});
