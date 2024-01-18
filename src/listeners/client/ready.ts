import { Listener , Events } from "@sapphire/framework";
import { Client } from "discord.js";


export class ReadyListener extends Listener {
  public constructor(context: Listener.LoaderContext, options: Listener.Options) {
    super(context, {
      ...options,
      once: true,
      event : Events.ClientReady
    });
  }

    public run(client : Client){
        const {tag} = client.user!;
        this.container.logger.debug(`Logged in as ${tag}`);
    }

}