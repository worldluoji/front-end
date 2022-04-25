var CardConfiguration = require('./singletone.js')

var card1 = new CardConfiguration();
var card2 = new CardConfiguration();

console.log(card1 === card2)      // true
console.log(card1.name, card1.basePath)