const GAME = document.getElementById('icons');
const RESET = document.getElementById('reset');
let CLONE = undefined;
let gamesWon = 0;
const ICONS = {
    rock : document.getElementById('rock'),
    paper : document.getElementById('paper'),
    scissors : document.getElementById('scissors')
}

GAME.addEventListener('click', (e) => {
    if(e.target.tagName == "SPAN"){
        startGame(e);
    }
});

RESET.onclick = () => {
    for (const [key, value] of Object.entries(ICONS)) {
        value.style.display = 'inline-block';
    }
    if(CLONE != undefined){
        CLONE.remove();
        CLONE = undefined;
    }
    RESET.style.display = 'none';
    console.log('reset');
}

function startGame(e){
    let picks = [];
    picks.push(e.target.id);
    picks.push(housePick());
    showPicks(picks);
    const gameState = gameResult(picks);
    RESET.style.display = 'inherit';
    console.log(`player picked: ${picks[0]}\nhouse picked: ${picks[1]}\n${gameState}`);
}

function showPicks(picks){
    for (const [key, value] of Object.entries(ICONS)) {
        if(!picks.includes(key))
            value.style.display = 'none';
    }
    if(picks[0] == picks[1]){
        CLONE = document.getElementById(picks[0]).cloneNode(true);
        document.getElementById('icons').appendChild(CLONE);
    }
}

function housePick(){
    const iconArray = ['rock', 'paper', 'scissors'];
    return iconArray[Math.floor(Math.random() * 3)];
}

function gameResult(picks){
    if(picks[0] == picks[1])
        return 'Its a tie!';
    else{
        let won = false;
        switch(picks[0]){
            case 'rock':
                if(picks[1] == 'scissors')
                    won = true;
                break;
            case 'paper':
                if(picks[1] == 'rock')
                    won = true;
                break;
            case 'scissors':
                if(picks[1] == 'paper')
                    won = true;
                break;
        }
        if(won)
            return 'Player wins!';
        else
            return 'House wins!';
    }
}