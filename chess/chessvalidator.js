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
      })
      // illegal move
    if (move === null) return 'snapback';
    var audio = new Audio("./sounds/place.mp3");
    audio.play();
    if(started == false){
        div.disabled= true;
        started=true;
    }
    const element  = document.getElementById("botThinking");
    element.style.opacity='1';
    element.color='white';
    element.innerHTML = "Thinking...";

    setTimeout(() => {
        var startime = performance.now();

        var clonGame = boardvalidator;
        var options = mmRoot(clonGame, strength, true);
        var bestMove = options[0];
        boardvalidator.move(bestMove);
        updateBoard();
        audio.play();

        var endtime = performance.now();
        var timeDiff = endtime-startime;
        timeDiff/=1000;
        console.log("Total elapsed time " + timeDiff + "s");
    },100);
    element.style.opacity='0';
};

function updateBoard() {
    boardrenderer.position(boardvalidator.fen());
};
