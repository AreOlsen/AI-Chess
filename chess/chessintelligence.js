// https://www.chessprogramming.org/Simplified_Evaluation_Function
var pst = {
  'p': [
    [0.0,  0.0,  0.0,  0.0,  0.0,  0.0,  0.0,  0.0],
    [5.0,  5.0,  5.0,  5.0,  5.0,  5.0,  5.0,  5.0],
    [1.0,  1.0,  2.0,  3.0,  3.0,  2.0,  1.0,  1.0],
    [0.5,  0.5,  1.0,  2.5,  2.5,  1.0,  0.5,  0.5],
    [0.0,  0.0,  0.0,  2.0,  2.0,  0.0,  0.0,  0.0],
    [0.5, -0.5, -1.0,  0.0,  0.0, -1.0, -0.5,  0.5],
    [0.5,  1.0, 1.0,  -2.0, -2.0,  1.0,  1.0,  0.5],
    [0.0,  0.0,  0.0,  0.0,  0.0,  0.0,  0.0,  0.0]
  ],
  
  'n': [
    [-5.0, -4.0, -3.0, -3.0, -3.0, -3.0, -4.0, -5.0],
    [-4.0, -2.0,  0.0,  0.0,  0.0,  0.0, -2.0, -4.0],
    [-3.0,  0.0,  1.0,  1.5,  1.5,  1.0,  0.0, -3.0],
    [-3.0,  0.5,  1.5,  2.0,  2.0,  1.5,  0.5, -3.0],
    [-3.0,  0.0,  1.5,  2.0,  2.0,  1.5,  0.0, -3.0],
    [-3.0,  0.5,  1.0,  1.5,  1.5,  1.0,  0.5, -3.0],
    [-4.0, -2.0,  0.0,  0.5,  0.5,  0.0, -2.0, -4.0],
    [-5.0, -4.0, -3.0, -3.0, -3.0, -3.0, -4.0, -5.0]
  ],

  'b': [
    [ -2.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -2.0],
    [ -1.0,  0.0,  0.0,  0.0,  0.0,  0.0,  0.0, -1.0],
    [ -1.0,  0.0,  0.5,  1.0,  1.0,  0.5,  0.0, -1.0],
    [ -1.0,  0.5,  0.5,  1.0,  1.0,  0.5,  0.5, -1.0],
    [ -1.0,  0.0,  1.0,  1.0,  1.0,  1.0,  0.0, -1.0],
    [ -1.0,  1.0,  1.0,  1.0,  1.0,  1.0,  1.0, -1.0],
    [ -1.0,  0.5,  0.0,  0.0,  0.0,  0.0,  0.5, -1.0],
    [ -2.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -2.0]
  ],

  'r': [
    [  0.0,  0.0,  0.0,  0.0,  0.0,  0.0,  0.0,  0.0],
    [  0.5,  1.0,  1.0,  1.0,  1.0,  1.0,  1.0,  0.5],
    [ -0.5,  0.0,  0.0,  0.0,  0.0,  0.0,  0.0, -0.5],
    [ -0.5,  0.0,  0.0,  0.0,  0.0,  0.0,  0.0, -0.5],
    [ -0.5,  0.0,  0.0,  0.0,  0.0,  0.0,  0.0, -0.5],
    [ -0.5,  0.0,  0.0,  0.0,  0.0,  0.0,  0.0, -0.5],
    [ -0.5,  0.0,  0.0,  0.0,  0.0,  0.0,  0.0, -0.5],
    [  0.0,   0.0, 0.0,  0.5,  0.5,  0.0,  0.0,  0.0]
  ],

  'q': [
    [ -2.0, -1.0, -1.0, -0.5, -0.5, -1.0, -1.0, -2.0],
    [ -1.0,  0.0,  0.0,  0.0,  0.0,  0.0,  0.0, -1.0],
    [ -1.0,  0.0,  0.5,  0.5,  0.5,  0.5,  0.0, -1.0],
    [ -0.5,  0.0,  0.5,  0.5,  0.5,  0.5,  0.0, -0.5],
    [  0.0,  0.0,  0.5,  0.5,  0.5,  0.5,  0.0, -0.5],
    [ -1.0,  0.5,  0.5,  0.5,  0.5,  0.5,  0.0, -1.0],
    [ -1.0,  0.0,  0.5,  0.0,  0.0,  0.0,  0.0, -1.0],
    [ -2.0, -1.0, -1.0, -0.5, -0.5, -1.0, -1.0, -2.0]
  ],

  'k': [
    [ -3.0, -4.0, -4.0, -5.0, -5.0, -4.0, -4.0, -3.0],
    [ -3.0, -4.0, -4.0, -5.0, -5.0, -4.0, -4.0, -3.0],
    [ -3.0, -4.0, -4.0, -5.0, -5.0, -4.0, -4.0, -3.0],
    [ -3.0, -4.0, -4.0, -5.0, -5.0, -4.0, -4.0, -3.0],
    [ -2.0, -3.0, -3.0, -4.0, -4.0, -3.0, -3.0, -2.0],
    [ -1.0, -2.0, -2.0, -2.0, -2.0, -2.0, -2.0, -1.0],
    [  2.0,  2.0,  0.0,  0.0,  0.0,  0.0,  2.0,  2.0 ],
    [  2.0,  3.0,  1.0,  0.0,  0.0,  1.0,  3.0,  2.0 ]
  ]
}

