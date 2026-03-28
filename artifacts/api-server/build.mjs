import * as esbuild from "esbuild";

await esbuild.build({
  entryPoints: ["src/index.ts"],
  bundle: true,
  platform: "node",
  format: "cjs",
  outfile: "dist/index.cjs",
  external: [
    "discord.js",
    "@discordjs/rest",
    "@discordjs/ws",
    "@discordjs/collection",
    "@discordjs/util",
    "@discordjs/builders",
    "pino",
    "pino-http",
    "pino-pretty",
    "thread-stream",
    "pg",
    "pg-native",
    "better-sqlite3",
    "mysql2",
    "oracledb",
    "tedious",
    "sqlite3",
  ],
});

console.log("Build complete: dist/index.cjs");
