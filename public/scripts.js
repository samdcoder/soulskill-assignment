$(document).ready(function(){

    $("form#user-form").submit(function(e) {
        e.preventDefault();
        e.stopPropagation();    
        var formData = new FormData(this);

        $.ajax({
            url: "/",
            type: 'POST',
            data: formData,
            success: function (data) {
                var result = $('#result');
                result.html('');
                result.append('<center> ' + data.message + '</p> </center>');
                if(data.code == 200){
                    $( '#user-form' ).each(function(){
                         this.reset();
                    });
                }
            },
            cache: false,
            contentType: false,
            processData: false
       });
    });

});


