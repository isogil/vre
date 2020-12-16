const Discord = require("discord.js");
exports.run = async (client, message, args) => {
  let kişi = message.mentions.members.first() || message.author;
  message.channel.send(`**${kişi.id}**`);
};
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["Id", "ıd", "ID"],
  permLevel: 1
};

exports.help = {
  name: "tc",
  description: "Belirtilen Kişinin ID'sini Atar!",
  usage: "tc"
};