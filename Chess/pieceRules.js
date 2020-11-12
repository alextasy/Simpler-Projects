const promoteWindow = document.querySelector("#transform");
let willPromote;

let promotedInnerHTML;
let promotedClass;

const firstRow = [56, 57, 58, 59, 60, 61, 62, 63];
const eigthRow = [0, 1, 2, 3, 4, 5, 6, 7];
const leftBorder = [0, 8, 16, 24, 32, 40, 48, 56];
const rightBorder = [7 , 15 , 23 , 31, 39, 47, 55, 63];


function clearBoard(){
   
    availablePos.forEach(element => element.style.backgroundColor = "");
    availablePos = null;
}



function availablePosForPawn(isBlack){

    pos = previousPosition;
    availablePos = [];
    let black = isBlack;

    let secondRow = [48, 49, 50, 51, 52, 53, 54, 55];
    let seventhRow = [8, 9, 10, 11, 12, 13, 14, 15];

    let isAtLeftBorder = (leftBorder.includes(pos));
    let isAtRightBorder = (rightBorder.includes(pos));


    if(black) pos += 8;
    else pos -= 8;

    
    if(firstRow.includes(pos) || eigthRow.includes(pos)) willPromote = true;

    if(tiles[pos -1].className.charAt(11) == enemyTurn && !isAtLeftBorder){ 
        availablePos[0] = tiles[pos -1];                        
        tiles[pos -1].style.backgroundColor = "rgb(159, 211, 235)";
     }                                                              // Checks for enemy diagonally 1 tile.
    if(tiles[pos +1].className.charAt(11) == enemyTurn && !isAtRightBorder) {
        availablePos[1] = tiles[pos +1];
        tiles[pos +1].style.backgroundColor = "rgb(159, 211, 235)";
    }
        

    if(tiles[pos].className.charAt(11) == currentTurn ||
       tiles[pos].className.charAt(11) == enemyTurn) return;

    tiles[pos].style.backgroundColor = "rgb(159, 211, 235)";
    availablePos[2] = tiles[pos]; 
    
    if((secondRow.includes(previousPosition) && !black) || (seventhRow.includes(previousPosition) && black)) {

        if(black) pos += 8;
        else pos -= 8;

        if(tiles[pos].className.charAt(11) == currentTurn ||    // Checks for blocking pieces.
        tiles[pos].className.charAt(11) == enemyTurn) return;
        
        tiles[pos].style.backgroundColor = "rgb(200, 203, 251)";
        availablePos[3] = tiles[pos];

    }

}

function promotePawn(choice){

    let classToPromoTo = choice;
    let pawnSide = tiles[nextPosition].className;
    
    classType = `${pawnSide.substring(11,12)}${classToPromoTo}`// Combines the fig that moved's team ("w" / "b") and the clicked button class.
    classToPromoTo = `${pawnSide.substring(0,12)}${classToPromoTo}` // Combines the type of tile and the type of figure.


    switch(classType){

        case "bRook": promotedInnerHTML   = "&#9820;"; break;
        case "bKnight": promotedInnerHTML = "&#9822;"; break;
        case "bBishop": promotedInnerHTML = "&#9821;"; break;
        case "bQueen": promotedInnerHTML  = "&#9819;"; break;
        
        case "wRook": promotedInnerHTML   = "&#9814;"; break;
        case "wKnight": promotedInnerHTML = "&#9816;"; break;
        case "wBishop": promotedInnerHTML = "&#9815;"; break;
        case "wQueen": promotedInnerHTML  = "&#9813;"; break;

    }
    promotedClass = classToPromoTo;
    promoteWindow.style.display = "none";
    tiles[nextPosition].innerHTML = promotedInnerHTML;
    tiles[nextPosition].className = promotedClass;
    willPromote = false;

}


function availablePosForBishop(queen){

   if(!queen) availablePos = [];

    let posL = previousPosition;
    let posR = previousPosition;
    let posBL = previousPosition;
    let posBR = previousPosition;
    

    let i = 20; // Counter for the array elements.

    while(posL - 9 > 0){
        
        if(posL % 8 === 0) break; // Checks if piece is already at the left border.

        i++;
        posL -= 9;

        if(tiles[posL].className.charAt(11) == currentTurn) break; // Checks for allies and breaks one pos before that.

        tiles[posL].style.backgroundColor = "rgb(159, 211, 235)";
        availablePos[i] = tiles[posL];

        if(posL % 8 === 0) break; // Checks for the left border of the board.
        if(tiles[posL].className.charAt(11) == enemyTurn) break; // Checks for enemies and makes it the last available position.
    }

    i++;

    while(posR - 7 > 0){
       
        if(rightBorder.includes(posR)) break; // Checks if piece is at right border already.
        
        i++;
        posR -= 7;

        if(tiles[posR].className.charAt(11) == currentTurn) break; // Checks for allies and breaks one pos before that.

        tiles[posR].style.backgroundColor = "rgb(159, 211, 235)";
        availablePos[i] = tiles[posR];

        if(rightBorder.includes(posR)) break; // Checks for right border of the board.

        if(tiles[posR].className.charAt(11) == enemyTurn) break; // Checks for enemies and makes it the last available position.

    }
    i++;

   while(posBR + 9 < 64){
       
        if(rightBorder.includes(posBR)) break; // Checks if piece is at right border already.

        i++;
        posBR += 9;

        if(tiles[posBR].className.charAt(11) == currentTurn) break; // Checks for allies and breaks one pos before that.

        tiles[posBR].style.backgroundColor = "rgb(159, 211, 235)";
        availablePos[i] = tiles[posBR];

        if(rightBorder.includes(posBR)) break; // Checks for right border of the board.
        
        if(tiles[posBR].className.charAt(11) == enemyTurn) break; // Checks for enemies and makes it the last available position.
    }

    i++;

    
    while(posBL + 7 < 64){
        
       
        if(posBL % 8 === 0) break; // Checks if piece is already at the left boarder.

        i++;
        posBL += 7;

        if(tiles[posBL].className.charAt(11) == currentTurn) break; // Checks for allies and breaks one pos before that.

        tiles[posBL].style.backgroundColor = "rgb(159, 211, 235)";
        availablePos[i] = tiles[posBL];

        if(posBL % 8 === 0) break; // Checks for the left border of the board.

        if(tiles[posBL].className.charAt(11) == enemyTurn) break; // Checks for enemies and makes it the last available position.

    } 
}

