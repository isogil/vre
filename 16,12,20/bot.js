const experss = require("express");
const app = experss();
const http = require("http");
app.get("/", (request, response) => {
  console.log(`refresh`);
  response.sendStatus(200);
});
app.listen(process.env.PORT);
setInterval(() => {
  http.get(`https://isogilmain-t.glitch.me/`);
}, 1200000);

const Discord = require("discord.js");
const client = new Discord.Client();
const ayarlar = require("./ayarlar.json");
const chalk = require("chalk");
const fs = require("fs");
const db = require("quick.db");
const Jimp = require("jimp");
const express = require("express");
const { GOOGLE_API_KEY } = require("./anahtarlar.json");
const YouTube = require("simple-youtube-api");
const queue = new Map();
const youtube = new YouTube(GOOGLE_API_KEY);
const ytdl = require("ytdl-core");

const ms = require("parse-ms");
const Canvas = require("canvas");
const moment = require("moment");
require("./util/eventLoader")(client);

var prefix = ayarlar.prefix;
////////////////////////

const randomPuppy = require("random-puppy");

exports.run = async (client, message, args, color) => {
  let start = Date.now();

  if (message.content.toLowerCase() === "ping") {
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
  }
};

/////////////////////////////////
///////////////////////////

const instagram = require("user-instagram");

require("./util/eventLoader")(client);

var prefix = ayarlar.prefix;

const log = message => {
  console.log(`[${moment().format("YYYY-MM-DD HH:mm:ss")}] ${message}`);
};

/////////////////////////////////////////////////////////
client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
fs.readdir("./komutlar/", (err, files) => {
  if (err) console.error(err);
  log(`${files.length} komut yüklenecek.`);
  files.forEach(f => {
    let props = require(`./komutlar/${f}`);
    log(`Yüklenen komut: ${props.help.name}.`);
    client.commands.set(props.help.name, props);
    props.conf.aliases.forEach(alias => {
      client.aliases.set(alias, props.help.name);
    });
  });
});

client.reload = command => {
  return new Promise((resolve, reject) => {
    try {
      delete require.cache[require.resolve(`./komutlar/${command}`)];
      let cmd = require(`./komutlar/${command}`);
      client.commands.delete(command);
      client.aliases.forEach((cmd, alias) => {
        if (cmd === command) client.aliases.delete(alias);
      });
      client.commands.set(command, cmd);
      cmd.conf.aliases.forEach(alias => {
        client.aliases.set(alias, cmd.help.name);
      });
      resolve();
    } catch (e) {
      reject(e);
    }
  });
};

client.load = command => {
  return new Promise((resolve, reject) => {
    try {
      let cmd = require(`./komutlar/${command}`);
      client.commands.set(command, cmd);
      cmd.conf.aliases.forEach(alias => {
        client.aliases.set(alias, cmd.help.name);
      });
      resolve();
    } catch (e) {
      reject(e);
    }
  });
};

client.unload = command => {
  return new Promise((resolve, reject) => {
    try {
      delete require.cache[require.resolve(`./komutlar/${command}`)];
      let cmd = require(`./komutlar/${command}`);
      client.commands.delete(command);
      client.aliases.forEach((cmd, alias) => {
        if (cmd === command) client.aliases.delete(alias);
      });
      resolve();
    } catch (e) {
      reject(e);
    }
  });
};

client.elevation = message => {
  if (!message.guild) {
    return;
  }
  let permlvl = 0;
  if (message.member.hasPermission("BAN_MEMBERS")) permlvl = 2;
  if (message.member.hasPermission("ADMINISTRATOR")) permlvl = 3;
  if (message.author.id === ayarlar.sahip) permlvl = 4;
  return permlvl;
};

var regToken = /[\w\d]{24}\.[\w\d]{6}\.[\w\d-_]{27}/g;
// client.on('debug', e => {
//   console.log(chalk.bgBlue.green(e.replace(regToken, 'that was redacted')));
// });

client.on("warn", e => {
  console.log(chalk.bgYellow(e.replace(regToken, "that was redacted")));
});

client.on("error", e => {
  console.log(chalk.bgRed(e.replace(regToken, "that was redacted")));
});
///////////////////////////////////////////////////////////////////////////

