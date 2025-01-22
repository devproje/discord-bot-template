import { Client, Interaction, GatewayIntentBits } from "npm:discord.js";
import { ActivityType } from "npm:discord-api-types@0.37.115/payloads";
import deno from "../../deno.json" with { type: "json" };
import { AppCommand } from "../interfaces/command.ts";

export class BotKernel {
	private readonly token: string;

	private bot: Client;
	private commands: Map<string, AppCommand> = new Map();

	addCommand(name: string, command: AppCommand) {
		console.log(`load command /%s`, command.name);
		this.commands.set(name, command);
	}

	removeCommand(name: string) {
		this.commands.delete(name);
	}

	async run() {
		const data = Array.from(this.commands.values());
		this.bot.once("ready", async (client: Client<true>) => {
			await client.application.commands.set(data);
			console.log(`logged in as ${client.user.username}#${client.user.discriminator}`);
			console.log(`bot handling deno version for v${Deno.version.deno}`)

			setInterval(() => {
				client.user.setActivity({
					name: `Discord Bot Template v${deno.version}`,
					type: ActivityType.Playing,
				});
			}, 10);
		});

		this.bot.on("interactionCreate", async (interaction: Interaction) => {
			if (!interaction.isCommand())
				return;

			const current = data.find(c => c.name === interaction.commandName);

			if (!current)
				return;

			await interaction.deferReply();
			console.log(`${interaction.user.id} use command: /${current.name}`);

			try {
				await current.execute(interaction);
			} catch (err) {
				console.error(err);
			} finally {
				if (current.break)
					await current.break();
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
