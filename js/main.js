var deck = [
  'd02', 'd03', 'd04', 'd05', 'd06', 'd07', 'd08', 'd09', 'd10', 'dJ', 'dQ', 'dK', 'dA',
  'c02', 'c03', 'c04', 'c05', 'c06', 'c07', 'c08', 'c09', 'c10', 'cJ', 'cQ', 'cK', 'cA',
  's02', 's03', 's04', 's05', 's06', 's07', 's08', 's09', 's10', 'sJ', 'sQ', 'sK', 'sA',
  'h02', 'h03', 'h04', 'h05', 'h06', 'h07', 'h08', 'h09', 'h10', 'hJ', 'hQ', 'hK', 'hA'
];

var player1 = {
              hand: [],
              startChips: 100
              };

var dealer = [];

var playingDeck = null;

var wager;

var deckValues = {};

var gameOutcome;

var turn;

deck.forEach(function(card) {
  var val = card.substring(1);
  if (isNaN(parseInt(val))) {
    val = (val === 'A') ? 11 : 10;
  } else {
    val = parseInt(val);
  }
  deckValues[card] = val
});



// GAME START
function start() {

};




//DEAL
function deal() {
  clearHand();
  turn = "P1";
  gameOutcome = "playing";
  playingDeck = _.shuffle(deck);
  for(var i = 0; i < 4; i++) {
    if ( i % 2 === 0) {
      player1.hand.push(playingDeck.shift());
    } else {
      dealer.push(playingDeck.shift());
    }
  };

  // AUTOMATIC WINS
  if(
    ((sumUp(player1.hand) === 21 && sumUp(dealer) === 21) && (dealer[0] !== "A")) ||
    ((sumUp(player1.hand) !== 21 && sumUp(dealer) === 21))                        ||
    (sumUp(player1.hand) === 21)
    ) {
      checkWin();
    }

};


// ADD UP VALUES
function sumUp(arr) {
  var total = 0;
  arr.forEach(function(singleCard) {
    total += deckValues[singleCard];
  });
  return total;
}
//CHECK FOR BUST
function checkBust(pd) {
  return (sumUp(pd) > 21);
  // if(sumUp(pd) > 21) {
  // gameOutcome = "Bust";
  // clearHand();
  // }
}

// HIT
function hit(hands) {
  hands.push(playingDeck.shift());
  if(sumUp(player1.hand) > 21) {
    checkWin();
  } else if (sumUp(player1.hand) === 21) {
    stay();
  }
  // checkBust(hands);
}

// STAY
function stay() {
  turn = "Comp";
  while(sumUp(dealer) < 17) {
    hit(dealer);
  }
  // checkBust(dealer);
  // gameOutcome = "game over";
  checkWin();
}

// check for winner
function checkWin() {
  if (checkBust(player1.hand)) {
    gameOutcome = "Dealer Wins";
  } else if (checkBust(dealer)) {
    gameOutcome = "Player Wins";
  } else if (sumUp(dealer) > sumUp(player1.hand)) {
    gameOutcome = "Dealer Wins";
  } else if (sumUp(dealer) < sumUp(player1.hand)) {
    gameOutcome = "Player Wins";
  } else if (sumUp(dealer) === sumUp(player1.hand)) {
    gameOutcome = 'Push';
  }
}

// CLEAR HANDS RESET
function clearHand() {
  player1.hand = [];
  dealer = [];
}

// HELPER....
function renderGame() {
console.log("Player hand: " + player1.hand);
console.log("Dealer hand: " + dealer);
console.log("Turn: " + turn);
console.log("Game Outcome: " + gameOutcome);
}