client.on("guildMemberAdd", member => {
  let guild = member.guild;
  let joinRole = guild.roles.find("name", "Player"); // 'Üye' yazılan yeri otomatik rol vereceği rolü yapabilirsiniz.
  member.sendMessage("Sunucuya Hoşgeldin");
  member.addRole(joinRole);

  const channel = member.guild.channels.find("name", "alansız"); // 'notech-log' log ismidir. değiştirebilirsiniz. belirttiğiniz isme giriş çıkış gösterecektir.
  if (!channel) return;
  const embed = new Discord.RichEmbed()
    .setColor("0x00cc44")
    .setAuthor(client.user.username, client.user.avatarURL)
    .setThumbnail(member.user.avatarURL)
    .setTitle(`:inbox_tray: ${member.user.username} Sunucuya katıldı.^^ `)
    .setTimestamp();
  channel.sendEmbed(embed);
});

client.on("guildMemberRemove", member => {
  const channel = member.guild.channels.find("name", "alansız"); // 'notech-log' log ismidir. değiştirebilirsiniz. belirttiğiniz isme giriş çıkış gösterecektir.
  if (!channel) return;
  const embed = new Discord.RichEmbed()
    .setColor("0xff1a1a")
    .setAuthor(client.user.username, client.user.avatarURL)
    .setThumbnail(member.user.avatarURL)
    .setTitle(`:outbox_tray: ${member.user.username} Çok şey kaybettin MAL...`)
    .setTimestamp();
  channel.sendEmbed(embed);
});

