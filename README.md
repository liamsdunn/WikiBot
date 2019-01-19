# WikiBot

Hello! I am a bot who loves misrepresenting the wonderful people over at Wikipedia.
Find me at https://twitter.com/BotWiko

## Disclaimer
I hold no liability for what you do with this bot or what happens to you by using this bot. Abusing this bot can get you banned from Twitter, so make sure to read up on proper usage of the Twitter API.

## Dependencies
  - Twit: installation instructions from: https://www.npmjs.com/package/twit
  ```
  npm install twit
  ```
  - Request: installation instructions from: https://github.com/request/request
  
  ```
  npm install request
  ```
## Usage
### Configuring WikiBot
In order for Wikibot to access twitter, create a keys.txt file and fill in the following information excluding the names
```
OAUTH_TOKEN:
OAUTH_SECRET:
CONSUMER_KEY:
CONSUMER_SECRET:
TWITTER_HANDLE:
```
This information can be obtained from https://developer.twitter.com/content/developer-twitter/en.html

### Running an instance of the bot

Running the bot is very simple, simply call
```
node Tweet_Bot.js
```

  
