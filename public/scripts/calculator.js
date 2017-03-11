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
    display.val(calculate(parseEquation(equation)));
    equation = '';




    });


   function parseEquation(string){

      let operation=[];
      let currentNum = '';

      for(var i=0, char; char = string.charAt(i); i++){
        //check if character is an operation, if true, adds the current number an operation to array and resets current.
        if ('*/+-'.indexOf(char) > -1) {
          //checks for negative sign
          if (currentNum == '' && char == '-') {
                currentNum = '-';
            } else {
              operation.push(parseFloat(currentNum),char);
              currentNum = '';
            }
        } else {
          currentNum += string.charAt(i);
        }
      }
      //adds last number to array
      if (currentNum != '') {
        operation.push(parseFloat(currentNum));
      }
      return operation;
   };


   function paraentheses(equation){
    test =
   }



});