////////////////////////////////
client.on("message", async msg => {
  if (msg.author.bot) return undefined;
  if (!msg.content.startsWith(prefix)) return undefined;

  const args = msg.content.split(" ");
  const searchString = args.slice(1).join(" ");
  const url = args[1] ? args[1].replace(/<(.+)>/g, "$1") : "";
  const serverQueue = queue.get(msg.guild.id);
  let command = msg.content.toLowerCase().split(" ")[0];
  command = command.slice(prefix.length);

  if (command === "çal") {
    const voiceChannel = msg.member.voiceChannel;
    if (!voiceChannel)
      return msg.channel.sendEmbed(
        new Discord.RichEmbed()
          .setColor("RANDOM")
          .setDescription(
            ":warning: | İlk olarak sesli bir kanala giriş yapmanız gerek."
          )
      );
    const permissions = voiceChannel.permissionsFor(msg.client.user);
    if (!permissions.has("CONNECT")) {
      return msg.channel.sendEmbed(
        new Discord.RichEmbed()
          .setColor("RANDOM")
          .setTitle(
            ":warning: | İlk olarak sesli bir kanala giriş yapmanız gerek."
          )
      );
    }
    if (!permissions.has("SPEAK")) {
      return msg.channel.sendEmbed(
        new Discord.RichEmbed()
          .setColor("RANDOM")
          .setTitle(
            ":warning: | Şarkı başlatılamıyor. Lütfen mikrofonumu açınız."
          )
      );
    }

    if (url.match(/^https?:\/\/(www.youtube.com|youtube.com)\/playlist(.*)$/)) {
      const playlist = await youtube.getPlaylist(url);
      const videos = await playlist.getVideos();
      for (const video of Object.values(videos)) {
        const video2 = await youtube.getVideoByID(video.id); // eslint-disable-line no-await-in-loop
        await handleVideo(video2, msg, voiceChannel, true); // eslint-disable-line no-await-in-loop
      }
      return msg.channel
        .sendEmbed(new Discord.RichEmbed())
        .setTitle(
          `**✅ | Oynatma Listesi: **${playlist.title}** Kuyruğa Eklendi!**`
        );
    } else {
      try {
        var video = await youtube.getVideo(url);
      } catch (error) {
        try {
          var videos = await youtube.searchVideos(searchString, 10);
          let index = 0;

          msg.channel.sendEmbed(
            new Discord.RichEmbed()
              .setTitle("Şarkı Seçimi")
              .setDescription(
                `${videos
                  .map(video2 => `**${++index} -** ${video2.title}`)
                  .join("\n")}`
              )
              .setFooter(
                "Lütfen 1-10 arasında bir rakam seçiniz 10 saniye içinde liste iptal edilecektir."
              )
              .setColor("0x36393E")
          );
          msg.delete(5000);
          try {
            var response = await msg.channel.awaitMessages(
              msg2 => msg2.content > 0 && msg2.content < 11,
              {
                maxMatches: 1,
                time: 10000,
                errors: ["time"]
              }
            );
          } catch (err) {
            console.error(err);
            return msg.channel.sendEmbed(
              new Discord.RichEmbed()
                .setColor("0x36393E")
                .setDescription(
                  ":warning: | **Şarkı Değeri Belirtmediğiniz İçin Seçim İptal Edilmiştir**."
                )
            );
          }
          const videoIndex = parseInt(response.first().content);
          var video = await youtube.getVideoByID(videos[videoIndex - 1].id);
        } catch (err) {
          console.error(err);
          return msg.channel.sendEmbed(
            new Discord.RichEmbed()
              .setColor("0x36393E")
              .setDescription(":( | **Aradaım Fakat Hiç Bir Sonuç Çıkmadı**")
          );
        }
      }
      return handleVideo(video, msg, voiceChannel);
    }
  } else if (command === "geç") {
    if (!msg.member.voiceChannel)
      if (!msg.member.voiceChannel)
        return msg.channel.sendEmbed(
          new Discord.RichEmbed()
            .setColor("RANDOM")
            .setDescription(
              "<a:frograinbow:488978511474982933> | **Lütfen öncelikle sesli bir kanala katılınız**."
            )
        );
    if (!serverQueue)
      return msg.channel.sendEmbed(
        new Discord.RichEmbed()
          .setColor("RANDOM")
          .setTitle(
            "<a:frograinbow:488978511474982933> | **Hiç Bir Müzik Çalmamakta**"
          )
      );
    serverQueue.connection.dispatcher.end("**Müziği Geçtim!**");
    return undefined;
  } else if (command === "dur") {
    if (!msg.member.voiceChannel)
      if (!msg.member.voiceChannel)
        return msg.channel.sendEmbed(
          new Discord.RichEmbed()
            .setColor("RANDOM")
            .setDescription(
              "**:warning: | Lütfen öncelikle sesli bir kanala katılınız.**"
            )
        );
    if (!serverQueue)
      return msg.channel.sendEmbed(
        new Discord.RichEmbed()
          .setColor("RANDOM")
          .setTitle(":warning: **| Hiç Bir Müzik Çalmamakta**")
      );
    msg.channel.send(
      `:stop_button: **${serverQueue.songs[0].title}** Adlı Müzik Durduruldu`
    );
    serverQueue.songs = [];
    serverQueue.connection.dispatcher.end("**Müzik Bitti**");
    return undefined;
  } else if (command === "ses") {
    if (!msg.member.voiceChannel)
      if (!msg.member.voiceChannel)
        return msg.channel.sendEmbed(
          new Discord.RichEmbed()
            .setColor("RANDOM")
            .setDescription(
              ":warning: **| Lütfen öncelikle sesli bir kanala katılınız.**"
            )
        );
    if (!serverQueue)
      return msg.channel.sendEmbed(
        new Discord.RichEmbed()
          .setColor("RANDOM")
          .setTitle(":warning:| **Hiç Bir Müzik Çalmamakta**")
      );
    if (!args[1])
      return msg.channel.sendEmbed(
        new Discord.RichEmbed()
          .setTitle(`:warning: Şuanki Ses Seviyesi: **${serverQueue.volume}**`)
          .setColor("RANDOM")
      );
    serverQueue.volume = args[1];
    serverQueue.connection.dispatcher.setVolumeLogarithmic(args[1] / 5);
    return msg.channel.sendEmbed(
      new Discord.RichEmbed()
        .setTitle(`:hammer:  Ses Seviyesi Ayarlanıyor: **${args[1]}**`)
        .setColor("RANDOM")
    );
  } else if (command === "çalan") {
    if (!serverQueue)
      return msg.channel.sendEmbed(
        new Discord.RichEmbed()
          .setTitle(":warning: | **Çalan Müzik Bulunmamakta**")
          .setColor("RANDOM")
      );
    return msg.channel.sendEmbed(
      new Discord.RichEmbed()
        .setColor("RANDOM")
        .setTitle("Gnarge Bot | Çalan")
        .addField(
          "Başlık",
          `[${serverQueue.songs[0].title}](${serverQueue.songs[0].url})`,
          true
        )
        .addField(
          "Süre",
          `${serverQueue.songs[0].durationm}:${serverQueue.songs[0].durations}`,
          true
        )
    );
  } else if (command === "sıra") {
    let index = 0;
    if (!serverQueue)
      return msg.channel.sendEmbed(
        new Discord.RichEmbed()
          .setTitle(":warning: | **Sırada Müzik Bulunmamakta**")
          .setColor("RANDOM")
      );
    return msg.channel
      .sendEmbed(
        new Discord.RichEmbed()
          .setColor("RANDOM")
          .setTitle("Gnarge Bot | Şarkı Kuyruğu")
          .setDescription(
            `${serverQueue.songs
              .map(song => `**${++index} -** ${song.title}`)
              .join("\n")}`
          )
      )
      .addField("Şu anda çalınan: " + `${serverQueue.songs[0].title}`);
  } else if (command === "duraklat") {
    if (serverQueue && serverQueue.playing) {
      serverQueue.playing = false;
      serverQueue.connection.dispatcher.pause();
      return msg.channel.sendEmbed(
        new Discord.RichEmbed()
          .setTitle("**:pause_button: Müzik Senin İçin Durduruldu!**")
          .setColor("RANDOM")
      );
    }
    return msg.channel.send(":warning: | **Çalan Müzik Bulunmamakta**");
  } else if (command === "devam") {
    if (serverQueue && !serverQueue.playing) {
      serverQueue.playing = true;
      serverQueue.connection.dispatcher.resume();
      return msg.channel.sendEmbed(
        new Discord.RichEmbed()
          .setTitle("**:arrow_forward: Müzik Senin İçin Devam Etmekte!**")
          .setColor("RANDOM")
      );
    }
    return msg.channel.sendEmbed(
      new Discord.RichEmbed()
        .setTitle(":warning: ** | Çalan Müzik Bulunmamakta.**")
        .setColor("RANDOM")
    );
  }

  return undefined;
});

