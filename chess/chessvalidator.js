var boardvalidator = new Chess();


function onDragStart(source, piece, position, orientation) {
    if(boardvalidator.game_over()) return false
    if((boardvalidator.turn() !== 'w')) return false 
}

function onDrop(source, target){
    var move = boardvalidator.move({
        from: source,
        to: target,
        promotion: 'q' // NOTE: always promote to a queen for example simplicity
      })
      // illegal move
    if (move === null) return 'snapback'
    
    /*var cloneGame = boardvalidator
    var bestMove = minimax(10, false, Infinity, -Infinity, cloneGame)[1]
    boardvalidator.move(bestMove)
    boardrenderer.position(boardvalidator.fen()) */
}

function updateBoard() {
    boardrenderer.position(boardvalidator.fen());
}
