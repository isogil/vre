const Discord = require("discord.js");
const client = new Discord.Client();
exports.run = (client, message) =>{
  
  message.channel.send('<a:tik1:749633281040842839> Emoji yükleniyor').then(message =>{
    var malk =['<a:tik1:749633281040842839> anan']
    message.edit(`${malk}`)
    
  });
}


exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0
};
exports.help = {
name: 'de',
description: 'resimliyazı frenzy',
usage: 'de'
};