async function handleVideo(video, msg, voiceChannel, playlist = false) {
  const serverQueue = queue.get(msg.guild.id);
  console.log(video);
  const song = {
    id: video.id,
    title: video.title,
    url: `https://www.youtube.com/watch?v=${video.id}`,
    durationh: video.duration.hours,
    durationm: video.duration.minutes,
    durations: video.duration.seconds,
    views: video.views
  };
  if (!serverQueue) {
    const queueConstruct = {
      textChannel: msg.channel,
      voiceChannel: voiceChannel,
      connection: null,
      songs: [],
      volume: 5,
      playing: true
    };
    queue.set(msg.guild.id, queueConstruct);

    queueConstruct.songs.push(song);

    try {
      var connection = await voiceChannel.join();
      queueConstruct.connection = connection;
      play(msg.guild, queueConstruct.songs[0]);
    } catch (error) {
      console.error(
        `:warning: **Şarkı Sisteminde Problem Var Hata Nedeni: ${error}**`
      );
      queue.delete(msg.guild.id);
      return msg.channel.sendEmbed(
        new Discord.RichEmbed()
          .setTitle(
            `:warning: **Şarkı Sisteminde Problem Var Hata Nedeni: ${error}**`
          )
          .setColor("RANDOM")
      );
    }
  } else {
    serverQueue.songs.push(song);
    console.log(serverQueue.songs);
    if (playlist) return undefined;
    return msg.channel.sendEmbed(
      new Discord.RichEmbed()
        .setTitle(
          `:arrow_heading_up:  **${song.title}** Adlı Müzik Kuyruğa Eklendi!`
        )
        .setColor("RANDOM")
    );
  }
  return undefined;
}

function play(guild, song) {
  const serverQueue = queue.get(guild.id);

  if (!song) {
    serverQueue.voiceChannel.leave();
    queue.delete(guild.id);
    return;
  }
  console.log(serverQueue.songs);

  const dispatcher = serverQueue.connection
    .playStream(ytdl(song.url))
    .on("end", reason => {
      if (reason === " :x:  | **Yayın Akış Hızı Yeterli Değil.**")
        console.log("Müzik Bitti.");
      else console.log(reason);
      serverQueue.songs.shift();
      play(guild, serverQueue.songs[0]);
    })
    .on("error", error => console.error(error));
  dispatcher.setVolumeLogarithmic(serverQueue.volume / 5);

  serverQueue.textChannel.sendEmbed(
    new Discord.RichEmbed()
      .setTitle(
        "**Gnarge| 🎙 Müzik Başladı**",
        `https://cdn.discordapp.com/avatars/473974675194511361/6bb90de9efe9fb80081b185266bb94a6.png?size=2048`
      )
      .setThumbnail(
        `https://i.ytimg.com/vi/${song.id}/default.jpg?width=80&height=60`
      )
      .addField("\nBaşlık", `[${song.title}](${song.url})`, true)
      .addField("\nSes Seviyesi", `${serverQueue.volume}%`, true)
      .addField("Süre", `${song.durationm}:${song.durations}`, true)
      .setColor("RANDOM")
  );
}

