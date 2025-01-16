import { GatewayIntentBits } from "npm:discord.js";
import { PingPong } from "./cmd/ping.ts";
import { BotKernel } from "./core/bot.ts";

if (Deno.env.get("BOT_TOKEN") === undefined) {
	console.error("token is not defined!");
	Deno.exit(-1);
}

const kernel = new BotKernel(Deno.env.get("BOT_TOKEN")!, [
	GatewayIntentBits.GuildPresences,
	GatewayIntentBits.DirectMessages
]);
kernel.registerCommand("ping", new PingPong());

kernel.run().then(_ => _);
