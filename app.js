/////////////////////////////////////////////////////////////////////////////
/*
Game Rules:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLOBAL score. 
- After that, it's the next player's turn
- Add another dice to the game, so that there are two dices now. The player looses his current score when one of them is a 1. 
- The first player to reach maximum entered points on GLOBAL score wins the game
*/ 

///////////////////////////////////////////////////////////////////////////
// Global variables
var dice1, dice2, winningScore, scores, roundScore, activePlayer, gamePlaying;

init();


// Implementing Roll Dice Functionality
document.querySelector('.btn-roll').addEventListener('click', function() 
{
    if(gamePlaying) 
    {
        // 1. Generate a random dice numbers
        dice1 = Math.floor(Math.random() * 6) + 1;
        dice2 = Math.floor(Math.random() * 6) + 1;

        //2. Display the result
        document.getElementById('dice-1').style.display='block';
        document.getElementById('dice-2').style.display='block';

        document.getElementById('dice-1').src = 'dice-' + dice1 + '.png';
        document.getElementById('dice-2').src = 'dice-' + dice2 + '.png';

        // Player loses game if either of the dices are 1
        if (dice1 !== 1 && dice2 !== 1 ) 
        {
            //Add score
            roundScore += (dice1+dice2);
            document.querySelector('#current-' + activePlayer).textContent = roundScore;
        } 

        else 
        {
            //Next player
            nextPlayer();
        }

    }    

});


// Implementing Hold Functionality
document.querySelector('.btn-hold').addEventListener('click', function() 
{
    if (gamePlaying) 
    {
        // Add current score to global score
        scores[activePlayer] += roundScore;

        // Update the UI
        document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];

        // Winning Score
        winningScore = document.querySelector(".final-score").value;
        if(winningScore === null)
        {
            winningScore = 100;
        }

        // Check if player has won the game
        if (scores[activePlayer] >= winningScore) 
        {
            document.querySelector('#name-' + activePlayer).textContent = 'Winner!';

            document.getElementById('dice-1').style.display = 'none';
            document.getElementById('dice-2').style.display = 'none';
        

            document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
            document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
            gamePlaying = false;
        } 
        else 
        {
            //Next player
            nextPlayer();
        }

    }

});


// Implementing New Game Functionality
document.querySelector('.btn-new').addEventListener('click', init);



// Toggling to Next Player 
function nextPlayer() 
{
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
    roundScore = 0;

    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';

    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');

    document.getElementById('dice-1').style.display = 'none';
    document.getElementById('dice-2').style.display = 'none';

}



// Initialize a new game
function init() 
{
    scores = [0, 0]; //To keep track of scores of both players
    activePlayer = 0;
    roundScore = 0; //Score for the current round
    gamePlaying = true;

  
    document.getElementById('dice-1').style.display = 'none';
    document.getElementById('dice-2').style.display = 'none';

    document.getElementById('score-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';

    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';

    document.getElementById('name-0').textContent = 'Player 1';
    document.getElementById('name-1').textContent = 'Player 2';

    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');

    document.querySelector('.player-0-panel').classList.add('active');


}
