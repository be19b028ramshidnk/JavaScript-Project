// first of all we need tto collect the deposit from the user
// for that we have to create a function

//function deposit(){}
// we can use new stile for function
// we need to import package for getting value from user
const prompt = require ("prompt-sync")();
const deposit =() => {
    const depositAmount = prompt("Enter a Amount for this Game: ");
    // now we need to convert this input into number
    const NumberDepositAmount =parseFloat(depositAmount);
    // we want to check this is a valid number
    if (isNaN(NumberDepositAmount) || NumberDepositAmount <=0){
        console.log("Invalid Deposit Amont, Try Again")
    }

};

deposit();