import { Client, GatewayIntentBits, Interaction } from "discord.js";
import { AppCommand } from "../interfaces/command";

export class BotKernel {
	private token: string;
	private bot: Client<boolean>;
	private commands: Map<string, AppCommand> = new Map();

	register(name: string, command: AppCommand) {
		console.log(`load command /%s`, command.name);
		this.commands.set(name, command);
	}

	unregister(name: string) {
		this.commands.delete(name);
	}

	async run() {
		const data = Array.from(this.commands.values());
		this.bot.once("ready", async (client: Client<true>) => {
			await client.application.commands.set(data);
			console.log(`logged in as ${client.user.username}#${client.user.discriminator}`);
		})

		this.bot.on("interactionCreate", async (interaction: Interaction) => {
			if (!interaction.isCommand())
				return;

			const current = data.find(c => c.name === interaction.commandName);

			if (current) {
				await interaction.deferReply();

				await current.execute(interaction);
				console.log(`${interaction.user.id} use command: /${current.name}`);
			}
		});

		await this.bot.login(this.token);
	}

	constructor(token: string, intents: GatewayIntentBits[] = []) {
		this.token = token;
		this.bot = new Client({
			intents: intents
		});

		console.log("loading bot kernel...");
	}
}
