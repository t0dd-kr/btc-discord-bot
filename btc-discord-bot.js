var Discord = require('discord.io');
var logger = require('winston');
var auth = require('./auth.json');
var request = require('request');
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
                        "(ex: !가격 btc)\n\n" +

                        "!가격 : 뒤에 코인 이름을 작성하지 않으면 모든 코인의 시세를 알 수 있습니다.\n\n" +

                        "!알람 : 암호화폐의 지정가를 입력하면 그 시점에 도달하면 알림을 받을 수 있습니다. \n\n"
                });
            break;
            case '가격':
                if(args.length > 1)
                {
                    getCoin(args[0],args[1],channelID);
                }
                else
                {
                    if(args[0].split('-').length > 1)
                    {
                        args = args[0].split('-');
                        getCoin(args[0],args[1],channelID);
                    }
                }
            break;
            // Just add any case commands if you want to..
         }
     }
});
var getCoin = function(market,coin,channelID)
{
    var url = "https://crix-api-endpoint.upbit.com/v1/crix/candles/minutes/1?code=CRIX.UPBIT." + market.toUpperCase() + "-" + coin.toUpperCase();

    request(url,  (err, res, body) => {
        if(body == "[]")
        {
            bot.sendMessage({
                to: channelID,
                message : "오류 : 해당 정보를 찾을 수 없습니다."
            });
        }
        else
        {
            let json = JSON.parse(body)[0];
            bot.sendMessage({
                to: channelID,
                message : market.toUpperCase() + "-" + coin.toUpperCase() + " 거래가 : " + json.tradePrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + market.toUpperCase()
            });
        }
    });
}
