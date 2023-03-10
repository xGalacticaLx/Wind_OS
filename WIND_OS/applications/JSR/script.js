var result= "";
$("#calculate").click(function(){
  var input = $('input').val();
  try {
    result = eval(input);
  } catch(e){
    var line = e.stack.match(/(<anonymous>:[0-9]:[0-9])/g)[0];
    line = line.split(":")[1];
    console.log(line);
    result = "<span style = 'color: red'>" + e +  " at line: "+ line + "</span>" + "<br>" + "<span style = 'color: red'>--script stoped--</span><br>";
  }
  
  $('div').append(result);
});
function log(text){
   $('div').append(text + "<br>");
}
function logRed(text){
   $('div').append("<span style = 'color: red'> " + text + "</span><br>");
}
$("#clear").click(function(){
  $('div').text("");
});