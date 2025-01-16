import { ChatInputApplicationCommandData, CommandInteraction } from "npm:discord.js";

export interface AppCommand extends ChatInputApplicationCommandData {
	execute(interaction: CommandInteraction): Promise<void>;
}
