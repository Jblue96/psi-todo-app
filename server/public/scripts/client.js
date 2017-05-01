$(document).ready(function(){
  console.log('jQuery sourced.');

  $('#submitForm').on('submit', function(event){
    event.preventDefault();
    var descriptionText = $('#descriptionText').val();
    $.ajax({
      type: 'POST',
      url: '/todo',
      data: {description: descriptionText},
      success: function(response) {
        console.log('Success!');
      }
    });
  })
});
