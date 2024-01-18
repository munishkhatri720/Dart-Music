import { Command ,type  ApplicationCommandRegistry} from "@sapphire/framework";
import { Message , ChatInputCommandInteraction} from "discord.js";
import {ApplyOptions} from "@sapphire/decorators"


@ApplyOptions<Command.Options>({
    name: "ping",
    description : "Get Client ws latency."
})

export default class PingCommand extends Command {
 
    public override registerApplicationCommands(registry : Command.Registry) {
        registry.registerChatInputCommand(command => {
            command.setName(this.name).setDescription(this.description);})
        
        }

    public async chatInputRun(interaction : Command.ChatInputCommandInteraction) {
        await interaction.deferReply();
        await interaction.editReply(`My ping is ${this.container.client.ws.ping} ms`)
    }

}