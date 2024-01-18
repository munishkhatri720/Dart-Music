import { Dart } from "./client/Dart";
import { BOT_TOKEN} from "./config";


const client = new Dart();
client.login(BOT_TOKEN);