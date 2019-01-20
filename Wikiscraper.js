
var request = require("request");
const fs = require('fs');

var website = 'https://en.wikipedia.org/w/index.php?title=';
var parse = 'https://en.wikipedia.org/api/rest_v1/page/summary/';
var random = 'https://en.wikipedia.org/wiki/Special:Random';
var rege = /en.wikipedia.org\/w\/index.php\?title=[\w\d()\s.,?]+/gi;
var extract = /"extract":"[\W\w\d()\s.,;:?-]+,"extract_html"/;

/* 
  @desc - Scrapes text from the input url using the input regular expression. **does MORE
  @param - String url, regularExpression regex
  @return - A string array of matches to our regex 
*/

function scrape(url, regex) {

  return new Promise(function(resolve, reject) {
    request(url, function(error, response, body) {

      if(response.statusCode == 200){
        resolve(body.match(regex)); 

      } else {
        console.log(url);
        console.log(body.match(regex));
        console.log('error: '+ response.statusCode);
      }
      
    });
  });
}

module.exports = {
  /* 
    @desc - This function uses the url to call the random wikipedia api to gain access to a random article. 
            Then it parses the entire page looking for other wikipedia links. Then once all junk urls are removed,
            the function calls the first of the new urls, to then grab information from that article. It then takes
            the plain text, sanitizes and splices the sentences, then chooses a sentence at random to return.
    @param - String url, RegExp regex
    @return - A string of a random sentence from a random wikipedia article. 
  */

  getTweetText: async function getText() {
    
    // Calling https://en.wikipedia.org/wiki/Special:Random to direct to a random url, 
    // then links are parsed by scrape
    
    var quote = await scrape(random, rege);
    var urls = [];

    // Loops through removing all junk urls
    for (i = 0; i < quote.length; i++) {
  	 if (!quote[i].match(/(Template|Special)/)) {
  		urls.push(quote[i]);
  	 }
    }

    // Splitting the first url, gaining its title. Then redirecting to the new page to then scrape and sanitize its input. 
 
    var article_url = urls[Math.floor(Math.random() * urls.length)].split('=')[1];
    var result = await scrape(parse.concat(article_url), extract);
    var text = result[0].replace(new RegExp('(","extract_html"|"extract":"|\n\n)', 'g'), "");
    var sentence = text.split("\.");
    sentence.pop();

    // Looping continually chosing random numbers until chosen sentence is less then tweet size limit
    var choice;

    do {
  	 choice = Math.floor(Math.random() * (sentence.length ))
  	 var tweetLength = sentence[choice].length + 2 + article_url.length + website.length;
    } while (sentence[choice].length < 1 && tweetLength > 280)

    // Url from which the sentence was found appended to tweet
    var Tweet = sentence[choice].concat('. ', website, article_url);

    return Tweet;
  }
};
