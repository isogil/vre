const Discord = require("discord.js");
exports.run = function(client, message, args) {
  const embed = new Discord.RichEmbed()
    .setAuthor(message.author.username)
    .setColor("RANDOM")
    .setImage(
      "https://cdn.discordapp.com/attachments/760108006686851114/782582641551343636/image0.png"
   );

  message.delete(1);

  message.reply({ embed });
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0
};

exports.help = {
  name: "eğw",
  description: "goril fotosu atar",
  usage: "eğw"
};
