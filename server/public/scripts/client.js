$(document).ready(function(){
  console.log('jQuery sourced.');

  refreshData();

  $('#todoList').on('click', '.delete', function(){
    console.log('DELETED', $(this).data('todoid'));
    deleteTodo($(this).data('todoid'));
  });

  $('#submitForm').on('submit', function(event){
    event.preventDefault();
    var descriptionText = $('#descriptionText').val();
    $.ajax({
      type: 'POST',
      url: '/todo',
      data: {description: descriptionText},
      success: function(response) {
        console.log('Success!');
        refreshData();
      }
    });
  })
});

function deleteTodo(id) {
  $.ajax({
    type: 'DELETE',
    url: '/todo/' + id,
    success: function(response) {
      console.log('Success!');
      refreshData();
    }
  });
}

function refreshData() {
  $.ajax({
    type: 'GET',
    url: '/todo',
    success: function(response) {
      console.log(response);
      $('#todoList').empty();
      for(var i = 0; i < response.length; i++) {
        $('#todoList').append('<tr><td>' + response[i].id +
                              '</td><td>' + response[i].description +
                              '</td><td>' + response[i].completed +
                              '</td><td><button data-todoid="' +
                              response[i].id +
                              '" class="delete">delete' +
                              '</button></td></tr>');
      }
    }
  });
}
