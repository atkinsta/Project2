$(document).ready(function() {
    $(document).on("click", "#home", function() {
        location.href = "/";
    });

    $(document).on("click", "#submitSnippet", function() {
        let newSnippet = {
            title: $("#title").val().trim(),
            language: $("#myDropdown").val(),
            codeBlock: $("#codeBlock").val(),
            description: $("#description").val(),
        };

        $.ajax({
            url: "/api/snippets",
            method: "POST",
            data: newSnippet
        }).then(function () {
            location.reload();
        });
    });

    $(document).on("click", ".langSelect", function() {
        $.ajax({
            url: "/api/snippets/" + $(this).val(),
            method: "GET",
        });
    });

    $(document).on("click", "#submitComment", function() {
        $.ajax({
            url: "/api/comments",
            method: "POST",
            data: {comment: $("#commentContent").val().trim(), SnippetId: $(this).parent().attr("data-snipId")}
        });
    });

    $(document).on("click", "#login", function() {
        var newLogin = {
            username: $("#userField").val(),
            password: $("#passwordField").val()
        };

        $.ajax({
            url: "/api/login",
            method: "POST",
            data: newLogin,
        });
    });

    $(document).on("click", "#signup", function() {
        var newUser = {
            username: $("#newUsername").val().trim(),
            fullName: $("#newFullname").val().trim(),
            password: $("#newPassword").val().trim()
        };

        $.ajax({
            url: "/api/signup",
            method: "POST",
            data: newUser
        });
    });

    $(document).on("click", ".like", function() {
        $.ajax({
            url: "/api/snippets/like/" + $(this).attr("data-id"),
            method: "PUT",
        });
    });
});
