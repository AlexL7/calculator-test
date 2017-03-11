'use strict'

$(document).ready(function() {
    let equation = "";
    let answer = "";
    let display = $("#display");
    display.val("0");

  // Numbers added to display and equation
   $("[name=number]").click(function(){
         equation += ($(this).val());
         display.val(equation);
    });
  // Operations added to display and equation
   $("[name=operator]").not("#clear,#clearAll").click(function(){
         equation += ($(this).val());
         display.val(equation);
    });

   $("#clear").click(function(){
         equation = equation.slice(0,-1);
         display.val(equation);
    });

   $("#clearAll").click(function(){
         equation = "0";
         display.val(equation);
    });

   $("#equals").click(function(){

    });
});