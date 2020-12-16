const Discord = require("discord.js");
exports.run = function(client, message, args) {
  const embed = new Discord.RichEmbed()
    .setAuthor(message.author.username)
    .setColor("RANDOM")
    .setImage(
      "https://cdn.discordapp.com/attachments/754817878435430485/784180022058680320/unnamed.jpg"
   );

  message.reply({ embed });
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0
};

exports.help = {
  name: "cuma",
  description: "goril fotosu atar",
  usage: "cuma"
};
