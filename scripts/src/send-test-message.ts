import { Client, GatewayIntentBits } from "discord.js";

const TEST_MESSAGE = `🔔 **Bu bir test mesajıdır.**

KralPerso Discord botunun DM sistemi başarıyla çalışıyor. Bu mesajı yoksayabilirsin. ✅`;

const token = process.env.DISCORD_BOT_TOKEN;
if (!token) {
  console.error("❌ DISCORD_BOT_TOKEN bulunamadı.");
  process.exit(1);
}

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.DirectMessages,
  ],
});

client.once("ready", async (c) => {
  console.log(`✅ Giriş yapıldı: ${c.user.tag}`);

  let toplamGonderilen = 0;
  let toplamBasarisiz = 0;

  for (const guild of client.guilds.cache.values()) {
    console.log(`\n📋 Sunucu: ${guild.name} (${guild.memberCount} üye)`);

    const members = await guild.members.fetch();
    for (const member of members.values()) {
      if (member.user.bot) continue;

      try {
        await member.send(TEST_MESSAGE);
        console.log(`  ✉️  Gönderildi: ${member.user.tag}`);
        toplamGonderilen++;
        await new Promise((r) => setTimeout(r, 500));
      } catch {
        console.warn(`  ⚠️  Gönderilemedi: ${member.user.tag} (DM kapalı olabilir)`);
        toplamBasarisiz++;
      }
    }
  }

  console.log(`\n📊 Sonuç: ${toplamGonderilen} gönderildi, ${toplamBasarisiz} başarısız.`);
  client.destroy();
  process.exit(0);
});

client.login(token);