function availablePosForRook(){
   
    availablePos = [];

    let posU = previousPosition;
    let posR = previousPosition;
    let posL = previousPosition;
    let posB = previousPosition;

    

    let i = 0;

    while(!eigthRow.includes(posU)){

        i++;
        posU -=8;

        if(tiles[posU].className.charAt(11) == currentTurn) break; // Checks for allies and breaks one pos before that.

        tiles[posU].style.backgroundColor = "rgb(159, 211, 235)";
        availablePos[i] = tiles[posU];

        if(tiles[posU].className.charAt(11) == enemyTurn) break; // Checks for enemies and makes it the last available position.

    } 

    i++;

    while(!firstRow.includes(posB)){
        
        i++;
        posB +=8;

        if(tiles[posB].className.charAt(11) == currentTurn) break; // Checks for allies and breaks one pos before that.

        tiles[posB].style.backgroundColor = "rgb(159, 211, 235)";
        availablePos[i] = tiles[posB];

        if(tiles[posB].className.charAt(11) == enemyTurn) break; // Checks for enemies and makes it the last available position.

    } 

    i++;

    while(!leftBorder.includes(posL)){
        
        i++;
        posL -= 1;

        if(tiles[posL].className.charAt(11) == currentTurn) break; // Checks for allies and breaks one pos before that.

        tiles[posL].style.backgroundColor = "rgb(159, 211, 235)";
        availablePos[i] = tiles[posL];

        if(tiles[posL].className.charAt(11) == enemyTurn) break; // Checks for enemies and makes it the last available position.

    } 

    i++;

    while(!rightBorder.includes(posR)){
        
        i++;
        posR +=1;

        if(tiles[posR].className.charAt(11) == currentTurn) break; // Checks for allies and breaks one pos before that.

        tiles[posR].style.backgroundColor = "rgb(159, 211, 235)";
        availablePos[i] = tiles[posR];

        if(tiles[posR].className.charAt(11) == enemyTurn) break; // Checks for enemies and makes it the last available position.

    } 

}

function availablePosForKing(){

    let pos = previousPosition - 10;  // Starts cheking from left diagonal clock-wise.
    availablePos = [];                 

    for(let i = 0; i < 9; i++){

        pos++;

        if(i === 3) pos = previousPosition - 1;
        if(i === 6) pos = previousPosition + 7;

        let preventLeft = (i === 0 || i === 3 || i === 6)   // Prevents for positions to spill over at the other side of the board.
        let preventRight = (i === 2 || i === 5 || i === 8)


        if(leftBorder.includes(previousPosition) && preventLeft) continue;
        if(rightBorder.includes(previousPosition) && preventRight) continue;
        if(pos > 63) continue;
        if(pos < 0) continue;

        if(pos === previousPosition) continue;
        if(tiles[pos].className.charAt(11) == currentTurn) continue;

        tiles[pos].style.backgroundColor = "rgb(159, 211, 235)";
        availablePos[i] = tiles[pos];
    }
}
function availablePosForKnight(){


    availablePos = [];  
    
    const secondCol = [1, 9, 17, 25, 33, 41, 49, 57];
    const seventhCol = [6, 14, 22, 30, 38, 46, 54, 62];

    for(let i = 0; i < 8; i++){

        let pos = previousPosition;

        switch(i){

            case 0: if(secondCol.includes(pos) || leftBorder.includes(pos)) continue; pos -= 10; break;
            
            case 1: if(secondCol.includes(pos) || leftBorder.includes(pos)) continue; pos += 6; break;
            
            case 2: if(leftBorder.includes(pos)) continue; pos -= 17; break;

            case 3: if(leftBorder.includes(pos)) continue; pos += 15; break;
            
            case 4: if(seventhCol.includes(pos) || rightBorder.includes(pos)) continue; pos -= 6; break;
           
            case 5: if(seventhCol.includes(pos) || rightBorder.includes(pos)) continue; pos += 10; break;
            
            case 6: if(rightBorder.includes(pos)) continue; pos += 17; break;
           
            case 7: if(rightBorder.includes(pos)) continue; pos -= 15; break;

        }

        if(pos < 0 || pos > 63) continue;

        if(tiles[pos].className.charAt(11) == currentTurn) continue;

        tiles[pos].style.backgroundColor = "rgb(159, 211, 235)";
        availablePos[i] = tiles[pos];
    }

}