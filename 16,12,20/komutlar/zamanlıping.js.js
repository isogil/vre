const Discord = require("discord.js");
const randomPuppy = require("random-puppy");

exports.run = async (client, message, args, color) => {
  setTimeout(() => {
    let start = Date.now();
    message.channel.send("Pong! ").then(message => {
      let diff = Date.now() - start;
      let API = client.ping.toFixed(2);

      let embed = new Discord.RichEmbed()
        .setTitle(`Bot Pingim !`)
        .setColor(0xff2f2f)
        .addField("📶 Mesaj Gecikmesi", `${diff}ms`, true)
        .addField("💻 Bot Gecikmesi", `${API}ms`, true);

      message.edit(embed);
    });
  });

  setTimeout(() => {
    let start = Date.now();
    message.channel.send("Pong! ").then(message => {
      let diff = Date.now() - start;
      let API = client.ping.toFixed(2);

      let embed = new Discord.RichEmbed()
        .setTitle(`Bot Pingim !`)
        .setColor(0xff2f2f)
        .addField("📶 Mesaj Gecikmesi", `${diff}ms`, true)
        .addField("💻 Bot Gecikmesi", `${API}ms`, true);

      message.edit(embed);
    });
  }, 900000);

  setTimeout(() => {
    let start = Date.now();
    message.channel.send("Pong! ").then(message => {
      let diff = Date.now() - start;
      let API = client.ping.toFixed(2);

      let embed = new Discord.RichEmbed()
        .setTitle(`Bot Pingim !`)
        .setColor(0xff2f2f)
        .addField("📶 Mesaj Gecikmesi", `${diff}ms`, true)
        .addField("💻 Bot Gecikmesi", `${API}ms`, true);

      message.edit(embed);
    });
  }, 1800000);
  setTimeout(() => {
    let start = Date.now();
    message.channel.send("Pong! ").then(message => {
      let diff = Date.now() - start;
      let API = client.ping.toFixed(2);

      let embed = new Discord.RichEmbed()
        .setTitle(`Bot Pingim !`)
        .setColor(0xff2f2f)
        .addField("📶 Mesaj Gecikmesi", `${diff}ms`, true)
        .addField("💻 Bot Gecikmesi", `${API}ms`, true);

      message.edit(embed);
    });
  }, 2700000);
  setTimeout(() => {
    let start = Date.now();
    message.channel.send("Pong! ").then(message => {
      let diff = Date.now() - start;
      let API = client.ping.toFixed(2);

      let embed = new Discord.RichEmbed()
        .setTitle(`Bot Pingim !`)
        .setColor(0xff2f2f)
        .addField("📶 Mesaj Gecikmesi", `${diff}ms`, true)
        .addField("💻 Bot Gecikmesi", `${API}ms`, true);

      message.edit(embed);
    });
  }, 3600000);
  setTimeout(() => {
    let start = Date.now();
    message.channel.send("Pong! ").then(message => {
      let diff = Date.now() - start;
      let API = client.ping.toFixed(2);

      let embed = new Discord.RichEmbed()
        .setTitle(`Bot Pingim !`)
        .setColor(0xff2f2f)
        .addField("📶 Mesaj Gecikmesi", `${diff}ms`, true)
        .addField("💻 Bot Gecikmesi", `${API}ms`, true);

      message.edit(embed);
    });
  }, 4500000);
  setTimeout(() => {
    let start = Date.now();
    message.channel.send("Pong! ").then(message => {
      let diff = Date.now() - start;
      let API = client.ping.toFixed(2);

      let embed = new Discord.RichEmbed()
        .setTitle(`Bot Pingim !`)
        .setColor(0xff2f2f)
        .addField("📶 Mesaj Gecikmesi", `${diff}ms`, true)
        .addField("💻 Bot Gecikmesi", `${API}ms`, true);

      message.edit(embed);
    });
  }, 5400000);
  setTimeout(() => {
    let start = Date.now();
    message.channel.send("Pong! ").then(message => {
      let diff = Date.now() - start;
      let API = client.ping.toFixed(2);

      let embed = new Discord.RichEmbed()
        .setTitle(`Bot Pingim !`)
        .setColor(0xff2f2f)
        .addField("📶 Mesaj Gecikmesi", `${diff}ms`, true)
        .addField("💻 Bot Gecikmesi", `${API}ms`, true);

      message.edit(embed);
    });
  }, 6300000);
  setTimeout(() => {
    let start = Date.now();
    message.channel.send("Pong! ").then(message => {
      let diff = Date.now() - start;
      let API = client.ping.toFixed(2);

      let embed = new Discord.RichEmbed()
        .setTitle(`Bot Pingim !`)
        .setColor(0xff2f2f)
        .addField("📶 Mesaj Gecikmesi", `${diff}ms`, true)
        .addField("💻 Bot Gecikmesi", `${API}ms`, true);

      message.edit(embed);
    });
  }, 7200000);
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["YEDEK KOMUT1", "YEDEK KOMUT2"],
  permLevel: "0"
};

exports.help = {
  name: "piö",
  description: "sigara içersiniz",
  usage: "piö"
};
