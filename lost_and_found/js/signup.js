//base Url

var baseUrl = "http://127.0.0.1:8000/api/";


function signupForm() {
    console.log("worling");
    $("form#signup-form").submit(function(event) {
        console.log("a");
        list = $(this).serializeArray();
        var values = {};
        $.each(list, function(i, field) {
            values[field.name] = field.value;
        });
        event.preventDefault();
        checkPasswordsMatch(values);
        let headers = new Headers();
        headers.append('Access-Control-Allow-Origin', 'http://localhost:8000');
  headers.append('Access-Control-Allow-Credentials', 'true');

        $.ajax({
            url: baseUrl+"signup/", // the endpoint
            type: "POST", // http method
            'contentType': 'application/json',
            data: JSON.stringify(values), // data sent with the post request
           
            headers: headers,
            // handle a successful response
            success: function(data) {

                var user = {};
                user.id = data.id;
                user.username = data.username;
                user.user_type = "teacher";
                localStorage.setItem("user", JSON.stringify(user));

                window.location.href = "board.html";
            },

            // handle a non-successful response
            error: function(xhr, errmsg, err) {
               
                alert(xhr.responseText);
            }
        });

    });

}



function loginForm() {
    $("form#login-form").submit(function(event) {
        list = $(this).serializeArray();
        console.log(list);
        var values = {};
        $.each(list, function(i, field) {
            values[field.name] = field.value;
        });
        console.log(values);
        event.preventDefault();
        checkPasswordsMatch(values);

        $.ajax({
            url: baseUrl+"quizzo/student/login/", // the endpoint
            type: "POST", // http method
            'contentType': 'application/json',
            data: JSON.stringify(values), // data sent with the post request
            crossDomain: true,
            // handle a successful response
            success: function(data) {
                var user = {};
                user.id = data.id;
                user.username = data.username;
                user.user_type = "student";
                localStorage.setItem("user", JSON.stringify(user));
                window.location.href = "board.html";
            },

            // handle a non-successful response
            error: function(xhr, errmsg, err) {
               
                alert(xhr.responseText);
            }
        });

    });
}


function checkPasswordsMatch(values){
     if(values['password']!=values['password1']){
          alert("passswords doesnot match");
          return;
        }
}

$(document).ready(function() {

    $('.personal-info > div').hide();
    loginForm();
    signupForm();
});