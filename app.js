class Calculator{
    constructor(previousInput_div, currentInput_div){
        this.previousInput_div = previousInput_div;
        this.currentInput_div = currentInput_div;
        this.clear();
    }

    clear(){
        this.previousInput = "";
        this.currentInput = "";
        this.operation = undefined;
    }

    appendNumber(number){
        if(number === "." && this.currentInput.toString().includes(".")) return;
        this.currentInput = this.currentInput.toString() + number.toString();
    }

    chooseOperation(operation){
        if(this.currentInput === "") return;
        if(this.currentInput !== "") this.compute();
        this.operation = operation;
        this.previousInput = this.currentInput;
        this.currentInput = "";
    }
    
    compute(){
        let computation;
        const prev = parseFloat(this.previousInput);
        const curr = parseFloat(this.currentInput);
        if(isNaN(prev) || isNaN(curr))  return;
        switch(this.operation)
        {
            case "+": computation = prev + curr;  break;
            case "-": computation = prev - curr;  break;
            case "*": computation = prev * curr;  break;
            case "/": computation = prev / curr;  break;
            default: return;
        }
        this.currentInput = computation;
        this.operation = undefined;
        this.previousInput = "";
    }

    deleteOperation(){
        this.currentInput = this.currentInput.toString().slice(0,-1);
    }

    displayNumber(number){
        const stringNumber = number.toString();
        const integerDigits = parseFloat(stringNumber.split('.')[0]);
        const decimalDigits = stringNumber.split('.')[1];
        let integerDisplay;
        if (isNaN(integerDigits))
            integerDisplay = "";
        else
            integerDisplay = integerDigits.toLocaleString('en', { maximumFractionDigits: 0 });
        
        if (decimalDigits != null) 
            return `${integerDisplay}.${decimalDigits}` ;
        else
            return integerDisplay;
    }

    updateDisplay(){
        currentInput_div.innerText = this.displayNumber(this.currentInput);
        if(this.operation != null){
            previousInput_div.innerText = `${this.displayNumber(this.previousInput)} ${this.operation}`;
        }
        else{
            previousInput_div.innerText = "";
        }
    }


}


const numberButtons = document.querySelectorAll('[data-number]');
const operationButtons = document.querySelectorAll('[data-operation]');
const allClearButton = document.querySelector('[data-all-clear]');
const deleteButton = document.querySelector('[data-del]');
const equalsButton = document.querySelector('[data-equals]');
const previousInput_div = document.querySelector('[data-previous-input]');
const currentInput_div = document.querySelector('[data-current-input]');

const calci = new Calculator(previousInput_div,currentInput_div);

numberButtons.forEach(button =>{
    button.addEventListener("click",()=>{
        calci.appendNumber(button.innerText);
        calci.updateDisplay();
    })
})

operationButtons.forEach(button =>{
    button.addEventListener("click",()=>{
        calci.chooseOperation(button.innerText);
        calci.updateDisplay();
    })
})

equalsButton.addEventListener("click",()=>{
    calci.compute();
    calci.updateDisplay();
})

allClearButton.addEventListener("click",()=>{
    calci.clear();
    calci.updateDisplay();
})

deleteButton.addEventListener("click",()=>{
    calci.deleteOperation();
    calci.updateDisplay();
})