var weights = {
  'p': 10,
  'n': 32,
  'b': 33,
  'r': 50,
  'q': 90,
  'k':20000
}



function mmRoot(game, depth, isMax){ 
  var legalMoves = game.moves();
  var bestMoveScore = -Infinity;
  var bestMove;
  for(let i = 0; i < legalMoves.length; i++){
    var newMove = legalMoves[i];
    game.move(newMove);
    var val = minimax(depth-1, !isMax, -Infinity, Infinity, game); //Unsure if true or false is the correct one to use.
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
        return -SearchAllCaptures(clonedGame, alpha, beta);  //SOMETHING IS WRONG, IT DOES NOT PLAY WELL. IT OFTEN OFTEN LETS US CAPTURE.
    }
    if(maximizingPlayer){
      let maxEval = -Infinity;
      for(let i = 0; i < clonedGame.moves().length; i++){
        clonedGame.move(clonedGame.moves()[i]);
        let eval = minimax(depth-1, !maximizingPlayer, alpha, beta, clonedGame);
        clonedGame.undo();
        maxEval = Math.max(eval, maxEval);
        alpha = Math.max(alpha, eval);
        if(beta<=alpha){
          break;
        } 
        return maxEval;
      }
    } else {
      let minEval = Infinity;
      for(let i = 0; i < clonedGame.moves().length; i++){
        clonedGame.move(clonedGame.moves()[i]);
        let eval = minimax(depth-1, !maximizingPlayer, alpha, beta, clonedGame);
        clonedGame.undo();
        minEval = Math.min(eval, minEval);
        beta = Math.min(beta, eval);
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


function SearchAllCaptures(game, alpha, beta) {
  let evaluationOfBoard = evaluateBoard(game.board());
  if(evaluationOfBoard >= beta){
    return beta;
  }
  alpha = Math.max(alpha, evaluationOfBoard);
  let moves = game.moves({verbose : true});
  let captureFlags = ['e', 'c'];
  let captureMoves = [];
  //Some didn't work some reason. Filters out all the capture moves. Standard capture, and en peasents.
  for(let j = 0; j < moves.length; j++){
    for(let k = 0; k < captureFlags.length; k++){
      if(moves[j].flags.includes(captureFlags[k])){
        captureMoves.push(moves[j]);
        break;
      }
    }
  }
  //let captureMoves = captureFlags.some((el) => {moves.flags.includes(el)});
  captureMoves = OrderMoves(captureMoves);
  for(let i = 0; i < captureMoves.length; i++){
    game.move(captureMoves[i]);
    evaluationOfBoard = -SearchAllCaptures(game, -beta, -alpha) /* Movie magic */
    game.undo()
  if (evaluationOfBoard >= beta){
    return beta;
  }
  alpha = Math.max(alpha, evaluationOfBoard);
  } 
  return alpha;
}

function OrderMoves(moves) { //Thank you nzhang98.
  var importances = {
    18:15,
    16:10,
    2:5
  }
  for(let i = 0; i < moves.length; i++){
    if(moves.flags in importances){
      moves[i].importance = importances[moves[i].flags];
    } else{
      moves[i].importance = 0;
    }
  }
  return moves.sort((a,b) => b.importance - a.importance);
}
