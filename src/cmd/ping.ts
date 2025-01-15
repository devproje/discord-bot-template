import { ChatInputApplicationCommandData, Client, CommandInteraction } from "discord.js";
import { AppCommand } from "../interfaces/command";

export class PingPong implements AppCommand {
	name: string =  "ping";
	description: string = "Discord API의 레이턴시를 확인 합니다.";

	async execute(interaction: CommandInteraction): Promise<void> {
		await interaction.followUp(`:ping_pong: **Pong!** ${interaction.client.ws.ping}ms`);
	}
}
