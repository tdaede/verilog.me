$.each($('.ace-verilog'), function(index, item) {
  var editor = ace.edit(item);
  editor.setTheme('ace/theme/tomorrow');
  editor.getSession().setMode('ace/mode/verilog');
  editor.resize();
});
