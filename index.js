const Reddit = require("snoowrap");
const dotenv = require("dotenv").config();
const rp = require("request-promise");

const r = new Reddit({
  userAgent: "script:com.logankuzyk.shareddit-reply-bot:v1.0.0 (by /u/C1RRU5)",
  clientId: process.env.BOT_ID,
  clientSecret: process.env.BOT_SECRET,
  username: process.env.USERNAME,
  password: process.env.PASSWORD,
});

refresh = async () => {
  let comments = await r.getInbox({ filter: "unread" });
  for (let trigger of comments) {
    if (trigger.subject != "username mention") {
      continue;
    }
    let parent = await trigger.parent_id;
    let context = await trigger.context;
    context = context.substr(0, context.lastIndexOf("/"));
    if (!parent.startsWith("t1")) {
      context = context.substr(0, context.lastIndexOf("/"));
      console.log("top level comment");
    } else {
      context = context.substr(0, context.lastIndexOf("/") + 1);
      context += parent.substr(parent.indexOf("_") + 1, parent.length - 1);
      console.log(context);
    }
    let link = "https://shareddit.com" + context;
    let generateLink = process.env.BACKEND_URL + context;
    rp(generateLink).then(async () => {
      let reply =
        "I turned this comment thread into an image for easy sharing. \n \n View it here: " +
        link +
        '\n \n If you\'re on desktop, try adding "sha" to the beginning of the reddit URL to generate the image on shareddit! \n \n [author](https://www.reddit.com/user/c1rru5) [source/about](https://github.com/logankuzyk/shareddit-bot)';
      try {
        await trigger.reply(reply);
        await r.getMessage(trigger).markAsRead();
        console.log("replied");
      } catch (e) {
        if (e.toLowerCase().indexOf("ratelimit" >= 0)) {
          console.log("rate limit - can't reply right now");
          return;
        } else {
          console.log(e);
        }
      }
    });
  }
};

module.exports.start = async () => {
  try {
    refresh();
  } catch (e) {
    if (e.statusCode == 400) {
      console.log("http 400 - no unread messages");
    } else {
      console.log(e);
    }
  }
};
