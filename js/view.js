const deckView = {
  render: function() {
    controller.shuffleCards();

    const cards = controller.getCards();
    const cardCont = document.querySelector(".cardContainer");
    let cardClass;
    let i;
    cardCont.innerHTML = "";

    for (i = 0; i < cards.length; i++) {
      const cardContainer = document.querySelector(".cardContainer");
      const card = document.createElement("i");
      const li = document.createElement("li");

      li.className = "card";
      cardClass = cards[i].type;
      card.className = cardClass;

      li.addEventListener(
        "click",
        (function(cardcopy) {
          return function() {
            controller.cardMatch(cardcopy, event.target);
            controller.gameStart();
            controller.checkGameStatus();
          };
        })(cards[i], event)
      );

      li.appendChild(card);
      cardContainer.appendChild(li);
    }
  }
};

const cardView = {
  openCard: function(element) {
    element.classList.add("opened");
  },

  closeCards: function(firstGuess, secondGuess) {
    setTimeout(function() {
      firstGuess.classList.remove("opened");
      secondGuess.classList.remove("opened");
    }, 1000);
  }
};

const gameBoardView = {
  init: function() {
    this.movesElement = document.querySelector(".moves");
    this.starsElement = document.querySelectorAll(".icon");
    this.movesElement.innerHTML = "0 moves";
  },

  render: function() {
    this.movesElement.innerHTML = model.playerMoves + " moves";
    if (model.playerMoves > 8 && model.playerMoves < 16) {
      this.starsElement[0].style.opacity = "0";
    } else if (model.playerMoves > 16 && model.playerMoves < 24) {
      this.starsElement[1].style.opacity = "0";
    } else if (model.playerMoves > 24 && model.playerMoves < 32) {
      this.starsElement[2].style.opacity = "0";
    } else if (model.playerMoves > 32) {
      this.starsElement[3].style.opacity = "0";
    }
  },

  reset: function() {
    for (let element of this.starsElement) {
      element.style.opacity = "1";
    }
  }
};

const modalView = {
  init: function() {
    this.modal = document.querySelector(".modal-overlay");
    this.timer = document.querySelector("#timer");
    this.moves = document.querySelector("#moves");
    this.btn = document.querySelector(".btn-reset");

    this.btn.addEventListener("click", function() {
      controller.startNewGame();
    });
  },

  render: function() {
    this.timer.innerHTML =
      timer.hours + "h " + timer.minutes + "min " + timer.seconds + "sec";
    this.moves.innerHTML = model.playerMoves;
    this.modal.classList.add("active");
  },

  closeModal: function() {
    this.modal.classList.remove("active");
  }
};

class TimerView {
  constructor() {
    this.timerDisplay = document.querySelector(".timer");
    this.hours = 0;
    this.minutes = 0;
    this.seconds = 0;
  }

  init() {
    this.timerDisplay.innerHTML =
      this.hours + "h " + this.minutes + "min " + this.seconds + "sec";
  }

  startTimer() {
    const boundTimer = function() {
      this.timerDisplay.innerHTML =
        this.hours + "h " + this.minutes + "min " + this.seconds + "sec";
      this.seconds++;
      if (this.seconds == 60) {
        this.minutes++;
        this.seconds = 0;
      }
      if (this.minutes == 60) {
        this.hours++;
        this.minutes = 0;
      }
    }.bind(this);
    this.interval = setInterval(boundTimer, 1000);
  }

  stopTimer() {
    clearInterval(this.interval);
  }

  reset() {
    this.hours = 0;
    this.minutes = 0;
    this.seconds = 0;
  }
}
