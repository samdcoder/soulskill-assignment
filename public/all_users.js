$(document).ready(function(){
	$.ajax({
            url: "/userData",
            type: 'GET',
            success: function (data) {
                console.log(data);
                var result = $('#userData');
                //result.append('<center> ' + data.message + '</p> </center>');
               for(var key in data){
               	console.log(data[key].email);
               	result.append('<tr> <th scope="row">'+data[key].name+'</th>'+ '<td>'+data[key].email+'</td>'+'<td>'+data[key].phone+'</td>'+'<td>'+data[key].job+'</td>'+'</tr>');
               }
               
            },
            cache: false,
            contentType: false,
            processData: false
       });
});