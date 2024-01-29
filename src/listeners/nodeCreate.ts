import { Listener , Events , container } from "@sapphire/framework";
import { ApplyOptions } from "@sapphire/decorators";
import { MoonlinkNode } from "moonlink.js";




export class NodeConnectEvent extends Listener {
    public constructor(context : Listener.LoaderContext , options: Listener.Options){
        super(context , {
            ...options,
            emitter : container.client.moon,
            event: 'nodeCreate',
            name : 'nodeCreate'
        });
    }
    async run(node : MoonlinkNode) {
        container.client.logger.info(`Node with ${node.identifier} is connected `)
    }
}