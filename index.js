// Description:
//   Generates Monzo.me URLs
// Commands:
//   monzo me username <username> - Register your Monzo username
//   monzo me username - Returns the Monzo username registered with Hubot
//   monzo me <amount> [reason] - Replies with a Monzo.me URL
'use strict';

const _ = require('lodash');

function key(name) {
  return `hubot-monzo-me:${name}:username`;
}

module.exports = (robot) => {
  robot.hear(/^monzo me username$/, (res) => {
    const name = res.message.user.name;
    const username = robot.brain.get(key(name));

    if (username) {
      res.reply(`Your Monzo username is set to ${username}. Type "monzo me username <username>" to update it.`);
    } else {
      res.reply('You haven\'t set your Monzo username. Type "monzo me username <username>" to set it.');
    }
  });

  robot.hear(/^monzo me username ([^\s]+)$/, (res) => {
    const name = res.message.user.name;
    const username = res.match[1];

    robot.brain.set(key(name), username);
    res.reply(`Your Monzo username is now set to ${username}.`);
  });

  robot.hear(/^monzo me £(\d+\.?\d*)(?: for (.+))?/, (res) => {
    const name = res.message.user.name;
    const username = robot.brain.get(key(name));
    const amount = res.match[1];
    const reason = res.match[2];

    if (!username) {
      res.reply('You haven\'t set your Monzo username. Type "monzo me username <username>" to set it.');
      return;
    }

    let url = `https://monzo.me/${username}/${amount}`;

    if (reason) {
      url += `?d=${encodeURIComponent(_.upperFirst(reason))}`;
    }

    res.send(url);
  });
};
