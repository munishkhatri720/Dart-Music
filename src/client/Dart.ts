import {
  LogLevel,
  SapphireClient,
  ApplicationCommandRegistries,
  RegisterBehavior,
} from "@sapphire/framework";
import { BOT_PREFIX } from "../config";
import { ActivityType, Message, Partials } from "discord.js";
import { MoonlinkManager } from "moonlink.js";

export class Dart extends SapphireClient {
  public moon: MoonlinkManager;
  public constructor() {
    super({
      intents: [
        "Guilds",
        "GuildMessages",
        "GuildVoiceStates",
        "GuildMembers",
        "MessageContent",
        "GuildEmojisAndStickers",
      ],
      caseInsensitiveCommands: true,
      caseInsensitivePrefixes: true,
      defaultPrefix: BOT_PREFIX,
      shards: "auto",
      logger: { level: LogLevel.Info },
      presence: {
        status: "idle",
        activities: [{ type: ActivityType.Listening, name: `/help` }],
      },
      loadMessageCommandListeners: true,
      allowedMentions: { parse: ["users"], repliedUser: true },
    });
    this.moon = new MoonlinkManager(
      [
        {
          host: "78.46.65.243",
          identifier: "optiklink",
          password: "manish2004",
          port: 3965,
          secure: false,
        },
      ],
      {},
      (guild: any, sPayload: any) => {
        this.guilds.cache.get(guild)?.shard.send(JSON.parse(sPayload));
      }
    );
  }
  public override login(token?: string): Promise<string> {
    ApplicationCommandRegistries.setDefaultBehaviorWhenNotIdentical(
      RegisterBehavior.BulkOverwrite
    );

    return super.login(token);
  }
}

declare module "discord.js" {
  interface Client {
    readonly moon: MoonlinkManager;
  }
}