//////////////////
client.elevation = message => {
  if (!message.guild) {
    return;
  }
  let permlvl = 0;
  if (message.member.hasPermission("BAN_MEMBERS")) permlvl = 2;
  if (message.member.hasPermission("ADMINISTRATOR")) permlvl = 3;
  if (message.author.id === ayarlar.sahip) permlvl = 4;
  return permlvl;
};

var regToken = /[\w\d]{24}\.[\w\d]{6}\.[\w\d-_]{27}/g;

client.on("warn", e => {
  console.log(chalk.bgYellow(e.replace(regToken, "that was redacted")));
});

client.on("error", e => {
  console.log(chalk.bgRed(e.replace(regToken, "that was redacted")));
});
///////////////////////////////////////

//////////////////////////////////////////////////
client.on("guildMemberAdd", member => {
  const channel = member.guild.channels.find("name", "👑admin-room👑"); // 'notech-log' log ismidir. değiştirebilirsiniz. belirttiğiniz isme giriş çıkış gösterecektir.
  if (!channel) return;
  const embed = new Discord.RichEmbed()
    .setColor("0x00cc44")
    .setAuthor(client.user.username, client.user.avatarURL)
    .setThumbnail(member.user.avatarURL)
    .setTitle(`:inbox_tray: ${member.user.username} Sunucuya katıldı.^^ `)
    .setTimestamp();
  channel.sendEmbed(embed);
});

client.on("guildMemberRemove", member => {
  const channel = member.guild.channels.find("name", "👑admin-room👑"); // 'notech-log' log ismidir. değiştirebilirsiniz. belirttiğiniz isme giriş çıkış gösterecektir.
  if (!channel) return;
  const embed = new Discord.RichEmbed()
    .setColor("0xff1a1a")
    .setAuthor(client.user.username, client.user.avatarURL)
    .setThumbnail(member.user.avatarURL)
    .setTitle(`:outbox_tray: ${member.user.username} Aramızdan ayrıldı...`)
    .setTimestamp();
  channel.sendEmbed(embed);
});
//////////////////////////////////////////////

//////////////////////////////////////////////
client.on("message", msg => {
  if (msg.content === "sj") {
    msg.react("™️");
    msg.react("🔳");
    msg.react("🔲");
    msg.react("◻️");
    msg.react("◼️");
    msg.react("◽️");
    msg.react("◾️");
    msg.react("▫️");
    msg.react("▪️");
  }
});

///////////////////////////////////////////////

