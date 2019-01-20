
// Our Dependancies 
var Twit = require('twit');
var text = require('./Wikiscraper.js');
var fs = require('fs');

// Importing the personal keys to access twitter API
var keys = fs.readFileSync('./keys.txt', 'utf8').split('\r\n');

// Initilizing our twit object with our imported keys 
var T = new Twit({
  consumer_key:         keys[0],
  consumer_secret:      keys[1],
  access_token:         keys[2],
  access_token_secret:  keys[3],
	timeout_ms:           60*1000,
	strictSSL:            true,     
});

// Running the tweet function
console.log('Bot is starting');
tweet();
setInterval(tweet, 60*60000)

// The tweet function calls Wikiscraper to get a sentence to tweet
async function tweet() {
 	var contents = String(await text.getTweetText());
 	console.log(contents);
	T.post('statuses/update', { status: contents }, function(err, data, response) {
		if (err) {
			console.log('Tweet Failed, error: ' + err) 
		}else {
			console.log(data)
			console.log('Tweet Successful')}});
}

