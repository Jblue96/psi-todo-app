$(document).ready(function(){
  console.log('jQuery sourced.');

  refreshData();

  $('#todoList').on('click', '.delete', function(){
    console.log('DELETED', $(this).data('todoid'));
    deleteTodo($(this).data('todoid'));
  });

  $('#todoList').on('change', '.completeTodo', function(){
    console.log('Checkbox clicked', this.checked);
    toggleTodo($(this).data('todoid'));
  });

  // Called when the form is submitted
  $('#submitForm').on('submit', function(event){
    // Stop the page from refreshing
    event.preventDefault();
    // Store the value of the input field in a variable
    var descriptionText = $('#descriptionText').val();
    // Run the POST request
    $.ajax({
      type: 'POST',
      url: '/todo',
      data: {description: descriptionText},
      success: function(response) {
        console.log('Success!');
        // Update our list on a successful add
        refreshData();
      }
    });
  })
});

// Delete a todo that matches the id passed in
function deleteTodo(id) {
  // Run the DELETE request
  $.ajax({
    type: 'DELETE',
    url: '/todo/' + id,
    success: function(response) {
      console.log('Success!');
      refreshData();
    }
  });
}

// Route that toggles the completed value from false to true
function toggleTodo(id) {
  // Run the PUT request
  $.ajax({
    type: 'PUT',
    url: '/todo/toggle/' + id,
    success: function(response) {
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
        // Create a table row element
        $tr = $('<tr></tr>');
        // Append the columns
        $tr.append('<td>' + response[i].id + '</td>');
        $tr.append('<td>' + response[i].description + '</td>');
        $tr.append('<td>' + createCheckBox(response[i].completed, response[i].id) + '</td>');
        $tr.append('<td><button data-todoid="' + response[i].id +
                   '" class="delete">delete</button></td>');
        // Append our new tr to the list
        $('#todoList').append($tr);
      }
    }
  });
}

function createCheckBox(completed, todoid) {
  var checkboxHtmlString = '';
  if(completed) {
    checkboxHtmlString = '<input class="completeTodo" data-todoid="' + todoid +
                         '" checked type="checkbox">';
  }else {
    checkboxHtmlString = '<input class="completeTodo" data-todoid="' + todoid +
                         '" type="checkbox">';
  }
  return checkboxHtmlString;
}
