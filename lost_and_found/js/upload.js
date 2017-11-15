 baseUrl = "http://127.0.0.1:8000/api/";
        var test = localStorage.getItem("user");
        user = jQuery.parseJSON(test);
    $('form').submit(function(e) {
        console.log('working');
        
        var formData = new FormData($(this));
       formData.append('image',$('#image')[0].files[0]);
        list = $(this).serializeArray();
        
        var values = {};
        $.each(list, function(i, field) {
          values[field.name] = field.value;
         //    console.log(field.name,field.value);
         // formData.append(field.name,field.value);
        });
        //values['item_image'] = image;
        console.log(values);
        $.ajax({
            url: "http://127.0.0.1:8000/api/check/"+user.username+'/'+values['item_name']+'/'+values['item_category']+'/upload/',
            type: $(this).attr('method'),
            data: formData,
               contentType: false,
            processData:false,
            success: function(data) { 
                console.log(data);
                //window.location.href='success.html';
            }
        });
        e.preventDefault();
    });
     function startRenderTable() {
     var position = 1;
     var limit = 10;
     var offset = 0;
     var total;
     $('#previous-button').click(function() {
         if (position != 1 & limit >0 & offset>0) {

             position--;
             offset -= 10;
             limit -= 10;
             renderTable(offset, limit);
             position--;
             $('#next-button').show();
         }
     });

     $('#next-button').click(function() {
         position++;
         console.log("total" + total);
         console.log("limit" + limit);
         if (limit > total) {
             limit = total;
             offset += 10;
             renderTable(offset, limit);
             $(this).hide();
         }

          else {
             limit += 10;
             offset += 10;
             renderTable(offset, limit);
         }
     });

 }
   function renderTable(offset, limit) {
    var test = localStorage.getItem("user");
        user = jQuery.parseJSON(test);
        console.log(user.username)
            $.ajax({
                url: baseUrl+  user.username + "/uploads/",
                'contentType': 'application/json',
                method: "POST",
                data: JSON.stringify({
                    "offset": offset,
                    "limit": limit
                }), // data sent with the post request
                crossDomain: true,
                // handle a successful response
                success: function(data) {
                    console.log(data);
                    total = data.total;
                    var table = $('table#table-quizboard tbody');
                    table.html('');
                    items = data.items;
                    for (obj in items) {
                        var forhtml = '<tr>';
                        
                        forhtml += "<td>" + items[obj].id + "</td>";
                        forhtml += "<td>" + items[obj].item_name + "</td>";
                        forhtml += "<td>" + items[obj].item_category + "</td>";
                        url = "http://127.0.0.1:8000"+ items[obj].item_image;
                        console.log(url);
                        forhtml += "<td><a href="+url+" target='_blank'>image</a></td>";
                         forhtml += '</tr>';
                        table.append(forhtml);

                    }
                   
                },

                // handle a non-successful response
                error: function(xhr, errmsg, err) {
                    alert("Couldnt fetch leaderboard details"); // provide a bit more info about the error to the console

                }
            });

        }
        $("a#name").click(function(event) {
            var test = localStorage.getItem("user");
            user = jQuery.parseJSON(test);
            data = {
                "id": user.id,
                "username": user.username
            };
            $.ajax({
                url: baseUrl+"profile/", // the endpoint
                type: "POST", // http method
                'contentType': 'application/json',
                data: JSON.stringify(data), // data sent with the post request
                crossDomain: true,
                // handle a successful response
                success: function(data) {
                    localStorage.setItem("user-profile-info", JSON.stringify(data));
                    window.location.href = "profile.html";
                },

                // handle a non-successful response
                error: function(xhr, errmsg, err) {
                    alert("Couldnt fetch User profile details");
                }

            });
        });

        $(document).ready(function() {
           renderTable(0, 5);
           startRenderTable();
             var test = localStorage.getItem("user");
        user = jQuery.parseJSON(test);
       
        var test = localStorage.setItem("student-username", user.username);
        $('a#name').html('<span class="glyphicon glyphicon-user"></span>  ' + user.username);

        $('a#logout').click(function() {
            window.location.href = "index.html";
            localStorage.clear();
        });
        });