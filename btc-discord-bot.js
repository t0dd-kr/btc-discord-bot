var Discord = require('discord.io');
var logger = require('winston');
var auth = require('./auth.json');
// Configure logger settings
logger.remove(logger.transports.Console);
logger.add(logger.transports.Console, {
    colorize: true
});
logger.level = 'debug';
// Initialize Discord Bot
var bot = new Discord.Client({
   token: auth.token,
   autorun: true
});
bot.on('ready', function (evt) {
    logger.info('Connected');
    logger.info('Logged in as: ');
    logger.info(bot.username + ' - (' + bot.id + ')');
});
bot.on('message', function (user, userID, channelID, message, evt) {
    // Our bot needs to know if it will execute a command
    // It will listen for messages that will start with `!`
    if (message.substring(0, 1) == '!') {
        var args = message.substring(1).split(' ');
        var cmd = args[0];

        args = args.splice(1);
        switch(cmd) {
	        case 'help':
             bot.sendMessage({
               to: channelID,
	              message :
   	    "!가격 : 암호화폐의 기호를 입력하시면 원하시는 암호화폐의 가격을 볼 수 있습니다.\n\n"+
   	    "btc(비트코인), eth(이더리움), strat(스트라티스), omg(오미세고), dash(대쉬), ltc(라이트코인), eos(이오스) \n\n"+
   	    "(ex: !가격 btc)\n\n"

              });

            break;
            // Just add any case commands if you want to..
         }
     }
});
