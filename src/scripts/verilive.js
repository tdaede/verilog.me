$('.compile-btn').click(function() {
  var moduleEditor = ace.edit('ace-module');
  var moduleCode = moduleEditor.getSession().getValue();
  var testbenchEditor = ace.edit('ace-testbench');
  var testbenchCode = testbenchEditor.getSession().getValue();
  var data = JSON.stringify({module: moduleCode, testbench: testbenchCode});
  $.ajax({
    url: 'http://verilog.me/compile',
    type: 'post',
    data: data,
    contentType: 'application/json',
    dataType: 'json',
    success: function(data) {
      $('textarea.output').text(data.stdout);
      $('textarea.waveform').text(data.waveform);
    },
    error: function(jqXHR, textStatus, errorThrown) {
      console.log('Error:', textStatus, errorThrown);
    }
  });
});
