import {
  Client,
  GatewayIntentBits,
  GuildMember,
  PartialGuildMember,
  Events,
} from "discord.js";

const ALLOWED_GUILD_ID = "1373842995312463955";

const WELCOME_MESSAGE = `🎉 **KralPerso Sunucusuna Hoş Geldin!**

Merhaba! Seni aramızda görmekten çok mutluyuz. 😊

📌 **Sunucuda neler var?**
• Sohbet kanallarımızda takılabilir, yeni insanlarla tanışabilirsin.
• Kurallara uymayı unutma, herkese saygılı ol.
• Sorularını veya sorunlarını yetkililerimize iletebilirsin.

🛡️ Kuralları oku, eğlenceli ve huzurlu bir ortam için hepimizin katkısı önemli!

Keyifli vakit geçirmeni dileriz! 🚀`;

const GOODBYE_MESSAGE = `👋 **KralPerso Sunucusundan Ayrıldın**

Bizimle geçirdiğin zaman için teşekkürler. Umarız tekrar görüşürüz! 💙

Dilersen her zaman geri dönebilirsin. 🚪`;

export function startBot(token: string) {
  const client = new Client({
    intents: [
      GatewayIntentBits.Guilds,
      GatewayIntentBits.GuildMembers,
      GatewayIntentBits.DirectMessages,
    ],
  });

  client.once(Events.ClientReady, (c) => {
    console.log(`✅ Discord botu hazır: ${c.user.tag}`);

    // Yetkisiz sunuculardan çık
    for (const guild of c.guilds.cache.values()) {
      if (guild.id !== ALLOWED_GUILD_ID) {
        guild.leave().then(() => {
          console.warn(`🚫 Yetkisiz sunucudan çıkıldı: ${guild.name} (${guild.id})`);
        }).catch(() => {});
      }
    }
  });

  // Yetkisiz sunucuya eklenirse anında çık
  client.on(Events.GuildCreate, (guild) => {
    if (guild.id !== ALLOWED_GUILD_ID) {
      console.warn(`🚫 Yetkisiz sunucuya eklenme girişimi engellendi: ${guild.name} (${guild.id})`);
      guild.leave().catch(() => {});
    }
  });

  client.on(
    Events.GuildMemberAdd,
    async (member: GuildMember | PartialGuildMember) => {
      if (member.guild.id !== ALLOWED_GUILD_ID) return;
      try {
        await member.send(WELCOME_MESSAGE);
        console.log(`📨 Hoşgeldin mesajı gönderildi: ${member.user?.tag}`);
      } catch {
        console.warn(`⚠️ DM gönderilemedi (${member.user?.tag}): Kullanıcı DM'leri kapalı olabilir.`);
      }
    }
  );

  client.on(
    Events.GuildMemberRemove,
    async (member: GuildMember | PartialGuildMember) => {
      if (member.guild.id !== ALLOWED_GUILD_ID) return;
      try {
        await member.send(GOODBYE_MESSAGE);
        console.log(`📨 Güle güle mesajı gönderildi: ${member.user?.tag}`);
      } catch {
        console.warn(`⚠️ DM gönderilemedi (${member.user?.tag}): Kullanıcı DM'leri kapalı olabilir.`);
      }
    }
  );

  client.login(token).catch((err) => {
    console.error("❌ Bot giriş yapamadı:", err.message);
    process.exit(1);
  });

  return client;
}
