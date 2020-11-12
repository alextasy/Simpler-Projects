let board = document.querySelector("#board");
let winM = document.querySelector("#winning-message");
let circleTurn = false;
let message;
board.className = "board x";


function markSquare(element){
    
    element.className = switchTurn();
    element.removeAttribute("onclick")

    if(checkForWin() === "win"){
         winM.style.display = "flex";
         winM.firstElementChild.innerText = message;
        }
    if(checkForWin() === "draw"){
        winM.style.display = "flex";
        winM.firstElementChild.innerText = "It's a draw!";
       }

}

function switchTurn(){

    circleTurn = !circleTurn;
   
    if(circleTurn) {
        board.className = "board circle";
        message = "X's win!"
        return "cell x";
    }

    message = "O's win!"
    board.className = "board x";
    return "cell circle";

}

function checkForWin(){

  let cells =  Array.from(board.children).map(index => index.className);

  topRowMatch = (cells[0] === cells[1] && cells[1] === cells[2] && cells[0] != "cell");
  midRowMatch = (cells[3] === cells[4] && cells[4] === cells[5] && cells[3] != "cell");
  botRowMatch = (cells[6] === cells[7] && cells[7] === cells[8] && cells[6] != "cell");
 
  leftColMatch = (cells[0] === cells[3] && cells[3] === cells[6] && cells[0] != "cell");
  midColMatch = (cells[1] === cells[4] && cells[4] === cells[7] && cells[1] != "cell");
  rightColMatch = (cells[2] === cells[5] && cells[5] === cells[8] && cells[2] != "cell");

  diagLeftToRight = (cells[0] === cells[4] && cells[4] === cells[8] && cells[0] != "cell");
  diagRightToLeft = (cells[2] === cells[4] && cells[4] === cells[6] && cells[2] != "cell");

  boardIsFull = (cells[0] != "cell" && cells[1] != "cell" && cells[2] != "cell" && 
                 cells[3] != "cell" && cells[4] != "cell" && cells[5] != "cell" && 
                 cells[6] != "cell" && cells[7] != "cell" && cells[8] != "cell");

  if(topRowMatch || midRowMatch || botRowMatch   ||
    leftColMatch || midColMatch || rightColMatch ||
    diagLeftToRight || diagRightToLeft) return "win";

  if(boardIsFull) return "draw";

  return;

}

function restart(){

    Array.from(board.children).forEach(item => item.className = "cell");
    Array.from(board.children).forEach(item => item.setAttribute("onclick", "markSquare(this)"));
    winM.style.display = "none";

}