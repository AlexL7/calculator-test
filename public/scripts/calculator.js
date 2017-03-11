'use strict'

$(document).ready(function() {
    let number = "";
    let newnumber = "";
    let operator = "";
    let display = $("#display");
    display.val("0");

  // Numbers added to display and equation
   $("[name=number]").click(function(){
         display.val($(this).val())
    });
  // Operations added to display and equation
  $("[name=operator]").click(function(){
          display.val($(this).val());
    });
});