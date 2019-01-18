
console.log('Bot is starting')

// Our Dependancies 
var Twit = require('twit')
var tweet = require('./Wikiscraper.js')
var fs = require('fs');

// Importing the personal keys to access twitter API
var keys = fs.readFileSync('./keys.txt', 'utf8');
	keys = keys.split('\r\n')

// Initilizing our twit object with our imported keys 
var T = new Twit({
  consumer_key:         keys[0],
  consumer_secret:      keys[1],
  access_token:         keys[2],
  access_token_secret:  keys[3],
 // timeout_ms:           60*1000,  // optional HTTP request timeout to apply to all requests.
 // strictSSL:            true,     // optional - requires SSL certificates to be valid.
})


// The main function calls Wikiscraper to get a sentence to tweet
 async function main() {

 	var contents = await tweet.foo();
 	contents = String(contents)
 	console.log(contents)
	// T.post(
	// 'statuses/update', 
	// { status: contents }, 
	// function(err, data, response) {
	// 	console.log(data)
	// })
 }

 main()




