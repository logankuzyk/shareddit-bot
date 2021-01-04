# shareddit-bot
The bot that makes it easier to use [shareddit.com](https://shareddit.com). Check out my video about shareddit [here](https://youtu.be/HJPvwZb9KKI)!

## About
shareddit bot is a very simple reddit reply bot. Written in Node, it uses snoowrap for dealing with the reddit API. Currently, it is running on a serverless Google Cloud Function (like AWS Lambda).

## Purpose
shareddit uses the information provided by the permalink of a reddit post or comment. Using a desktop browser, it's easy to navigate between pages and to edit the current domain. This bot is designed to be one of the primary ways to use shareddit due to the exposure provided by its comments, as well as its ease of use.

## Usage
On reddit, navigate to a post or comment with which to generate the shareddit image. Reply "/u/shareddit-bot" to the last comment to be included in the image; if the bot summon is a top-level comment, the generated image will not include any comments. The bot will queue the generation of the image and reply with the link. Due to its low karma, the bot is currently rate limited to approximately one comment every ten minutes.

## Etiquette
Due to the public nature of reddit comments, please be mindful of how much you are using the bot. Feel free to use it as much as you like, but try not to flood comment sections or subreddits with bot summons (in general).
