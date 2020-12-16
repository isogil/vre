const Discord = require('discord.js')
exports.run = (client, msg, args) => {
   let embed = new Discord.RichEmbed()
   .setAuthor(msg.author.username)
   .setColor("RANDOM")
   .addField ("https://thispersondoesnotexist.com")
   msg.channel.send(embed)
    

}
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0
};
exports.help = {
name: 'face',
description: 'resimliyazı frenzy',
usage: 'face'
};