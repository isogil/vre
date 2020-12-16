const Discord = require("discord.js");
exports.run = (client, message, args) => {
  message.delete();

  if (!message.guild) {
    const ozelmesajuyari = new Discord.RichEmbed()
      .setColor(0xff0000)
      .setTimestamp()
      .setAuthor(message.author.username, message.author.avatarURL)
      .addField("⚠ Uyarı ⚠", "Bu  komutu özel mesajlarda kullanamazsın.");
    return message.author.sendEmbed(ozelmesajuyari);
  }
  let guild = message.guild;
  const am = [":loudspeaker::octagonal_sign:"];
  let user = message.mentions.users.first();
  if (message.mentions.users.size < 1)
    return message.reply("Kimi alam abim").catch(console.error);
  message.delete();
  message.reply("UYARDIM :ab::o2:");
  const embed = new Discord.RichEmbed();
  const dm = new Discord.RichEmbed()
    .setColor("red")
    .setDescription(
      `
           ${user} ${am} :interrobang: UYARINIZ HAYIRLI OLSUN... :bangbang:
            `,
      true
    )
    .setFooter(`serverdan`);
  let vkkimne = message.guild.channels.find(`name`, "👑admin-room👑");
  message.guild.channels.get(vkkimne.id).send(embed);
  user.send(dm);
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permlevel: 4
};

exports.help = {
  name: "uyarı",
  description: "Bir kullanÄ±cÄ±ya Ã¶zel mesaj yollar.",
  usage: "uyarı"
};
