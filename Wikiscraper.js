
var request = require("request");
const fs = require('fs');

var website = 'https://en.wikipedia.org/w/index.php?title=';
var parse = 'https://en.wikipedia.org/api/rest_v1/page/summary/';
var random = 'https://en.wikipedia.org/wiki/Special:Random';
var rege = /en.wikipedia.org\/w\/index.php\?title=[\w\d()\s.,?]+/gi;
var extract = /"extract":"[\W\w\d()\s.,;?-]+,"extract_html"/;

/* 
  @desc - Scrapes text from the input url using the input regular expression. **does MORE
  @param - String url, regularExpression regex
  @return - A string array of matches to our regex 
*/
function scrape(url, regex) {
  var quote;

  return new Promise(function(resolve, reject) {
    request(url, function(error, response, body) {
      quote = body.match(regex);
      resolve(quote);
    });
  });
}

/* 
  @desc - 
  @param - String url, regularExpression regex
  @return - A string array of matches to our regex 
*/
module.exports = {
  foo: async function getText() {
  
    var urls = []
    var quote = await scrape(random, rege);

    for (i = 0; i < quote.length; i++) {
  	 if (!quote[i].match(/(Template|Special)/)) {
  		urls.push(quote[i])
  	 }
    }

    var article_url = urls[1].split('=')[1]
    var result = (await scrape(parse.concat(article_url), extract))[0].replace(new RegExp('(","extract_html"|"extract":")', 'g'), "")
    var sentence = text.split("\.")
    sentence.pop()

    console.log(text)
    console.log(sentence)
    console.log('done')

    var choice

    do {
  	 choice = Math.floor(Math.random() * (sentence.length ))
  	 console.log(choice)
    } while (sentence[choice].length < 1 && sentence[choice].length + 2 + article_url.length + website.length > 280)

    var Tweet = sentence[choice].concat('. ', website, article_url)
    console.log(Tweet)

    return Tweet
  }
};
