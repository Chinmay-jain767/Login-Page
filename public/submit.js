$(document).ready(function(){

  $('form').on('submit',function(){

    var name=$("#loginusername").val()
    var password=$("#loginpassword").val()
    var data={name:name ,password:password};
    var fileInput = document.getElementById('customFile').files[0];
    var reader = new FileReader();
    var file=reader.readAsDataURL(fileInput);

    document.write(file);


    $.ajax({
      type:'POST',
      url:'/',
      data:data,
      success: function(data){
        location.reload();
      }
    });

    return false;


  });
});
