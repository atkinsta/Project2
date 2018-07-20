$(document).ready(function () {
    $(document).on("click", "#home", function () {
        location.href = "/";
    });

    $(document).on("click", "#submitSnippet", function () {
        event.preventDefault();
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

    $(document).on("click", ".langSelect", function () {
        $.ajax({
            url: "/api/snippets/" + $(this).val(),
            method: "GET",
        });
    });

    $(document).on("click", "#submitComment", function () {
        event.preventDefault();
        $.ajax({
            url: "/api/comments",
            method: "POST",
            data: {
                comment: $("#commentText").val().trim(), SnippetId:
                    $("#commentText").data("id")
            }
        }).then(function (newComment) {
            $("#commentText").val("");
            
            var html = "<p>"+ newComment.comment + " - - " + newComment.username + "</p>";
            $("#"+newComment.SnippetId+"").append(html);

        });

    });

    var loginForm = $("form.login");
    loginForm.on("submit", function (event) {
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
            data: newLogin,
        }).then(function (data) {
            window.location.replace(data);
        }).catch(function (err) {
            console.log(err);
        });
    });

    var signupForm = $("form.signup");
    signupForm.on("submit", function (event) {
        event.preventDefault();
        var newUser = {
            username: $("input#newUsername").val().trim(),
            fullName: $("input#newFullname").val().trim(),
            password: $("input#newPassword").val().trim()
        };

        if (!newUser.username || !newUser.password) {
            return;
        }

        $.ajax({
            url: "/api/signup",
            method: "POST",
            data: newUser
        }).then(function (data) {
            window.location.replace(data);
        }).catch(handleLoginErr);
    });

    function handleLoginErr(err) {
        $("#alert .msg").text(err.reponseJSON);
        $("#alert").fadeIn(500);
    }

    $(document).on("click", ".like", function () {
        $.ajax({
            url: "/api/snippets/like/" + $(this).attr("data-id"),
            method: "PUT",
        });
    });
});
