var deck = [
  'd02', 'd03', 'd04', 'd05', 'd06', 'd07', 'd08', 'd09', 'd10', 'dJ', 'dQ', 'dK', 'dA',
  'c02', 'c03', 'c04', 'c05', 'c06', 'c07', 'c08', 'c09', 'c10', 'cJ', 'cQ', 'cK', 'cA',
  's02', 's03', 's04', 's05', 's06', 's07', 's08', 's09', 's10', 'sJ', 'sQ', 'sK', 'sA',
  'h02', 'h03', 'h04', 'h05', 'h06', 'h07', 'h08', 'h09', 'h10', 'hJ', 'hQ', 'hK', 'hA'
];

var player1 = {
              hand: [],
              chips: 100
              };

var dealer = [];

var playingDeck = null;

var wager;

var deckValues = {};

var gameOutcome;

var turn;


// value of cards

// deck.forEach(function(card) {
//   var val = card.substring(1);
//   if (isNaN(parseInt(val))) {
//     val = (val === 'A') ? 1 : 10;
//   }
//    else {
//     val = parseInt(val);
//   }
//   deckValues[card] = val;

// });


//check for 21
// if (val === "A" && sumUp(player1.hand) > 21) {
//       val = 1;
//     }
//     if (val === "A" && sumUp(dealer) > 21) {
//       val = 1;
//     }


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
    //PLAYER BLACKJACK
    ((sumUp(player1.hand) === 21 && sumUp(dealer) === 21) && (dealer[0] !== "A")) ||
    //DEALER BLACKJACK
    ((sumUp(player1.hand) !== 21 && sumUp(dealer) === 21))
    ) {
      checkWin();
  }

};


// ADD UP VALUES
function sumUp(arr) {
  var total = 0;

  deck.forEach(function(card) {
  var val = card.substring(1);
  if (isNaN(parseInt(val))) {
    val = (val === 'A') ? 1 : 10;
  }
   else {
    val = parseInt(val);
  }
  deckValues[card] = val;

  });

  arr.forEach(function(singleCard) {
    total += deckValues[singleCard];
  });
  for(var i = 0; i < arr.length; i++) {
    if  ((arr[i].indexOf("A") > -1) && (total < 11)) {
      total += 10;
    }
  }
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
  //DEALER HITS ON UNTIL 17 AND ON SOFT 17
  while((sumUp(dealer) < 17) || (dealer.length === 2 && dealer.join().indexOf("A") != -1))
    {
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









