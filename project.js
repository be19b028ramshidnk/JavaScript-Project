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
    const reel = []; // each arrays are column
    for ( let i =0; i< COLS; i ++){
        reel.push([])
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

// next we have to transpose the 2D array
const transpose = (reel) =>{
    const rows =[];
    for (let i =0; i <COLS; i++){
        rows.push([]);
        for(let j=0; j<ROWS;j++){
            rows[i].push(reel[j][i]);
        }
    }
    return rows
}

// print our slot machine
const printRows =(rows)=>{
    for ( const row of rows){
        let rowString = "";
        for ([i,symbol] of row.entries()){ // checking this is the last index or not
            rowString +=symbol
            if (i != row.length -1){
                rowString +=" | "
            }
        } 
        console.log(rowString)
    }

}

// now we want to check the winning
const getWinning = (rows,bet,Lines) =>{
    let winnings =0;
    for (let row =0; row < Lines; row++){
        const symbols = rows[row];
        let allSame =true;
        for ( const symbol of symbols){
            if (symbol !=symbols[0]){
                allSame = false;
                break; // exit from the for loop 
            }
        }
        if (allSame){
            winnings+= bet * SYMBOL_VALUES[symbols[0]]
        }
    }
    return winnings
}

// we need to define function to reduce the bet amount from the balance
const  game = () =>{
    
    let balance = deposit(); // let means we can change the variables

    while (true){
        console.log("Your Current Balance is" + balance.toString())
        const numberLines = getnumberBets(); // const we cannot change the variable
        const bet = getBet(balance, numberLines)
        balance -= bet * numberLines;
        const reel = spin();
        const rows = transpose(reel);
        
        printRows(rows);
        const winnings = getWinning(rows, bet, numberLines)
        balance+=winnings;
        console.log("You won RS " + winnings.toString())
        if ( balance <=0){
            console.log("You running out of money, you cannot proceed the game")
            break;
        }
        const playAgain = prompt("You wanna play again (y/n) ?" )
        if (playAgain != "y") break;
    }   

    
}

game()