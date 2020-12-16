const db = require("quick.db");
const Discord = require("discord.js");

exports.run = async (client, message, args) => {
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
**?ye**: Yemek.  
`;
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["help"],
  permLevel: 0,
  kategori: "bot"
};

exports.help = {
  name: "goril",
  description: "goril komutlarını listeler",
  usage: "goril"
};