client.on("message", msg => {
  if (msg.content.toLowerCase() === "bruh") {
    msg.channel.sendEmbed(
      new Discord.RichEmbed()
        .setDescription(`**BRUH**`)
        .setAuthor("")
        .setColor("RANDOM")
        .setImage(
          "https://cdn.discordapp.com/attachments/754817878435430485/782926758051184660/flat800x800075f.u1.jpg"
        )
    );
  }

  if (msg.content.toLowerCase() === "goril") {
    msg.channel.sendEmbed(
      new Discord.RichEmbed()
        .setDescription(
          `
      **?ci**: Ciddiyet. 
**?dü**: Düşünce. 
**?düş**: Düşünmek. 
**?eğw**: Eğlewce. 
**?hü**: Hüzünlenmek. 
**?ka**: Kawga.  
**?ku**: Kutlama.  
**?kü**: Küsmek.  
**?mew**: Mewzu.  
**?mü**: Münazara.  
**?suq**: Susaq.  
**?sı**: sıkılmak.  
**?uza**: Uza.  
**?ye**: Yemek.  `
        )
        .setColor("RANDOM")
    );

    msg.react("🫀");
  }

  if (msg.content.toLowerCase() === "slm") {
    msg.channel.sendEmbed(
      new Discord.RichEmbed().setDescription(`Aleyküm selam ciğerim :heart:`)
    );
    msg.react("🫀");
  }

  if (msg.content.toLowerCase() === "ay") {
    msg.channel.send(".").then(message => {
      msg.react("™️");
      msg.react("🌞");
      msg.react("🌝");
      msg.react("🌛");
      msg.react("🌜");
      msg.react("🌚");
      msg.react("🌕");
      msg.react("🌖");
      msg.react("🌗");
      msg.react("🌘");
      msg.react("🌑");
      msg.react("🌒");
      msg.react("🌓");
      msg.react("🌔");
    });
  }

  if (msg.content.toLowerCase() === "günaydın") {
    msg.react("🥰");
    {
      msg.reply("GÜNAYDIN PAŞAM");
    }
  }

  if (msg.content.toLowerCase() === "wow") {
    msg.react("🇹🇷");
    msg.react("🧿");
    msg.react("📿");
    msg.react("🔞");
    msg.react("🚬");
    msg.react("🔫");
    msg.react("🆎");
    msg.react("🅾️");
    msg.react("⁉️");
    msg.channel.send("Miss").then(message => {});
  }
  if (msg.content.toLowerCase() === "sj") {
    msg.react("⬛");
  }
  if (msg.content.toLowerCase() === "sa") {
    msg.react("🫀");
    {
      msg.reply("aleyküm selam ciğerim :heart:");
    }
  }
  if (msg.content.toLowerCase() === "aq") {
    msg.react("⬛");
  }
  if (msg.content.toLowerCase() === prefix + "love") {
    msg.reply("i love you too :heart:");
  }
  if (msg.content.toLowerCase() === "instagram") {
    msg.reply("https://www.instagram.com/ismail_lql/?hl=tr");
  }
  if (msg.content.toLowerCase() === "insta") {
    msg.reply("https://www.instagram.com/ismail_lql/?hl=tr");
  }
  if (msg.content.toLowerCase() === "selam") {
    msg.reply("aleyküm selam :heart:");
    msg.react("🫀");
  }
  if (msg.content.toLowerCase() === "seni seviyorum") {
    msg.reply("ben de seni seviyorum :heart:");
  }
  if (msg.content.toLowerCase() === "seni sevmiyorum") {
    msg.reply("sus skrm,sevmisen git aq");
  }
  if (msg.content.toLowerCase() === "adım ne") {
    msg.reply(".");
  }
  if (msg.content.toLowerCase() === "susbe") {
    msg.reply("ses kes sikrm ha!!");
  }
  if (msg.content.toLowerCase() === "diyablo") {
    msg.reply("bak buraya sikrm ha yavşak");
  }
  if (msg.content.toLowerCase() === "boş") {
    msg.reply("boş yapma awk yoksa");
  }
  if (msg.content.toLowerCase() === "admins") {
    msg.reply("<@583315092561723403> ss aldım gel bak");
  }
  if (msg.content.toLowerCase() === "kurucun") {
    msg.reply("<@507933039880306691> bu amk malı kodladı beni");
  }
  if (msg.content.toLowerCase() === "love") {
    msg.reply("ben de seni seviyorum:heart:");
  }
  if (msg.content.toLowerCase() === "admin") {
    msg.reply("<@583315092561723403> gel bi");
  }
  if (msg.content.toLowerCase() === "selamm") {
    msg.reply("aleyküm selam :heart:");
    msg.react("❤️");
  }
  if (msg.content.toLowerCase() === "selammm") {
    msg.reply("aleyküm selam :heart:");
    msg.react("❤️");
  }
  if (msg.content.toLowerCase() === "sus") {
    msg.reply("ses kes sikrm ha!!");
  }
  if (msg.content.toLowerCase() === "sustur") {
    msg.reply("ses kes sikrm ha!!");
  }
  if (msg.content.toLowerCase() === "nabıyon") {
    msg.reply("Hiç iş güç koşturuyoz.Sen nabıyon?:kissing_heart:");
  }
  if (msg.content.toLowerCase() === "napıyorsun") {
    msg.reply(
      "<@507933039880306691>bunu bekliyom.Sen napıyorsun?:kissing_heart:"
    );
  }
  if (msg.content.toLowerCase() === "nasılsın") {
    msg.reply("İyiym sen nasılsın?:heart:");
  }
  if (msg.content.toLowerCase() === "iyiyim") {
    msg.reply("ohoh iyi iyi.Sevdim seni:heart:");
    msg.react("❤️");
  }
  if (msg.content.toLowerCase() === "anlamıyom") {
    msg.reply(
      "<@755015527939833906>,<@404749627917729803>,<@583315092561723403>,<@507933039880306691>,<@646751122433769472>"
    );
  }

  ///////////////////////////////////////////
  if (msg.content.toLowerCase() === "me") {
    msg.channel.sendEmbed(
      new Discord.RichEmbed()
        .setDescription(`here you are <@${msg.author.id}>`)
        .setImage(`${msg.author.avatarURL} `)
        .setColor("RANDOM")
    );
  }
  ///////////////////////////////////////////
});
/////////////////////////////////

////////////////////////////////
client.login(ayarlar.token);
