 baseUrl = "http://127.0.0.1:8000/api/";
 $(document).ready(function() {
 renderTable(0,10);
 startRenderTable();

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
         url: baseUrl + "uploads/",
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
             console.log(total);
             var table = $('table#board tbody');
             table.html('');
             items = data.items;
             for (obj in items) {
                 var forhtml = '<tr>';

                 forhtml += "<td>" + items[obj].id + "</td>";
                 forhtml += "<td>" + items[obj].item_name + "</td>";
                 forhtml += "<td>" + items[obj].item_category + "</td>";
                 forhtml += "<td><a href='#'  class='member'>" + items[obj].uploaded_by + "</a></td>";
                 url = "http://127.0.0.1:8000" + items[obj].item_image;
                 console.log(url);
                 forhtml += "<td><a href=" + url + " target='_blank'>image</a></td>";
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
         "username": user.username,
         "user_type": user.user_type
     };
     $.ajax({
         url: baseUrl + "profile/", // the endpoint
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




 
 });
 var test = localStorage.getItem("user");
 user = jQuery.parseJSON(test);

 var test = localStorage.setItem("student-username", user.username);
 $('a#name').html('<span class="glyphicon glyphicon-user"></span>  ' + user.username);

 $('a#logout').click(function() {
     window.location.href = "index.html";
     localStorage.clear();
 });
 $(window).on('load', function() {
     $(document).on('click', 'a.member', function() {
         member = $(this).text();
         var test = localStorage.setItem("member", member);
         window.location.href = "member.html";
     });
 });