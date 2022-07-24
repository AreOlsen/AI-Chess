var boardvalidator = new Chess();

function onDragStart() {
    if(boardvalidator.game_over()) return false
    if((boardvalidator.turn() !== 'w')) return false 
};

let started = false;
let strength = 2;
let div = document.getElementById("strength");

function onDrop(source, target){
    strength = div.value;
    if(strength > 5 || strength < 1){ //Small safegaurd in case they manipulate using developer tools.
        return 'snapback';
    }
    var move = boardvalidator.move({
        from: source,
        to: target,
        promotion: 'q' // NOTE: always promote to a queen for example simplicity
      });
      // illegal move
    if (move === null) return 'snapback';

    //Update scoring.
    var check = checkIfOver(boardvalidator);
    showWinner(check);
    
    var audio = new Audio("./sounds/place.mp3");
    audio.play();
    if(started == false){
        div.disabled= true;
        started=true;
    }

    //Show the THINKING BOT Indicator.
    const element  = document.getElementById("botThinking");
    element.innerHTML = "Thinking...";


    setTimeout(() => {
        //Start timer 
        var startime = performance.now();

        //Calculate and play best move using minimax.
        var clonGame = boardvalidator;
        var options = mmRoot(clonGame, strength, true);
        var bestMove = options[0];
        boardvalidator.move(bestMove);

        //Update scoring.
        var check1 = checkIfOver(boardvalidator);
        showWinner(check1);

        //Update the board, does not auto update when changing FEN only.
        updateBoard();

        //Play chess audio for the bot moving.
        audio.play();

        //End timer.
        var endtime = performance.now();
        var timeDiff = endtime-startime;
        timeDiff/=1000; //Milliseconds over to seconds.
        console.log("Total elapsed time " + timeDiff + "s"); //Print to console some stats about time.

        element.innerHTML=""; //Remove the bot thinking indicator as it is not thinking anymore.
    },100);
};

function updateBoard() {
    boardrenderer.position(boardvalidator.fen());
};


function checkIfOver(game){
    var currentTurn = game.turn(); //If it is not in a draw, then check if we in checkmate.
    if(game.in_checkmate() && !game.in_draw() && !game.in_stalemate() && !game.in_threefold_repetition()){ //Checks if the turn person is in checkmate. If it is in a checkmate. Other person is winner.
        if(currentTurn==="b"){
            return "w";
        } else {
            return "b";
        }
    } else if(game.game_over()){ //If it is not a checkmate, and the game is over then it is a draw.
        return "bw";
    } else {
        return "";
    }
};



function showWinner(winner){
    if(winner==="w"){ //Nasty - replace with switch.
        setWinner("White has won!");
    } else if (winner==="b"){
        setWinner("Black has won!");
    } else if (winner==="wb" || winner === "bw"){
        setWinner("Both won, it's a draw!");
    } else {
        setWinner("");
    }
};

function setWinner(text){
    document.getElementById("winnerWinnerChickenDinner").innerHTML = text;
}
