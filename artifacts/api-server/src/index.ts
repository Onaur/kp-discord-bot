import { createApp } from "./app.js";
import { startBot } from "./bot.js";

const PORT = Number(process.env.PORT) || 3000;
const DISCORD_BOT_TOKEN = process.env.DISCORD_BOT_TOKEN;

if (!DISCORD_BOT_TOKEN) {
  console.error("❌ DISCORD_BOT_TOKEN bulunamadı. Lütfen secret olarak ekle.");
  process.exit(1);
}

startBot(DISCORD_BOT_TOKEN);

const app = createApp();
app.listen(PORT, "0.0.0.0", () => {
  console.log(`API sunucusu ${PORT} portunda çalışıyor`);
});
