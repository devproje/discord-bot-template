import { GatewayIntentBits } from "npm:discord.js";
import { PingPong } from "./cmd/ping.ts";
import { BotKernel } from "./bot/kernel.ts";

const token: string | undefined = Deno.env.get("BOT_TOKEN");
if (!token || token === "") {
	console.error("token is not defined!");
	Deno.exit(-1);
}

const kernel = new BotKernel(token, [
	GatewayIntentBits.GuildPresences,
	GatewayIntentBits.DirectMessages
]);
kernel.addCommand("ping", new PingPong());

kernel.run().then(_ => _);
