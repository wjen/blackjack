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

var player  = player1.hand;

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

function start() {
  turn = "P1";
  gameOutcome = "playing"
  playingDeck = _.shuffle(deck);
  for(var i = 0; i < 4; i++) {
    if ( i % 2 === 0) {
      player1.hand.push(playingDeck.shift());
    } else {
      dealer.push(playingDeck.shift());
    }
  }
  if(sumUp(player) === 21) {
    return gameOutcome = "BlackJack! " + turn + " Wins$$";
  }
  if(sumUp(dealer) === 21) {
    return "Dealer has BlackJack House Wins";
    }
}

function sumUp(arr) {
  var total = 0;
  arr.forEach(function(singleCard) {
    console.log(singleCard);
    total += deckValues[singleCard];
  });
  return total;
}

function checkBust() {
  if(total > 21) {
    return gameOutcome = "Bust";
  }
}


function hit(hands) {
  hands.push(playingDeck.shift());
}








