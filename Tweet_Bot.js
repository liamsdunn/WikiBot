

// Our Dependancies 
var Twit = require('twit')
var text = require('./Wikiscraper.js')
var fs = require('fs');

// Importing the personal keys to access twitter API
var keys = fs.readFileSync('./keys.txt', 'utf8').split('\r\n')

// Initilizing our twit object with our imported keys 
var T = new Twit({
  consumer_key:         keys[0],
  consumer_secret:      keys[1],
  access_token:         keys[2],
  access_token_secret:  keys[3],
 // timeout_ms:           60*1000,  // optional HTTP request timeout to apply to all requests.
 // strictSSL:            true,     // optional - requires SSL certificates to be valid.
})

// Running the tweet function
 
console.log('Bot is starting')
tweet()
console.log('Tweet Successful')

// The tweet function calls Wikiscraper to get a sentence to tweet
async function tweet() {
 	var contents = String(await text.foo());
 	console.log(contents)
	T.post('statuses/update', { status: contents }, function(err, data, response) {console.log(data)})
}

