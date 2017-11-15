   baseUrl = "http://127.0.0.1:8000/api/";
 $(document).ready(function() {
  
     var test = localStorage.getItem("user-profile-info");
     var user = JSON.parse(test);
  
     $('a#name').html('<span class="glyphicon glyphicon-user"></span>  ' + user.username);
     $('a#logout').click(function() {
         window.location.href = "index.html";
         localStorage.clear();
     });

     $('input#first_name').val(user.first_name);
     $('input#last_name').val(user.last_name);
     $('input#username').val(user.username);
     $('input#email').val(user.email);
     $('input#school').val(user.school);
     $('input#city').val(user.city);
      
     if(user.user_type=="student"){
      $('input#standard').val(user.standard);
     }
     else{
      $('div#standard').hide();
     }
     
      studentProfileForm(user.username);
      teacherProfileForm(user.username);
 });

 function studentProfileForm(username) {
    var username = username;
    $("form#profile-form").submit(function(event) {
        list = $(this).serializeArray();
        var values = {};
        $.each(list, function(i, field) {
            values[field.name] = field.value;
        });
        event.preventDefault();
        check = checkPasswordsMatch(values);
        if(check==false){return;}
        $.ajax({
            url: baseUrl+"member/"+username+"/profile/update/", // the endpoint
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

                console.log(localStorage.getItem('user'));
                alert("profile Updated successfully");
                window.location.href = "board.html";
            },

            // handle a non-successful response
            error: function(xhr, errmsg, err) {
              
                alert(xhr.responseText);
            }
        });

    });

}

function teacherProfileForm(username) {
    var username =username;
    $("form#profile-form").submit(function(event) {
        list = $(this).serializeArray();
        var values = {};
        $.each(list, function(i, field) {
            values[field.name] = field.value;
        });
        event.preventDefault();
        checkPasswordsMatch(values);

        $.ajax({
            url: baseUrl+"quizzo/teacher/"+username+"signup/", // the endpoint
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

                window.location.href = "competition.html";
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
          return false;
        }
      else{
        return true;
      }
}
