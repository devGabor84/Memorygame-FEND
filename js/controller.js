const controller = {
  getCards: function() {
    return model.cards;
  },

  shuffleCards: function() {
    model.cards.sort(() => 0.5 - Math.random());
  },

  setFirstGuess: function(card, element) {
    card.opened = true;
    card.element = element;
    model.firstGuess = card;
  },

  setSecondGuess: function(card, element) {
    card.opened = true;
    card.element = element;
    model.secondGuess = card;
  },

  resetGuesses: function() {
    model.firstGuess = null;
    model.secondGuess = null;
  },

  unmatched: function() {
    cardView.closeCards(model.firstGuess.element, model.secondGuess.element);
    model.firstGuess.opened = false;
    model.secondGuess.opened = false;
  },

  cardMatch: function(card, element) {
    if (model.firstGuess & model.secondGuess || card.opened) {
      return;
    } else if (!model.firstGuess) {
      controller.setFirstGuess(card, element);
      cardView.openCard(element);
    } else {
      controller.setSecondGuess(card, element);
      cardView.openCard(element);
      if (model.firstGuess.type !== model.secondGuess.type) {
        controller.unmatched();
      } else {
        model.openedCards += 2;
      }
      controller.resetGuesses();
      model.playerMoves += 1;
      gameBoardView.render();
    }
  },

  gameStart: function() {
    if (!model.gameStarted) {
      timer.startTimer();
      model.gameStarted = true;
    }
  },

  checkGameStatus: function() {
    if (model.openedCards === model.cards.length) {
      controller.finishGame();
    }
  },

  finishGame: function() {
    timer.stopTimer();
    modalView.render();
  },

  startNewGame: function() {
    model.playerMoves = 0;
    model.gameStarted = false;
    model.openedCards = 0;
    controller.resetCards();
    modalView.closeModal();
    deckView.render();
    timer.reset();
    gameBoardView.reset();
    gameBoardView.render();
  },

  resetCards: function() {
    const cards = controller.getCards();
    for (let card of cards) {
      card.opened = false;
      card.element = null;
    }
  }
};
