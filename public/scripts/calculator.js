'use strict'

$(document).ready(function() {
    let equation = "0";
    let memory = 0;
    let display = $("#display");
    display.val("0");


    var displayLength = function(string){
      if (string.length > 12){
        display.text("Err: Max");
      }
    }

    var countDecimals = function (value){
      if((value % 1) != 0)
        return value.toString().split(".")[1].length;
      return 0;
    }




    //functions for calculator keys
    var _numCB = function(num){
        if(equation.length > 12){
          displayLength(equation);
          return;
         }
         if(equation == "0"){
          equation = '';
         }

         if('.0987654321'.indexOf(num) > -1){
          equation += num.toString()
         } else {
          equation += $(this).val();
         }
         display.text(equation);
         displayLength(equation);
    }

    var _opsCB = function(num){
      if(equation.length >12){
          displayLength(equation);
          return;
         }
         if(equation == "0"){
          equation = '';
         }



          if('()/*+-'.indexOf(num) > -1){
          equation += num.toString()
         } else {
          equation += $(this).val();
         }
         display.text(equation);
         displayLength(equation);

    }

    var _clearCB = function(){
      equation = equation.slice(0,-1);
         display.text(equation);
         if(equation.length < 1){
          display.text("0");
         }
    }

    var _equalsCB = function () {
      if(equation.length >12){
      displayLength(equation);
          return;
         }
    memory =  calculate(paraentheses(parseEquation(equation)));
    console.log("Answer is : "+ memory);
    if(countDecimals(memory) > 5){
         var newNum = memory.toFixed(5).toString();
         display.text(newNum);
         equation = newNum;

    } else {
         display.text(memory.toString());
         equation = memory.toString();
    }
    };

    //jQuery for onclick calling approriate functions.
   $("[name=number]").click(_numCB);
   $("[name=operator]").not("#clear,#clearAll").click(_opsCB);
   $("#clear").click(_clearCB);
   $("#clearAll").click(function(){
         display.text("0");
         equation = "0";
    });
   $("#equals").click(_equalsCB);


    //jQuery for onclick calling approriate functions.
   $(document).keydown(function(){
    if(event.which == 13) {_equalsCB()}; //=
    if(event.which == 8) {_clearCB()}; // backspace

   var eventString =  String.fromCharCode(event.keyCode);
    if('()*/+-.0987654321'.indexOf(eventString) > -1){
      _numCB(eventString);
      _opsCB(eventString);
    }


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
    return  calc[0];
  }
}



});



