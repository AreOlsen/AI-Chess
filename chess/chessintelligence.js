const chessPieceWorth =  {
    pawn: 1,
    knight: 3,
    bishop: 3,
    rook: 5,
    queen: 9,
    king:10000000 /* We don't ever want to lose our king.   */
}

function minimax(depth, maximizingPlayer, alpha, beta, clonedGame){
    if(depth == 0 || clonedGame.game_over()){
        return evaluateBoard(boardvalidator)
    }
    if(maximizingPlayer){
      let maxEval = Infinity
      for(let i = 0; i < clonedGame.moves().length; i++){
        clonedGame.move(clonedGame.moves()[0], clonedGame.moves()[1])
        let eval = minimax(clonedGame.moves()[i], depth-1, alpha, beta,false)[0]
        clonedGame.undo()
        let bestMove
        if(eval >= maxEval){
          maxEval = eval
          bestMove = clonedGame.moves()[i]
        }
        alpha = Math.max(alpha, eval)
        if(beta<=alpha){
          break
        }
        return maxEval, bestMove
      }
    } else {
      let minEval = Infinity
      for(let i = 0; i < clonedGame.moves().length; i++){
        clonedGame.move(clonedGame.moves()[0], clonedGame.moves()[1])
        let eval = minimax(clonedGame.moves()[i], depth-1, alpha, beta,True)[0]
        clonedGame.undo()
        let bestMove
        if(eval <= maxEval){
          minEval = eval
          bestMove = clonedGame.moves()[i]
        }
        beta = Math.min(beta, eval)
        if(beta<=alpha){
          break
        }
        return minEval, bestMove
      }
    }
    
}

var evaluateBoard = function(current_game) {
    var status = current_game.fen();
    var score = 0;
    // calculate score for the current situation
    var fen_idx = 0;
    var piece = status[fen_idx];
    while(piece != ' '){
      switch(piece){
        case 'p': score += chessPieceWorth.pawn; break;
        case 'n': score += chessPieceWorth.knight; break;
        case 'b': score += chessPieceWorth.bishop; break;
        case 'r': score += chessPieceWorth.tower; break;
        case 'q': score += chessPieceWorth.queen; break;
        case 'k': score += chessPieceWorth.king; break;
        case 'P': score -= chessPieceWorth.pawn; break;
        case 'N': score -= chessPieceWorth.knight; break;
        case 'B': score -= chessPieceWorth.bishop; break;
        case 'R': score -= chessPieceWorth.tower; break;
        case 'Q': score -= chessPieceWorth.queen; break;
        case 'K': score -= chessPieceWorth.king; break;
        default: break;
      }
      ++fen_idx;
      piece = status[fen_idx];
    }
    return score;
};
