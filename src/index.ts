import { PingPong } from "./cmd/ping";
import { BotKernel } from "./core/bot";
import dotenv from "dotenv";

dotenv.config();

if (typeof process.env.BOT_TOKEN === "undefined") {
	console.error("token is not defined!");
	process.exit(-1);
}

const kernel = new BotKernel(process.env.BOT_TOKEN);
kernel.register("ping", new PingPong());

kernel.run().then(_ => {});
