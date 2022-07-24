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


var posCount = 0;
var posS = 0;
function mmRoot(game, depth, isMax){ 
  var startime = performance.now();

  var legalMoves = game.moves();
  var bestMoveScore = -Infinity;
  var bestMove;
  for(let i = 0; i < legalMoves.length; i++){
    var newMove = legalMoves[i];
    game.move(newMove);
    var val = minimax(depth-1, !isMax, -Infinity, Infinity, game);
    game.undo();
    if(val >= bestMoveScore){
      bestMoveScore = val;
      bestMove = newMove;
    }
  }

  var endtime = performance.now();
  var timeDiff = endtime-startime;
  timeDiff/=1000;
  console.log("Positions evaluated: " + posCount);
  console.log("Positions evaluated per second: "+posCount/timeDiff);
  return [bestMove, bestMoveScore];
};


function minimax(depth, maximizingPlayer, alpha, beta, clonedGame){
  posCount++;
  if(depth === 0 || clonedGame.game_over() || clonedGame.moves().length === 0){
     return -evaluateBoard(clonedGame.board());//-SearchAllCaptures(clonedGame, alpha, beta);
  }
  var orderedMovies = OrderMoves(clonedGame.moves({verbose:true}),clonedGame.board());
  if(maximizingPlayer){
    let maxEval = -Infinity;
    for(let i = 0; i < orderedMovies.length; i++){
      clonedGame.move(orderedMovies[i]);
      let eval = minimax(depth-1, !maximizingPlayer, alpha, beta, clonedGame);
      clonedGame.undo();
      maxEval = Math.max(eval, maxEval);
      alpha = Math.max(alpha, maxEval);
      if(beta<=alpha){
        return maxEval;
      } 
    }
    return maxEval;
  }
  else {
    let minEval = Infinity;
    for(let i = 0; i < orderedMovies.length; i++){
      clonedGame.move(orderedMovies[i]);
      let eval = minimax(depth-1, !maximizingPlayer, alpha, beta, clonedGame);
      clonedGame.undo();
      minEval = Math.min(eval, minEval);
      beta = Math.min(beta, minEval);
      if(beta<=alpha){
        return minEval;
      }
    }
    return minEval;
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
  for(let j = 0; j < moves.length; j++){ //Filter out only captures.
    for(let k = 0; k < captureFlags.length; k++){
      if(moves[j].flags.includes(captureFlags[k])){
        captureMoves.push(moves[j]);
        break;
      }
    }
  }
  //let captureMoves = captureFlags.some((el) => {moves.flags.includes(el)});
  captureMoves = OrderMoves(captureMoves, game.board());
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

function OrderMoves(moves,game) {
  var orderedMoves = moves;
  for(let i = 0; i < moves.length; i++){ //Associate values with the moves.
    var toBeCaptured = moves[i].from; //Returns cordinates of the pieces. Needs to turn into array before indexingI believe.
    var attacking = moves[i].to;
    var capX = chessCordToXY(toBeCaptured)[0];
    var capY = chessCordToXY(toBeCaptured)[1];
    var aX = chessCordToXY(attacking)[0];
    var aY = chessCordToXY(attacking)[1];
    moves[i].importance=0; 
    if(attacking!== null) {moves[i].importance += (10*getPieceValue(game[capX][capY],capX,capY))-getPieceValue(game[aX][aY],aX,aY);} //Prioritise attackng valuable using low val of ours.
    if(moves[i].flags.includes("p")) {moves[i].importance+=getPieceValue(game[aX][aY],aX,aY);}
  }
  orderedMoves.sort((a,b)=>{return b.importance-a.importance}); //Order them according to the values.
  return orderedMoves;
}

function chessCordToXY(cord){
  var chars = Array.from(cord);
  let x = chars[0].charCodeAt(0)-97; //Convert letter to x cordinate. A=0, B=1, ....
  let y = parseInt(chars[1],10)-1; //Chess starts at 1, -1 to get to zero.
  return [x,y];
}