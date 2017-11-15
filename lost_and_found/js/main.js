//base Url
var baseUrl = "http://127.0.0.1:8000/api/";


$(document).ready(function() {
    // Add smooth scrolling to all links in navbar + footer link
    $(".navbar a, footer a[href='#myPage']").on('click', function(event) {
        // Make sure this.hash has a value before overriding default behavior
        if (this.hash !== "") {
            // Prevent default anchor click behavior
            event.preventDefault();

            // Store hash
            var hash = this.hash;

            // Using jQuery's animate() method to add smooth page scroll
            // The optional number (900) specifies the number of milliseconds it takes to scroll to the specified area
            $('html, body').animate({
                scrollTop: $(hash).offset().top
            }, 900, function() {

                // Add hash (#) to URL when done scrolling (default click behavior)
                window.location.hash = hash;
            });
        } // End if
    });



    $(window).scroll(function() {
        $(".slideanim").each(function() {
            var pos = $(this).offset().top;

            var winTop = $(window).scrollTop();
            if (pos < winTop + 600) {
                $(this).addClass("slide");
            }
        });
    });
});



function modalPaddingSettings() {


    var fixedCls = '.navbar-fixed-top,.navbar-fixed-bottom';
    var oldSSB = $.fn.modal.Constructor.prototype.setScrollbar;
    $.fn.modal.Constructor.prototype.setScrollbar = function() {
        oldSSB.apply(this);
        if (this.bodyIsOverflowing && this.scrollbarWidth)
            $(fixedCls).css('padding-right', this.scrollbarWidth);
    }

    var oldRSB = $.fn.modal.Constructor.prototype.resetScrollbar;
    $.fn.modal.Constructor.prototype.resetScrollbar = function() {
        oldRSB.apply(this);
        $(fixedCls).css('padding-right', '');
    }
}


function itemsBoard() {
   
    $.ajax({
        url: baseUrl+"uploads/", // the endpoint
        type: "POST", // http method
        'contentType': 'application/json',
        data: JSON.stringify({
            "offset": 0,
            "limit": 10,
        }), // data sent with the post request
        crossDomain: true,
        // handle a successful response
        success: function(json) {
            $(function() {
                $('#table-board').bootstrapTable({
                    data: json['items']
                });
                $('.fixed-table-loading').html("");
            });
        },

        // handle a non-successful response
        error: function(xhr, errmsg, err) {
          console.log("Couldnt fetch board details");          
        }
    });
}


function SignupForm() {
    $("form#signup-form").submit(function(event) {
        list = $(this).serializeArray();
        var values = {};
        $.each(list, function(i, field) {
            values[field.name] = field.value;
        });
        event.preventDefault();


        $.ajax({
            url: baseUrl+"signup/", // the endpoint
            type: "POST", // http method
            'contentType': 'application/json',
            data: JSON.stringify(values), // data sent with the post request
            crossDomain: true,
            // handle a successful response
            success: function(data) {
                var user = {};
                user.id = data.id;
                user.username = data.username;
                localStorage.setItem("user", JSON.stringify(user));
                window.location.href= "board.html";
            },

            // handle a non-successful response
            error: function(xhr, errmsg, err) {
               
                alert(xhr.responseText);
            }
        });

    });

}





function LoginForm() {
    $("form#login-form").submit(function(event) {
        list = $(this).serializeArray();
        
        var values = {};
        $.each(list, function(i, field) {
            values[field.name] = field.value;
        });
        
        event.preventDefault();


        $.ajax({
            url: baseUrl+"login/", // the endpoint
            type: "POST", // http method
            'contentType': 'application/json',
            data: JSON.stringify(values), // data sent with the post request
            crossDomain: true,
            // handle a successful response
            success: function(data) {
                var user = {};
                user.id = data.id;
                user.username = data.username;
                user.user_type = data.user_type;
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


$(document).ready(function() {
    modalPaddingSettings();
    LoginForm();
    SignupForm();
    itemsBoard();
});