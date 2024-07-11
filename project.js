// first of all we need tto collect the deposit from the user
// for that we have to create a function

//function deposit(){}
// we can use new stile for function
// we need to import package for getting value from user
// we need 3 inputs, deposit amount, number of line and amout to be bet


// all of the libreries nd import at the top of the program

const prompt = require ("prompt-sync")();

// all of the global variable typical to const and its better to put uppercase
const ROWS = 3;
const COLS = 3;
const SYMBOLS_COUNT ={
    A:2,
    B:4,
    C:6,
    D:8
}

const SYMBOL_VALUES = {
    A:5,
    B:4,
    C: 3,
    D:2
}





const deposit =() => {
    while (true){
        const depositAmount = prompt("Enter a Amount for this Game: ");
        // now we need to convert this input into number
        const NumberDepositAmount =parseFloat(depositAmount);
        // we want to check this is a valid number
        if (isNaN(NumberDepositAmount) || NumberDepositAmount <=0){
            console.log("Invalid Deposit Amount, Try Again please");
        } else{
            return NumberDepositAmount;
        }
    };

};

// Need to get number of lines

const getnumberBets =()=>{
    while (true){
        const lines = prompt("Enter number of line to bet (1-3): ");
        // now we need to convert this input into number
        const numberLines =parseFloat(lines);
        // we want to check this is a valid number
        if (isNaN(numberLines) || numberLines <=0 || numberLines >3){
            console.log("Invalid number of lines , Try Again please");
        } else{
            return numberLines;
        }
    };

}


// collect the amount gonna bet
// here balance is a parameter that we have to submit when we wanna call it
// total get bet is based on the balance that have the user
const getBet = (balance, lines) =>{
    while (true){
        const bet = prompt("Enter the total bet : ");
        // now we need to convert this input into number
        const numberBet =parseFloat(bet);
        // we want to check this is a valid number
        if (isNaN(numberBet) || numberBet <=0 || numberBet > (balance / lines)){
            console.log("Invalid Bet , Try Again please");
        } else{
            return numberBet;
        }
    };


}

const spin = ()=>{
    const symbols = [] ;// creating an array
    for (const [symbol,count] of Object.entries(SYMBOLS_COUNT)){
        for(let i =0; i < count; i++){
            symbols.push(symbol);
        }

    }
    const reel = [[],[],[]]; // each arrays are column
    for ( let i =0; i< COLS; i ++){
        const reelSymbol = [...symbols] // randomly select from symbols and continuesly remove  the selected symbol from symbols
        for (let j=0; j< ROWS; j++){
            const randomIndex = Math.floor (Math.random() * reelSymbol.length); // floor will helpto down to the lowest number
            const selectSymbol = reelSymbol[randomIndex];
            reel[i].push(selectSymbol);
            reelSymbol.splice(randomIndex,1);

        }
    }
    return reel;

}

const reel = spin();
console.log(reel);
let balance = deposit(); // let means we can change the variables
const numberLines = getnumberBets(); // const we cannot change the variable
const bet = getBet(balance, numberLines)
