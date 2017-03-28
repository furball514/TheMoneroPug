$(document).ready(function(){
  var setting = '';
  var value;
  $('#topic').change(function(){
    value = $('#topic').val();
  });
	$('#btc').click(function(){
   setting = 'btc';
  });
  $('#rxmr').click(function(){
   setting = 'rxmr';
  });
  $('#rxmrtrader').click(function(){
   setting = 'rxmrtrader';
  });
  $('#stack').click(function(){
   setting = 'stack';
  });


  $('button').click(function(){
    console.log(setting);
    console.log(value);
    localStorage.mySetting = setting;
    localStorage.id = value;
  });
});
