var boardvalidator = new Chess();


function onDragStart() {
    if(boardvalidator.game_over()) return false
    if((boardvalidator.turn() !== 'w')) return false 
};

let started = false;
let strength = 10;
let div = document.getElementById("strength");
function onDrop(source, target){
    strength = div.value;
    if(strength > 20 || strength < 1){ //Small safegaurd in case they manipulate using developer tools.
        return 'snapback';
    }
    var move = boardvalidator.move({
        from: source,
        to: target,
        promotion: 'q' // NOTE: always promote to a queen for example simplicity
      })
      // illegal move
    if (move === null) return 'snapback'
    var audio = new Audio("./sounds/place.mp3");
    audio.play();
    if(started == false){
        div.disabled= true;
        started=true;
    }
    setTimeout(() => {
        var clonGame = boardvalidator;
        var bestMove = mmRoot(clonGame, strength, true)[0];
        boardvalidator.move(bestMove);
        updateBoard();
        audio.play();
    },250);

};

function updateBoard() {
    boardrenderer.position(boardvalidator.fen());
};
