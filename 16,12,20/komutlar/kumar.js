const Discord = require("discord.js");
const chancejs = require("chance");
const chance = new chancejs();

const cevaplar = ["```YAZI-TURA``````TURA```", "```YAZI-TURA``````YAZI```"];

exports.run = function(client, message) {
  var cevap = cevaplar[Math.floor(Math.random() * cevaplar.length)];

  if (cevap === "```YAZI-TURA``````YAZI```") {
    const embedyazı = new Discord.RichEmbed()
      .setColor(0xf4b942)
      .setDescription(cevap)
      .setThumbnail("");
    message.delete(5000);
    message.channel.send(`<@${message.author.id}>`);
    message.channel.send(embedyazı);
  
  
  } else if (cevap === "```YAZI-TURA``````TURA```") {
    const embedtura = new Discord.RichEmbed()
      .setColor(0xf4b942)
      .setDescription(cevap)
      .setThumbnail("");
    message.delete(5000);
    message.channel.send(`<@${message.author.id}>`);
    message.channel.send(embedtura);
  
  
  }
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0
};

exports.help = {
  name: "yazıtura",
  description: "Yazı-Tura atar.",
  usage: "yazıtura"
};
