import { Listener , Events , container } from "@sapphire/framework";
import { VoicePacket } from "moonlink.js";

export class RawEvents extends Listener<typeof Events.Raw> {
    async run(data : VoicePacket){
        container.client.moon.packetUpdate(data)
    }
}