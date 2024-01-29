import { Listener , Events } from "@sapphire/framework";
import { Client } from "discord.js";
import { Dart } from "../../client/Dart";


export class ReadyListener extends Listener {
  public constructor(context: Listener.LoaderContext, options: Listener.Options) {
    super(context, {
      ...options,
      once: true,
      event : Events.ClientReady
    });
  }

    public run(client : Dart){
      client.moon.init(client.user!.id);
      const {tag} = client.user!;
      this.container.logger.info(`Logged in as ${tag}`);
    }

}