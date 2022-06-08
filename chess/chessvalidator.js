var boardvalidator = new Chess();


function onDragStart(source, piece, position, orientation) {
    if(boardvalidator.game_over()) return false
    if((boardvalidator.turn() !== 'w')) return false 
};

function onDrop(source, target){
    var move = boardvalidator.move({
        from: source,
        to: target,
        promotion: 'q' // NOTE: always promote to a queen for example simplicity
      })
      // illegal move
    if (move === null) return 'snapback'
    var audio = new Audio("./sounds/place.mp3");
    audio.play();
    setTimeout(() => {
        var clonGame = boardvalidator;
        var bestMove = mmRoot(clonGame, 50, true)[0];
        boardvalidator.move(bestMove);
        updateBoard();
        audio.play();
    },250)

};

function updateBoard() {
    boardrenderer.position(boardvalidator.fen());
};
