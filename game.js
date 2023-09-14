const cells = document.querySelectorAll(".cell");
let player = 1;
let board = document.getElementById("board");
const restart=document.getElementById("restart");
restart.addEventListener('click',restartgame);
let p1=document.getElementById("p1");
let p2=document.getElementById("p2");
let points1=0;
let points2=0;
let result=document.getElementById("result");
let status=document.getElementById("status");


cells.forEach((cell, index) => {
    cell.addEventListener('click', () => clicked(index));
});

function clicked(index) {
    const cell = document.getElementById(`c${index}`);
    if (cell.innerHTML === "") {
        if (player === 1) {
            player = 2;
            cell.innerHTML = "<h3 class='x'>X</h3>";
            status.innerHTML="<h2 class='statext' style='color: #2ACA55;'>Player 2</h2>";
            
            
        } else {
            player = 1;
            cell.innerHTML = "<h3 class='o'>O</h3>";
            status.innerHTML="<h2 class='statext' style='color: #E42330;'>Player 1</h2>";
            
            
        }
    }
    win();
}

function win() {
    // Get the content of each cell at the current moment
    const cellContents = [
        document.getElementById("c0").innerText,
        document.getElementById("c1").innerText,
        document.getElementById("c2").innerText,
        document.getElementById("c3").innerText,
        document.getElementById("c4").innerText,
        document.getElementById("c5").innerText,
        document.getElementById("c6").innerText,
        document.getElementById("c7").innerText,
        document.getElementById("c8").innerText,
    ];

    // Check for win conditions
    if (
        (cellContents[0] === cellContents[1] && cellContents[1] === cellContents[2] && cellContents[0] !== "") || // Row 1
        (cellContents[3] === cellContents[4] && cellContents[4] === cellContents[5] && cellContents[3] !== "") || // Row 2
        (cellContents[6] === cellContents[7] && cellContents[7] === cellContents[8] && cellContents[6] !== "") || // Row 3
        (cellContents[0] === cellContents[3] && cellContents[3] === cellContents[6] && cellContents[0] !== "") || // Column 1
        (cellContents[1] === cellContents[4] && cellContents[4] === cellContents[7] && cellContents[1] !== "") || // Column 2
        (cellContents[2] === cellContents[5] && cellContents[5] === cellContents[8] && cellContents[2] !== "") || // Column 3
        (cellContents[0] === cellContents[4] && cellContents[4] === cellContents[8] && cellContents[0] !== "") || // Diagonal from top-left to bottom-right
        (cellContents[2] === cellContents[4] && cellContents[4] === cellContents[6] && cellContents[2] !== "")    // Diagonal from top-right to bottom-left
    ) {
        let wonPlayer;
        if (player ==2){
            wonPlayer = 1;
            status.innerHTML="<h2 class='statext' style='color: #D69A51;'>Player 1 Won!</h2>";
            
            points1 += 100;
            updateScore();
            setTimeout(restartgame, 5000);
        }
        else if(!wonPlayer && draw()){
            console.log("It's a draw!");
            status.innerHTML="<h2 class='statext' style='color: #D69A51;'>It's a Draw!</h2>";
            
            points1 += 50;
            points2 += 50;
            updateScore();
            setTimeout(restartgame, 5000);
            return;
        }
        else {
            wonPlayer = 2;
            status.innerHTML="<h2 class='statext' style='color: #D69A51;'>Player 2 Won!</h2>";
            
            points2 += 100;
            updateScore();
            setTimeout(restartgame, 5000);
        }
        console.log("player"+ wonPlayer+ " won!");
    }
    function draw() {
        for (let i = 0; i < 9; i++) {
            if (cellContents[i] === "") {
                return false;
            }
        }
        console.log("It's a draw!");
        status.innerHTML="<h2 class='statext' style='color: #D69A51;'>It's a Draw!</h2>";
        
        return true;
    }
    draw();
}
function restartgame(){
    cells.forEach(cell => {
        cell.innerHTML = "";
    });
    player=1;
    console.clear;
    status.innerHTML="<h2 class='statext' style='color: #2ACA55;'></h2>";
    status.innerHTML="<h2 class='statext' style='color: #E42330;'>Player 1</h2>";
    
}
function updateScore(){
    p1.innerHTML= `Points: ${points1}`;
    p2.innerHTML= `Points: ${points2}`;
}
