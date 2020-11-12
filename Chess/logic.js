let tiles = Array.from(document.querySelectorAll("div.tile"));
const gameOver = document.querySelector("#gameOverScreen");

let selected = false;
let selectedFigure;
let hasMoved = false;
let whiteTurn = true;
let currentTurn = "w";
let enemyTurn = "b";
let notSelectSelf = true;

let previousPosition;
let previousClassName;
let nextPosition;
let nexPos;

let availablePos = [];


tiles.forEach( (element, i) => {element.addEventListener("click", () => {select(element, i)})});



function select(clickedTile, i){

    let selectedTile = clickedTile;
    notSelectSelf = true;
    nextPosition = i;

    if(selected) movePiece(selectedTile);
    
    
    if(selectedTile.className.charAt(11) != currentTurn) return; // charAt(11) would be the team color, either 'b' or 'w'
    
    if(hasMoved) { 
        clearBoard();
        hasMoved = !hasMoved; // Prevents the square we move our figure on from being selected.
        switchTurn();
        return; 
    } 
    
    if(!selected && notSelectSelf){

        previousPosition = i;
        previousClassName = selectedTile.className;

        determineFigure();
        selectedTile.style.backgroundColor = "rgb(202, 111, 111)";
        selected = true;
        selectedFigure = selectedTile.innerHTML;
        return;
    }

}

function movePiece(selectedTile){


    let tileToMoveTo = selectedTile;

    if(!canMoveToTile(tileToMoveTo)) return;

    if(tileToMoveTo.className.substring(12) === "King") { gameOver.style.display = "flex"; willPromote = false; }

    // tile.To.Move.To get to keep it's main class (tile black / tile white) and inherit the figure class (eg. wPawn)   
    
    tileToMoveTo.innerHTML = selectedFigure;  
    tileToMoveTo.className = `${tileToMoveTo.className.substring(0,10)} ${previousClassName.substring(11)}`;

    if(willPromote) {
        promoteWindow.style.display = "flex";
    }
    
    tiles[previousPosition].innerHTML = "";                 // Clearing the previous tile and reseting it's class.
    tiles[previousPosition].style.backgroundColor ="";
    tiles[previousPosition].className = previousClassName.substring(0,10);

    selected = false;
    hasMoved = true;
    

}

function determineFigure(){

    let currentTile = tiles[previousPosition];

    if(currentTile.className.substring(11) === "wPawn") availablePosForPawn();
    if(currentTile.className.substring(11) === "bPawn") availablePosForPawn(true);
    
    switch(currentTile.className.substring(12)){

        case "Bishop": availablePosForBishop(); break;
        case "Knight": availablePosForKnight(); break;
        case "Queen":  availablePosForRook(); availablePosForBishop(true); break;
        case "King":   availablePosForKing();   break;
        case "Rook":   availablePosForRook();   break;   
    }
}


function canMoveToTile(tile){

    let currentTile = tiles[previousPosition];
    let nextTile = tile;

    if(currentTile === nextTile){

        currentTile.style.backgroundColor = "";   // Gives us the option to cancel our selection.
        selected = false;
        notSelectSelf = false;

        clearBoard();

        return false;
    }
    
    
    if(availablePos.includes(nextTile)) return true;
    
    return false;

}


function switchTurn(){

    if(whiteTurn){
        whiteTurn = !whiteTurn;
        currentTurn = "b";
        enemyTurn = "w";
        return;
    }
    
    whiteTurn = !whiteTurn;
    currentTurn = "w";
    enemyTurn = "b";

}
