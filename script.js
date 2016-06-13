'use strict';

const Script = require('smooch-bot').Script;
var PythonShell = require('python-shell');

module.exports = new Script({

    start: {
        receive: (bot) => {
                   return bot.say('Hi! I\'m faltu Bot!')
                   .then(() => 'askName');
        }
    },

    askName: {
        prompt: (bot) => bot.say('What\'s your name?'),
        receive: (bot, message) => {
            const name = message.text;
             PythonShell.run('my_script.py', function (err, results) {
            if (err) throw err;
             return bot.setProp('name', results)
            });
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
