var deck = [
  'd02', 'd03', 'd04', 'd05', 'd06', 'd07', 'd08', 'd09', 'd10', 'dJ', 'dQ', 'dK', 'dA',
  'c02', 'c03', 'c04', 'c05', 'c06', 'c07', 'c08', 'c09', 'c10', 'cJ', 'cQ', 'cK', 'cA',
  's02', 's03', 's04', 's05', 's06', 's07', 's08', 's09', 's10', 'sJ', 'sQ', 'sK', 'sA',
  'h02', 'h03', 'h04', 'h05', 'h06', 'h07', 'h08', 'h09', 'h10', 'hJ', 'hQ', 'hK', 'hA'
];
var deckValues = {};

deck.forEach(function(card) {
  var faceValue  = card.substring(1);
  var pointValue = parseInt(faceValue);
  if (isNaN(pointValue)) { // J, Q, K, A
    pointValue = (faceValue === 'A') ? 1 : 10;
  }

  deckValues[card] = pointValue;
});

var player1 = {
  hand: [],
  chips: 0,
  dblDown: false
};

var dealer = [];

var playingDeck = null;

var wager;

var gameStatus;

var turn;


// GAME START
function start() {
  wager = 0;
  player1.chips = 500;
  clearHands();
  gameStatus = "";
  turn = "";
};


//BET FUNCTION
function bet(amount) {
  if (amount) {
      if(player1.chips > amount) {
        wager = amount;
      } else if (player1.chips <= amount && player1.chips != 0) {
        console.log("Degree All in Moment!");
        wager = player1.chips;
      } else {
        wager = 0;
      }
  } else {
    wager = 0;
  }
}

//DEAL
function deal() {
  clearHands();
  turn = "P1";
  gameStatus = "playing";
  playingDeck = _.shuffle(deck);
  for(var i = 0; i < 4; i++) {
    if ( i % 2 === 0) {
      player1.hand.push(playingDeck.shift());
    } else {
      dealer.push(playingDeck.shift());
    }
  };

  // AUTOMATIC WINS
  if (sumUp(player1.hand) === 21 && (sumUp(dealer) === 21 && dealer[0] !== "A")) {
        gameStatus = "BLACKJACK"
        player1.chips += wager*1.5;
        turn = "";
  } else if (sumUp(player1.hand) === 21 && sumUp(dealer) !== 21) {
        gameStatus = "BLACKJACK"
        player1.chips += wager*1.5;
        turn = "";
  } else if (sumUp(player1.hand) !== 21 && sumUp(dealer) === 21) {
        checkWin();
        turn = "";
  }

};


// ADD UP VALUES
function sumUp(hand) {
  var total = 0;

  // sums up your hand...
  hand.forEach(function(card) {
    total += deckValues[card];
  });

  // iterates over your hand, looking for Aces, and adding 10
  // to the value if they exist...
  for(var i = 0; i < hand.length; i++) {
    if ((hand[i][1] === "A") && (total <= 11)) {
      total += 10;
    }
  }

  return total;
}

//DOUBLE DOWN
function dblDown() {
  if (turn === "P1" && wager !== 0) {
      if(player1.chips > (wager * 2)) {
        player1.dblDown = true;
        hit(player1.hand);

        // After hitting automatically only once.
        player1.dblDown = false;
      } else {
        console.log("You don't have enough chips");
      }
  }
}

// HIT
function hit(hands) {
  if(gameStatus === "playing") {
    hands.push(playingDeck.shift());
      if (turn === "P1") {
        if(sumUp(player1.hand) > 21) {
          checkWin();
        } else if (sumUp(player1.hand) === 21 || player1.dblDown) {
          stay();
        }
      }
  }
}

// STAY
function stay() {
  turn = "CPU";
  //DEALER HITS UNTIL 17 AND ON SOFT 17
  while(
    (sumUp(dealer) < 17) ||((dealer.length === 2) && (dealer.join().indexOf(6) != -1) && (dealer.join().indexOf("A") != -1))
  ) {
    hit(dealer);
  }
  checkWin();
}

//CHECK FOR BUST
function checkBust(hand) {
  return (sumUp(hand) > 21);
}

// CHECK FOR WINNER
function checkWin() {
  if (player1.dblDown) {
    wager = wager * 2;
  }
  if (checkBust(player1.hand)) {
    gameStatus = "Dealer Wins";
    player1.chips -= wager;
  } else if (checkBust(dealer)) {
    gameStatus = "Player Wins";
    player1.chips += wager;
  } else if (sumUp(dealer) > sumUp(player1.hand)) {
    gameStatus = "Dealer Wins";
    player1.chips -= wager;
  } else if (sumUp(dealer) < sumUp(player1.hand)) {
    gameStatus = "Player Wins";
    player1.chips += wager;
  } else if (sumUp(dealer) === sumUp(player1.hand)) {
    gameStatus = 'Push';
  }
  // After outcome and payout, return wager back to default original wager
  if (player1.dblDown) {
    wager = wager / 2;
  }
  turn = "";
}

// CLEAR HANDS RESET
function clearHands() {
  player1.hand = [];
  dealer = [];
}

// HELPER
function renderGame() {
  console.log("Player hand: " + player1.hand);
  console.log("Dealer hand: " + dealer);
  console.log("Turn: " + turn);
  console.log("Game Status: " + gameStatus);
  console.log("Chips: " + player1.chips);
  console.log("Wager: " + wager);
  console.log("DoubleDown: " + player1.dblDown)
}
