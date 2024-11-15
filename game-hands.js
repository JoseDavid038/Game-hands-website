let result;
      let score = JSON.parse(localStorage.getItem('score')) || {
          wins : 0,
          ties : 0,
          losses : 0
         }

      document.querySelector('.js-score-paragraph').innerHTML = `Wins: ${score.wins}, Ties: ${score.ties}, Losses: ${score.losses}`;

      function moveMachine(){
        let moveMachine = Math.floor(Math.random()*3);
        if (moveMachine ===0){
          moveMachine = 'rock';
        }else if (moveMachine ===1){
          moveMachine = 'paper';
        }else if (moveMachine === 2){
          moveMachine = 'scissors';
        }
        console.log(moveMachine);
        return moveMachine;
      }
      
     
      function resultGame(movePlayer,moveMachine){
        let result;
        if (movePlayer === 'rock' && moveMachine === 'rock'){
            result = 'You tie.';
        }else if (movePlayer === 'rock' && moveMachine === 'paper'){
            result = 'You lose.';
        }else if (movePlayer === 'rock' && moveMachine === 'scissors'){
            result = 'You win.';
        }else if (movePlayer === 'paper' && moveMachine === 'rock'){
            result = 'You win.';
        }else if (movePlayer === 'paper' && moveMachine === 'paper'){
            result = 'You tie.';
        }else if (movePlayer === 'paper' && moveMachine === 'scissors'){
            result = 'You lose.';
        }else if (movePlayer === 'scissors' && moveMachine === 'rock'){
            result = 'You lose.';
        }else if (movePlayer === 'scissors' && moveMachine === 'paper'){
            result = 'You win.';
        }else if (movePlayer === 'scissors' && moveMachine === 'scissors'){
            result = 'You tie.';
        }
        // console.log(result);
        document.querySelector('.js-result-paragraph').innerHTML = result;
        document.querySelector('.js-moves-paragraph').innerHTML = `You <img src = "assets/${movePlayer}.png" class="move-icon">
        <img src="assets/${moveMachine}.png" class="move-icon">Computer`;
        return result;
      }

      document.querySelector('.js-move-rock').addEventListener('click', () => {
        scoreGame(resultGame('rock',moveMachine()));
      })

      document.querySelector('.js-move-paper').addEventListener('click', () => {
        scoreGame(resultGame('paper',moveMachine()));
      })

      document.querySelector('.js-move-scissors').addEventListener('click', () => {
        scoreGame(resultGame('scissors',moveMachine()));
      })


      function scoreGame(result){
         if (result === 'You win.'){
          score.wins +=1;
         }else if (result === 'You tie.'){
          score.ties +=1;
         }else if (result === 'You lose.'){
          score.losses +=1;
         }
         localStorage.setItem('score',JSON.stringify(score));
        //  console.log(score);
         document.querySelector('.js-score-paragraph').innerHTML = `Wins: ${score.wins}, Ties: ${score.ties}, Losses: ${score.losses}`;
         return score;
      }


      function resetScore(){
        score = {
          wins : 0,
          ties : 0,
          losses : 0
         };
        document.querySelector('.js-result-paragraph').innerHTML = '';
        document.querySelector('.js-moves-paragraph').innerHTML = '';
        document.querySelector('.js-score-paragraph').innerHTML = `Wins: ${score.wins}, Ties: ${score.ties}, Losses: ${score.losses}`;
        localStorage.removeItem('score');
      }

      let isAutoPlaying = false;
      let intervalId;

      function autoPlay(){
      
        if (!isAutoPlaying){
          intervalId = setInterval(function() { 
            const playerMove = moveMachine();
            scoreGame(resultGame(playerMove,moveMachine()));
          },1000);
          isAutoPlaying = true;
        }else{
          clearInterval(intervalId);
          isAutoPlaying = false;
        }
      }