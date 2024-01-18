import { LogLevel, SapphireClient , ApplicationCommandRegistries , RegisterBehavior } from "@sapphire/framework";
import { BOT_PREFIX } from "../config";
import { ActivityType, Partials} from "discord.js";


export class Dart extends SapphireClient {
    public constructor() {
        super( {
            intents: [
                "Guilds",
                "GuildMessages",
                "GuildVoiceStates",
                "GuildMembers",
                "MessageContent",
                "GuildEmojisAndStickers"
            ],
            caseInsensitiveCommands: true,
            caseInsensitivePrefixes:true,
            defaultPrefix: BOT_PREFIX,
            shards:'auto',
            logger:{'level': LogLevel.Debug},
            presence : {'status':'idle',activities:[{'type':ActivityType.Listening ,'name':`/help`}]},
            loadMessageCommandListeners:true,
            allowedMentions : {'parse':['users'],repliedUser:true}


        })
    }
    public override login(token?: string): Promise<string> {
        ApplicationCommandRegistries.setDefaultBehaviorWhenNotIdentical(RegisterBehavior.BulkOverwrite);

        return super.login(token);
        
    }
    

}