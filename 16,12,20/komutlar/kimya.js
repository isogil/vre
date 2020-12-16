const Discord = require("discord.js");
exports.run = function(client, message, args) {
  const embed = new Discord.RichEmbed()
    .setAuthor("")
    .setColor("RANDOM")
    .setImage(
      "https://cdn.discordapp.com/attachments/754817878435430485/782926758051184660/flat800x800075f.u1.jpg"
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
  name: "bruh",
  description: "element fotosu atar",
  usage: "bruh"
};
