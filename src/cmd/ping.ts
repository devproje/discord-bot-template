import { CommandInteraction } from "npm:discord.js";
import { AppCommand } from "../interfaces/command.ts";

export class PingPong implements AppCommand {
	name: string = "ping";
	description: string = "Discord API의 레이턴시를 확인 합니다.";

	async execute(interaction: CommandInteraction) {
		await interaction.followUp(`:ping_pong: **Pong!** ${interaction.client.ws.ping}ms`);
	}
}
