let userScore = 0;
let compScore = 0;

let newGame = document.querySelector("#newgame");
const choices = document.querySelectorAll(".choice");
const msg = document.querySelector("#msg");
const userScorePara = document.querySelector("#user-score");
const  compScorePara = document.querySelector("#computer-score");

newGame.addEventListener('click',() =>{
    // Reset scores and message
    if(userScore != 0 || compScore != 0 || msg.innerText === "Draw ! Play Again"){
        newGame.disabled = false;
        let decide = confirm("Start new game ?");
        if(decide){
            userScore=0;
            compScore = 0;
            userScorePara.innerText = 0;
            compScorePara.innerText = 0;
            msg.innerText = "Play your Move";
            msg.style.backgroundColor = "aliceblue";
            msg.style.color = "midnightblue";
        }
    }    
});

const genCompChoice =()=>{      //Randomly generate rock,paper,scissor
    const options = ["rock","paper","scissor"]; //Stored as array, as the indices can be randomized when unlike strings
    const randIndex = Math.floor(Math.random()*3);
    return options[randIndex];
};

const drawGame =()=>{
    msg.innerText = "Draw ! Play Again";
    msg.style.backgroundColor = "slategrey";
    msg.style.color = "white";
};

const showWinner = (userWin,userChoice,compChoice) => {
    if(userWin){
        userScore ++ ;
        userScorePara.innerText = userScore;
        msg.innerText = `You Win! Your ${userChoice.toUpperCase()} beats  ${compChoice.toUpperCase()}`;
        msg.style.backgroundColor = "green";
        msg.style.color = "#eeeeee";
    }
    else{
        compScore ++;
        compScorePara.innerText = compScore;
        msg.innerText = `You Lose! ${compChoice.toUpperCase()} beats your ${userChoice.toUpperCase()}`;
        msg.style.backgroundColor = "red";
        msg.style.color = "white";
    }
};

const playGame = (userChoice)=>{

    const compChoice = genCompChoice(); //Generate computer choice


    if(userChoice === compChoice){
        //DrawGame
        drawGame();
    }
    else{
        let userWin = true;
        if(userChoice === "rock"){     
            //Computer can choose paper,scissor
            userWin = compChoice === "paper" ? false : true;        //Set the userWin to T or F 
        }
        else if(userChoice==="paper"){
            //rock, scissor
            userWin = compChoice === "scissor" ? false : true;
        }
        else{
            //rock,paper
            userWin = compChoice === "rock" ? false : true;
        }
        showWinner(userWin,userChoice,compChoice);
    }
};

choices.forEach((choice)=>{  
    choice.addEventListener("click",()=>{
        const userChoice = choice.getAttribute("id");   //Storing the id of whichever choice clicked by the user 
        playGame(userChoice);
    });
});