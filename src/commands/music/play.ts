import { Command, ApplicationCommandRegistry } from "@sapphire/framework";
import { ApplyOptions } from "@sapphire/decorators";
import { Message, ChatInputCommandInteraction } from "discord.js";

@ApplyOptions<Command.Options>({
  name: "play",
  description: "play any query or link.",
  aliases: ["p"],
})
export class PlayCommand extends Command {
  public override registerApplicationCommands(registry: Command.Registry) {
    registry.registerChatInputCommand((command) => {
      command.setName(this.name).setDescription(this.description).addStringOption((option)=>option.setName('query').setDescription('What you want to search').setRequired(true));
    });
  }
  public async chatInputRun(interaction: ChatInputCommandInteraction) {
    if (!interaction.guild) return;
    if (!interaction.member) return;
    if (!interaction.channel) return;
    await interaction.deferReply();
    const search = interaction.options.get("query");
    if (!search)
      return await interaction.editReply(`Please provide a query to search.`);
    const vc = interaction.guild.members.cache.get(interaction.user.id)?.voice
      .channel;
    if (!vc)
      return await interaction.editReply(
        `You must be connected to a voice channel.`
      );
    const player = this.container.client.moon.players.create({
      guildId: interaction.guild.id,
      voiceChannel: vc.id,
      textChannel: interaction.channelId,
    });
    if (!player.connected) {
      player.connect({ setDeaf: true, setMute: false });
    }
    const searchresult = await this.container.client.moon.search({
      query: `${search}`,
      source: "ytsearch",
      requester: [interaction.user.id],
    });
    
    if (searchresult.loadType == "playlist") {
      for (const track of searchresult.tracks) {
        player.queue.add(track);
      }
    } else {
      player.queue.add(searchresult.tracks[0]);
    }
    if (!player.playing) {
      player.play();
    }
    await interaction.editReply("done");
  }
}
