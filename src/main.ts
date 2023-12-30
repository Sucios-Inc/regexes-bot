import { Bot } from "grammy/mod.ts";
import { searchCommand } from './lib/commands.ts'

const bot = new Bot(Deno.env.get("BOT_TOKEN") ?? '');
const pm = bot.chatType("private");
const group = bot.chatType(["group", "supergroup"]);

pm.command("start", (ctx) => ctx.reply("Welcome! Up and running."));

group.command("search", searchCommand);

export default bot;
