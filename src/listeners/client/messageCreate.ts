import { Listener , Events  , container} from "@sapphire/framework";
import { GatewayDispatchEvents, Message} from "discord.js";
import { ApplyOptions } from "@sapphire/decorators";
import {Client} from 'dokdo'
import { BOT_PREFIX } from "../../config";


const DokdoHandler = new Client(container.client , {'aliases':['dok','jsk','dokdo'],'prefix':BOT_PREFIX,'owners':['1164064754533408828']})

export class MessageCreateListener extends Listener <typeof Events.MessageCreate> {
    public override async run (message : Message) {
        await DokdoHandler.run(message)

    }
}