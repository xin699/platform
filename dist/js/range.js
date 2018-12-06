
function changeSpeed() {
    var value = parseFloat($('#range_speed').val());
    var valStr = value*100 + "% 100%";
    $('#value1').html(value.toFixed(1));
    $('#range_speed').css({
      "background-size": valStr
    })
    $("input[name='animat_speed']").val(value.toFixed(1));
};

function changeSpeed2(obj){
  
  var $self = $(obj);
  var value = parseFloat($self.val());
  var valStr = value*100 + "% 100%";
  var $outer =  $self.next('span');
  
  $outer.html(value.toFixed(1))

  $self.css({
    "background-size": valStr
  })

}