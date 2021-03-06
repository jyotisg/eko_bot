'use strict';

const Script = require('smooch-bot').Script;
var PythonShell = require('python-shell');

module.exports = new Script({
processing: {
        prompt: (bot) => bot.say('Beep boop...'),
        receive: () => 'processing'
    },
    start: {
        receive: (bot) => {
            return bot.say('jyoti')
            .then(() => 'askName');
        }
    },

    askName: {
        prompt: (bot) => bot.say('What\'s your name?'),
        receive: (bot, message) => {
            const name = message.text;
                    var pyshell = new PythonShell('my_script.py');
                   pyshell.on('message', function (message) {
  // received a message sent from the Python script (a simple "print" statement) 
  return bot.say(message)
});
            return bot.setProp('name', name)
                .then(() => bot.say(`Great! I'll call you ${name}
Is that OK? %[Yes](postback:yes) %[No](postback:no)`))
                .then(() => 'finish');
        }
    },

    finish: {
        receive: (bot, message) => {
            return bot.getProp('name')
                .then((name) => bot.say(`Sorry ${name}, my creator didn't ` +
                        'teach me how to do anything else!'))
                .then(() => 'finish');
        }
    }
});
