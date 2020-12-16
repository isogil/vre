
const message = require('discord.js');
exports.run = async (client, message) => {
    message.channel.send(`<@${message.author.id}>Adlı üye selam verdi`);
};


exports.conf = {
  enabled: true,
  aliases: [],
  permLevel: 0,
};

exports.help = {
name: "sam",
description: "mim atar",
usage: "sam",
};



