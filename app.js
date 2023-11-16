/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

var scores, roundScore, activePlayer, gamePlaying, lastRoll;

Initialize();


document.querySelector('.btn-roll').addEventListener('click', function() {
    
    if (gamePlaying) {
        
        // 1. Randome number
        var dice0 = Math.floor(Math.random() * 6) + 1;
        var dice1 = Math.floor(Math.random() * 6) + 1;

        // 2. Display the result
        document.getElementById('dice-0').style.display = 'block';
        document.getElementById('dice-1').style.display = 'block';
        document.getElementById('dice-0').src = 'dice-' + dice0 + '.png';
        document.getElementById('dice-1').src = 'dice-' + dice1 + '.png';

        // if current roll and last roll are a 6 player looses total score
        if ((dice0 === 6 && lastRoll === 6) ||  (dice0 === 6 && dice1 === 6)) {
            // Update the ui
            scores[activePlayer] = 0;
            document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];
            // Next player
            nextPlayer();
        }
        
        // 3. update the round score if the rolled number was not a 1
        if ((dice0 !== 1) && (dice1 !== 1)) {
            //Add score
            roundScore += dice0 + dice1;
            document.querySelector('#current-' + activePlayer).textContent = roundScore;
            
        } else {
            // Next player
            nextPlayer();
        }
        
        lastRoll = dice1;
    }
});

document.querySelector('.btn-hold').addEventListener('click', function() {
    if (gamePlaying) {
        // Add current score to global score
        scores[activePlayer] += roundScore;

        // Update the ui
        document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];

        var input = document.querySelector('.final-score').value;
        var winningScore;
        
        if (input) {
            winningScore = input;
        } else {
            winningScore = 100;
        }
        
        // Check if player won the game
        if (scores[activePlayer] >= winningScore) {
            document.querySelector('#name-' + activePlayer).textContent = 'Winner!';
            hideDice();
            document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
            document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
            gamePlaying = false;
        } else {

            // next player 
            nextPlayer();

        }
    }
});

function nextPlayer() {
    //next player
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
    roundScore = 0;
    lastRoll = 0;

    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';

    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');

    hideDice();
    
}

document.querySelector('.btn-new').addEventListener('click', Initialize);

function Initialize() {
    scores = [0,0];
    roundScore = 0;
    activePlayer = 0;
    lastRoll = 0;
    gamePlaying = true;
    
    hideDice();

    document.getElementById('score-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';
    document.querySelector('#name-0').textContent = 'Player 1';
    document.querySelector('#name-1').textContent = 'Player 2';
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.add('active');
}

function hideDice() {
    document.getElementById('dice-0').style.display = 'none';
    document.getElementById('dice-1').style.display = 'none';
}



