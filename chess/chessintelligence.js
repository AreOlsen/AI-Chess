// https://www.chessprogramming.org/Simplified_Evaluation_Function
var pst = {
  'p': [
      [ 0,   0,   0,   0,   0,   0,   0,   0],
      [50,  50,  50,  50,  50,  50,  50,  50],
      [10,  10,  20,  30,  30,  20,  10,  10],
      [ 5,   5,  10,  25,  25,  10,   5,   5],
      [ 0,   0,   0,  20,  20,   0,   0,   0],
      [ 5, - 5, -10,   0,   0, -10, - 5,   5],
      [ 5,  10,  10, -20, -20,  10,  10,   5],
      [ 0,   0,   0,   0,   0,   0,   0,   0]
  ],
  
  'n': [
      [-50, -40, -30, -30, -30, -30, -40, -50],
      [-40, -20,   0,   0,   0,   0, -20, -40],
      [-30,   0,  10,  15,  15,  10,   0, -30],
      [-30,   5,  15,  20,  20,  15,   5, -30],
      [-30,   0,  15,  20,  20,  15,   0, -30],
      [-30,   5,  10,  15,  15,  10,   5, -30],
      [-40, -20,   0,   5,   5,   0, -20, -40],
      [-50, -40, -30, -30, -30, -30, -40, -50]
  ],

  'b': [
      [ -20, -10, -10, -10, -10, -10, -10, -20],
      [ -10,   0,   0,   0,   0,   0,   0, -10],
      [ -10,   0,   5,  10,  10,   5,   0, -10],
      [ -10,   5,   5,  10,  10,   5,   5, -10],
      [ -10,   0,  10,  10,  10,  10,   0, -10],
      [ -10,  10,  10,  10,  10,  10,  10, -10],
      [ -10,   5,   0,   0,   0,   0,   5, -10],
      [ -20, -10, -10, -10, -10, -10, -10, -20]
  ],

  'r': [
      [   0,   0,   0,   0,   0,   0,   0,   0],
      [   5,  10,  10,  10,  10,  10,  10,   5],
      [ - 5,   0,   0,   0,   0,   0,   0, - 5],
      [ - 5,   0,   0,   0,   0,   0,   0, - 5],
      [ - 5,   0,   0,   0,   0,   0,   0, - 5],
      [ - 5,   0,   0,   0,   0,   0,   0, - 5],
      [ - 5,   0,   0,   0,   0,   0,   0, - 5],
      [   0,    0,  0,   5,   5,   0,   0,   0]
  ],

  'q': [
      [ -20, -10, -10, - 5, - 5, -10, -10, -20],
      [ -10,   0,   0,   0,   0,   0,   0, -10],
      [ -10,   0,   5,   5,   5,   5,   0, -10],
      [ - 5,   0,   5,   5,   5,   5,   0, - 5],
      [   0,   0,   5,   5,   5,   5,   0, - 5],
      [ -10,   5,   5,   5,   5,   5,   0, -10],
      [ -10,   0,   5,   0,   0,   0,   0, -10],
      [ -20, -10, -10, - 5, - 5, -10, -10, -20]
  ],

  'k': [
      [-30, -40, -40, -50, -50, -40, -40, -30],
      [-30, -40, -40, -50, -50, -40, -40, -30],
      [-30, -40, -40, -50, -50, -40, -40, -30],
      [-30, -40, -40, -50, -50, -40, -40, -30],
      [-20, -30, -30, -40, -40, -30, -30, -20],
      [-10, -20, -20, -20, -20, -20, -20, -10],
      [ 20,  20,   0,   0,   0,   0,  20,  20],
      [ 20,  30,  10,   0,   0,  10,  30,  20]
  ]
}

// Weights for pieces, same source as above
var weights = {
  'p': 100,
  'n': 320,
  'b': 330,
  'r': 500,
  'q': 900,
  'k':20000
}



function mmRoot(game, depth, maximizingPlayer){ 
  var legalMoves = game.moves();
  var bestMoveScore = -Infinity;
  var bestMove;
  for(let i = 0; i < legalMoves.length; i++){
    var newMove = legalMoves[i];
    game.move(newMove);
    var val = minimax(!maximizingPlayer, depth-1, -Infinity, Infinity, game);
    game.undo();
    if(val >= bestMoveScore){
      bestMoveScore = val;
      bestMove = newMove;
    }
  }
  return [bestMove, bestMoveScore];
};


function minimax(depth, maximizingPlayer, alpha, beta, clonedGame){
    if(depth == 0 || clonedGame.game_over() || clonedGame.moves().length == 0){
        return -evaluateBoard(clonedGame.board());
    }
    if(maximizingPlayer){
      let maxEval = -Infinity;
      for(let i = 0; i < clonedGame.moves().length; i++){
        clonedGame.move(clonedGame.moves()[i]);
        let eval = minimax(depth-1, false, alpha, beta, clonedGame);
        clonedGame.undo();
        if(eval >= maxEval){
          maxEval = eval;
        }
        alpha = Math.max(alpha, maxEval);
        if(beta<=alpha){
          break;
        }
        return maxEval;
      }
    } else {
      let minEval = Infinity;
      for(let i = 0; i < clonedGame.moves().length; i++){
        clonedGame.move(clonedGame.moves()[i]);
        let eval = minimax(depth-1, true, alpha, beta, clonedGame);
        clonedGame.undo();
        if(eval <= minEval){
          minEval = eval;
        }
        beta = Math.min(beta, minEval);
        if(beta<=alpha){
          break;
        }
        return minEval;
      }
    }
    
};

var evaluateBoard = function(current_gameboard) {
  var totalEval = 0; 
  for(var i = 0; i < 8; i++){
    for(var j = 0; j < 8; j++){
      totalEval = totalEval + getPieceValue(current_gameboard[i][j],i,j);
    }
  }
  return totalEval;
};

var reverseArray = function(array) {
  return array.slice().reverse();
};

var getPieceValue = function (piece, x, y) {
  if (piece === null) {
      return 0;
  }
  return piece.color === 'w' ?  weights[piece.type] + pst[piece.type][y][x]:
          -(weights[piece.type] + reverseArray(pst[piece.type])[y][x])
};
