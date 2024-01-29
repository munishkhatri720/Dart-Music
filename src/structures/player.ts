import { MoonlinkPlayer , MoonlinkManager , PlayerInfos } from "moonlink.js";

export class DartPlayer extends MoonlinkPlayer {
    public constructor(infos : PlayerInfos , manager : MoonlinkManager , map : Map<string , any>){
        super(infos , manager , map)
    }
}