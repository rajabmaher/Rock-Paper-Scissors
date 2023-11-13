const game = () => {
  let pScore = 0;
  let cScore = 0;

  // Start the Game
  const startGame = () => {
    const playBtn = document.querySelector(".intro button");
    const introScreen = document.querySelector(".intro");
    const match = document.querySelector(".match");

    playBtn.addEventListener("click", () => {
      introScreen.classList.add("fadeOut");
      match.classList.add("fadeIn");
      resetGame(); // Reset scores when starting a new game
    });
  };

  // Play Match
  const playMatch = () => {
    const options = document.querySelectorAll(".options button");
    const playerHand = document.querySelector(".player-hand");
    const computerHand = document.querySelector(".computer-hand");
    const hands = document.querySelectorAll(".hands img");

    hands.forEach(hand => {
      hand.addEventListener("animationend", function() {
        this.style.animation = "";
      });
    });

    // Computer Options
    const computerOptions = ["rock", "paper", "scissors"];

    options.forEach(option => {
      option.addEventListener("click", function() {
        // Computer Choice
        const computerNumber = Math.floor(Math.random() * 3);
        const computerChoice = computerOptions[computerNumber];

        setTimeout(() => {
          // Call compare hands
          compareHands(this.textContent, computerChoice);
          // Update Images
          playerHand.src = `./assets/${this.textContent}.png`;
          computerHand.src = `./assets/${computerChoice}.png`;
        }, 2000);
        // Animation
        playerHand.style.animation = "shakePlayer 2s ease";
        computerHand.style.animation = "shakeComputer 2s ease";
      });
    });
  };

  const updateScore = () => {
    const playerScore = document.querySelector(".player-score p");
    const computerScore = document.querySelector(".computer-score p");
    playerScore.textContent = pScore;
    computerScore.textContent = cScore;
  };

  const compareHands = (playerChoice, computerChoice) => {
    // Update Text
    const winner = document.querySelector(".winner");
    
    // Checking for a tie
    if (playerChoice === computerChoice) {
      winner.textContent = "It is a tie";
    } else {
      // Check for Rock, Paper, Scissors
      const result = determineWinner(playerChoice, computerChoice);
      winner.textContent = result;

      // Update scores
      if (result.includes("Player Wins")) {
        pScore++;
      } else if (result.includes("Computer Wins")) {
        cScore++;
      }
    }

    // Update the score display
    updateScore();

    // Check if the game is finished
    if (pScore === 5 || cScore === 5) {
      displayGameOver();
    }
  };

  const determineWinner = (player, computer) => {
    if (player === computer) {
      return "It is a tie";
    }

    if (
      (player === "rock" && computer === "scissors") ||
      (player === "paper" && computer === "rock") ||
      (player === "scissors" && computer === "paper")
    ) {
      return "Player Wins";
    } else {
      return "Computer Wins";
    }
  };

  const displayGameOver = () => {
    const match = document.querySelector(".match");
    const introScreen = document.querySelector(".intro");
    introScreen.classList.remove("fadeOut");
    match.classList.remove("fadeIn");
    
    // Ask if the player wants to play again
    const playAgain = confirm("Do you want to play again?");
    
    if (playAgain) {
      resetGame();
    }
  };

  const resetGame = () => {
    pScore = 0;
    cScore = 0;
    updateScore();
    const winner = document.querySelector(".winner");
    winner.textContent = "";
    const gameOverText = document.querySelector(".game-over-text");
    gameOverText.textContent = "";
  };

  // Call all the inner functions
  startGame();
  playMatch();
};

// Start the game function
game();
