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
    setTimeout(() => {
        var clonGame = boardvalidator;
        var bestMove = mmRoot(clonGame, 10, false)[0];
        boardvalidator.move(bestMove);
        updateBoard();
    },1000)
};

function updateBoard() {
    boardrenderer.position(boardvalidator.fen());
};
