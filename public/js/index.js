$(document).ready(function () {
    $(document).on("click", "#home", function () {
        location.href = "/home";
    });

    $(document).on("click", "#submitSnippet", function () {
        event.preventDefault();
        let newSnippet = {
            title: $("#title").val().trim(),
            language: $("#languageOptions").val(),
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
        }).then(function (data) {
            console.log(data);
            
        });
    });

    $(document).on("click", ".submitComment", function () {
        event.preventDefault();

    
        var commentP = $(this).parent();
        var commentC = commentP.children();
        var commentCC = commentC.children(".commentText");
        var commentText = commentCC.val();
        var id = $(this).data("id");
        

        console.log("comment: ", commentText, " -- id: ", id);

        $.ajax({
            url: "/api/comments",
            method: "POST",
            data: 
            {
                comment: commentText, 
                SnippetId: id
            }
        }).then(function (newComment) {
            $(".commentText").val("");
            
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

   

    $(document).on("click", "#makeSnippet", function () {
        $("#makeSnippetModal").show();
    });


});