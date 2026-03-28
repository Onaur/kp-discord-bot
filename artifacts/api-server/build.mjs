import * as esbuild from "esbuild";
import pinoPlugin from "esbuild-plugin-pino";

await esbuild.build({
  entryPoints: ["src/index.ts"],
  bundle: true,
  platform: "node",
  format: "cjs",
  outfile: "dist/index.cjs",
  plugins: [pinoPlugin({ transports: ["pino-pretty"] })],
  external: [
    "discord.js",
    "@discordjs/rest",
    "@discordjs/ws",
    "@discordjs/collection",
    "@discordjs/util",
    "@discordjs/builders",
    "pg-native",
    "better-sqlite3",
    "mysql2",
    "oracledb",
    "tedious",
    "sqlite3",
  ],
});

console.log("Build complete: dist/index.cjs");
