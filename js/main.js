var deck = [
  'd02', 'd03', 'd04', 'd05', 'd06', 'd07', 'd08', 'd09', 'd10', 'dJ', 'dQ', 'dK', 'dA',
  'c02', 'c03', 'c04', 'c05', 'c06', 'c07', 'c08', 'c09', 'c10', 'cJ', 'cQ', 'cK', 'cA',
  's02', 's03', 's04', 's05', 's06', 's07', 's08', 's09', 's10', 'sJ', 'sQ', 'sK', 'sA',
  'h02', 'h03', 'h04', 'h05', 'h06', 'h07', 'h08', 'h09', 'h10', 'hJ', 'hQ', 'hK', 'hA'
];


var player = [];
var computer = [];
var playingDeck = null;

function gameStart() {
  playingDeck = _.shuffle(deck);
  for(var i = 0; i < 4; i++) {
    if ( i % 2 === 0) {
      player.push(playingDeck.shift());
    } else {
      computer.push(playingDeck.shift());
    }
  }
}

