'use strict'

$(document).ready(function() {
    let equation = "0";
    let memory = 0;
    let display = $("#display");
    display.val("0");


    var displayLength = function(string){
      if (string.length > 12){
        display.val("Err: Max");
      }
    }

  // Numbers added to display and equation
     $("[name=number]").click(function(){
         if(equation == "0"){
          equation = '';
         }
         equation += ($(this).val());
         display.val(equation);
         displayLength(equation);
    });
  // Operations added to display and equation
   $("[name=operator]").not("#clear,#clearAll").click(function(){
         if(equation == "0"){
          equation = '';
         }
         equation += ($(this).val());
         display.val(equation);
         displayLength(equation);
    });

   $("#clear").click(function(){
         equation = equation.slice(0,-1);
         display.val(equation);
         if(equation.length < 1){
          display.val("0");
         }
    });

   $("#clearAll").click(function(){
         display.val("0");
         equation = "0";
    });

   $("#equals").click(function(){
    memory =  calculate(paraentheses(parseEquation(equation)));
    console.log("Answer is : "+ memory);
    display.val(memory.toString());
    equation = memory.toString();
    console.log(equation);
    });


   function parseEquation(string){

      let operation=[];
      let currentNum = '';


      for(var i=0, char; char = string.charAt(i); i++){
        //check if character is an operation, if true, adds the current number and operation to array and resets current.
        if ('()*/+-'.indexOf(char) > -1) {
          //checks for negative sign
          if (currentNum == '' && char == '-') {
                currentNum = '-';
            } else {

              if(parseFloat(currentNum)){
                operation.push(parseFloat(currentNum),char);
                currentNum = '';
              } else {
                operation.push(char);
              }

            }
        } else {
          currentNum += string.charAt(i);
        }
      }
      //adds last number to array
      if (currentNum != '') {
        operation.push(parseFloat(currentNum));
      }
      console.log("Parse returns this " + operation);
      return operation;
   };

   function absVal(num){
            return num < 0 ? -num:num; }

   function paraentheses(arrEquation){
    var newOperation = [];
    var tempEquation = arrEquation;


    for (var i =0; i<arrEquation.length; i++){

      //checks for paraentheses then runs calculate of everything inside and pushes to newoperation
      if(arrEquation[i] == "("){
        let tempCalc = [];
        let tempNum;
        let indexOfPar = [];

        indexOfPar.push(tempEquation.indexOf("(", i),tempEquation.indexOf(")", i));
        tempCalc = tempEquation.slice(indexOfPar[0]+1,indexOfPar[1]);

        if(calculate(tempCalc) < 0){
          newOperation.push("-",absVal(calculate(tempCalc)));
        } else {
          newOperation.push(calculate(tempCalc));
        }


        i = indexOfPar[1];
        }
      else{
        if(parseFloat(arrEquation[i]) < 0){
          newOperation.push("-",absVal(arrEquation[i].toString()));
        } else {
        newOperation.push(arrEquation[i]);
      }
    }
    }
      console.log("new Operation: " + newOperation);


      return newOperation;
    }





   function calculate(calc) {
  var ops = ['*', '/', '+', '-'],
    opFunctions = [
      function(a, b) {
        return a * b
      },
      function(a, b) {
        return a / b
      },
      function(a, b) {
        return a + b
      },
      function(a, b) {
        return a - b
      }
    ],
    newCalc = [],
    currentOp;
    //peforms each operation on the incoming array.
  for (var i = 0; i < ops.length; i++) {
    for (var j = 0; j < calc.length; j++) {
      if (calc[j] == ops[i]) {
        currentOp = opFunctions[i];
      } else if (currentOp) {
        newCalc[newCalc.length - 1] = currentOp(newCalc[newCalc.length - 1], calc[j]);
        currentOp = null;
      } else {
        newCalc.push(calc[j]);
      }
    }
    calc = newCalc;
    newCalc = [];
  }
  if (calc.length > 1) {
    console.log('Error: unable to resolve calculation');
    return calc;
  } else {
    return calc[0];
  }
}



});



