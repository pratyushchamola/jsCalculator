class Calculator {
  constructor(previousOperatorTextElement, currentOperatorTextElement){
    this.previousOperatorTextElement = previousOperatorTextElement;
    this.currentOperatorTextElement = currentOperatorTextElement;
    this.clear();
  }
  
  clear(){
    this.currentOperand = '';
    this.previousOperand = '';
    this.operation = undefined;
  }
  
  delete(){
    this.currentOperand = this.currentOperand.toString().slice(0,-1);
  }
  
  appendNumber(number){
    if(this.currentOperand == '.' && this.currentOperand.includes('.'))return;
    this.currentOperand = this.currentOperand.toString() + number.toString();
  }
  
  chooseOperation(operation){
    if(this.currentOperand==='')return;
    if(this.previousOperand != ''){
      this.compute();
    }
    this.operation=operation;
    this.previousOperand = this.currentOperand;
    this.currentOperand = ''
  }
  
  compute(){
    let computation;
    const prev = parseFloat(this.previousOperand);
    const next = parseFloat(this.currentOperand);
    if(isNaN(prev)||isNaN(next))return;
    switch(this.operation){
      case '+': computation = prev + next;
        break;
      case '-': computation = prev - next;
        break;
      case '*': computation = prev * next;
        break;
      case '/': computation = prev / next;
        break;
      default: return;
    }
    
    this.currentOperand = computation;
    this.previousOperand = '';
    this.operation = undefined;
  }
  
  getDisplayNumber(number){
    const stringNumber = number.toString();
    const integerDigits = parseFloat(stringNumber.split('.')[0]);
    const decimalDigits = stringNumber.split('.')[1];
    
    let integerDisplay;
    if(isNaN(integerDigits)){
      integerDisplay ='';
    }else{
      integerDisplay = integerDigits.toLocaleString('en', {maximumFractionDigits: 0}) 
    }
    
    if(decimalDigits != null){
      return `${integerDisplay}.${decimalDigits}`;
    }else{
      return integerDisplay;
    }
  }
  
  updateDisplay(){
    this.currentOperatorTextElement.innerText = 
      this.getDisplayNumber(this.currentOperand);
    if(this.operation != null){
      this.previousOperatorTextElement.innerText=
        `${this.getDisplayNumber(this.previousOperand)} ${this.operation}`;
    }else{
      this.previousOperatorTextElement.innerText = '';
    }
  }
  
}


const numberButtons = document.querySelectorAll('[data-number]');
const operationButtons = document.querySelectorAll('[data-operation]');
const equalsButton = document.querySelector('[data-equals]');
const deleteButton = document.querySelector('[data-delete]');
const allClearButton = document.querySelector('[data-all-clear]');

const previousOperatorTextElement = document.querySelector('[data-previous-operand]');
const currentOperatorTextElement = document.querySelector('[data-current-operand]');

const calculator = new Calculator(previousOperatorTextElement, currentOperatorTextElement);

numberButtons.forEach(button => {
  button.addEventListener('click',()=>{
    calculator.appendNumber(button.innerText);
    calculator.updateDisplay();
  });
});

operationButtons.forEach(button => {
  button.addEventListener('click',()=>{
    calculator.chooseOperation(button.innerText);
    calculator.updateDisplay();
  });
});

equalsButton.addEventListener('click',()=>{
  calculator.compute();
  calculator.updateDisplay();
});

allClearButton.addEventListener('click',()=>{
  calculator.clear();
  calculator.updateDisplay();
});

deleteButton.addEventListener('click',()=>{
  calculator.delete();
  calculator.updateDisplay();
});