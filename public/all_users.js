$(document).ready(function(){
	$.ajax({
            url: "/userData",
            type: 'GET',
            success: function (data) {
                console.log(data);
                var result = $('#userData');
                var counter = 1;
               for(var key in data){
               	result.append('<tr> <th scope="row">'+ counter + '</th>' + '<td>' + data[key].name+'</td>'+ '<td>'+data[key].email+'</td>'+'<td>'+data[key].phone+'</td>'+'<td>'+data[key].job+'</td>'+'</tr>');
                counter++;
               }
               
            },
            cache: false,
            contentType: false,
            processData: false
       });
});