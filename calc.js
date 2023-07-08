//mathematical functions

function add(a, b){
    return a+b;
}
function subtract(a, b){
    return a-b;
}

function multiply(a, b){
    return a*b;
}

function divide(a, b){
    if(b == 0) return "Operation not defined";
    return a/b;
}


//elements of dom and variables
var firstNum = null;
var SecondNum = null;
var accumulator = '';
var currentOperator, previousOperator;
const button = document.getElementsByClassName('btn');
const buttons = Array.from(button);
const number = document.getElementsByClassName('number');
const numbers = Array.from(number);
const operator = document.getElementsByClassName('operator');
const operators = Array.from(operator);
const equals = document.getElementById('isEquals');
const clear = document.getElementById('clear');
const display = document.getElementById('display');
const display_content = document.createElement('span');
const off = document.getElementById('off');
const percent = document.getElementById('percent');
const negative = document.getElementById('negative');
const dot = document.getElementById('dot');
display_content.textContent = '0';
display.appendChild(display_content);


var addSelectClass = function(operator){
    removeSelectClass();
    operator.classList.add('selected');
}

var removeSelectClass = function(){
    for(var i=0; i<operators.length; i++){
        operator[i].classList.remove('selected');
    }
}


console.log(null == false);
// Calculator functionnalities

document.addEventListener('DOMContentLoaded', function(){


    numbers.forEach((number)=>{number.addEventListener('click', function(){
        accumulator+=number.textContent;
        display_content.textContent = accumulator;
        console.log(`accumulator = ${accumulator}`);
    })});
    
    operators.forEach(function(operator){operator.addEventListener('click', function(){
        addSelectClass(operator);

        console.log(firstNum);

        if(previousOperator!=undefined){
            SecondNum = (accumulator=='')? null:  Number(accumulator);
            currentOperator = this.id;
            operate(previousOperator);
            previousOperator = currentOperator;
        }
        else{
            if(firstNum == null) firstNum= Number(accumulator);
            accumulator = '';
            previousOperator = this.id;
        }


        console.log(`firstNum = ${firstNum}`);
        console.log(`SecondNum = ${SecondNum}`);
    })})

    
    
    equals.addEventListener('click', ()=>{
        SecondNum = Number(accumulator);
        operate(previousOperator);
        previousOperator = undefined;
    } )
    
    function operate(o){
        console.log(`operation: ${o}`);
        console.log(`firstNum before operation: ${firstNum}`);
        console.log(`SecondNum before operation: ${SecondNum}`);
        if(SecondNum===null) SecondNum = firstNum;
        var result;
        switch(o){
            case 'plus':
                result = add(firstNum, SecondNum);
                break;
            case 'minus':
                result = subtract(firstNum, SecondNum);
                break;
            case 'multiply':
                result = multiply(firstNum, SecondNum);
                break;
            case 'divide':
                result = divide(firstNum, SecondNum);
        }
    
        accumulator = result;
        firstNum = Number(accumulator);
        display_content.textContent = accumulator;
        accumulator = '';
    }
    
    
    clear.addEventListener('click', ()=>{
        display_content.textContent = '0';
        firstNum = null;
        SecondNum = null;
        accumulator = '';
        currentOperator = undefined;
        previousOperator = undefined;
        removeSelectClass();
    })

    off.addEventListener('click', ()=>{
        display_content.textContent = '';
        firstNum = null;
        SecondNum = null;
        accumulator = '';
        currentOperator = undefined;
        previousOperator = undefined;
        removeSelectClass();
    })

    negative.addEventListener('click', ()=>{
        if(accumulator!=''){
            if(accumulator.charAt(0) == '-') accumulator = accumulator.slice(1);
            else accumulator = '-' + accumulator;

            display_content.textContent = accumulator;
        }
    })

    percent.addEventListener('click', ()=>{
        if(accumulator != '') accumulator = Number(accumulator)/100;
        display_content.textContent = accumulator;
    })

    dot.addEventListener('click', ()=>{
        if(accumulator == '' || accumulator.charAt(0) != '.') accumulator += '.';
        display_content.textContent = accumulator;
    })

})