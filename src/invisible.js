import { guild } from "./utils.js";
import { log, logError } from "../src/error.js";

const invisibleName = "᲼᲼";
const invisibleRoleId = "1180979381024325773";

export function updateInvisible() {
    guild.members.fetch().then(members => members.forEach(member => {
        const name = member.nickname || "";

        const invisible = member.roles.cache.get(invisibleRoleId);

        try {
            if (!invisible && name == invisibleName) {
                member.setNickname(null);
                log("Made " + member.user.username + " visible");
            }
            if (invisible && name != invisibleName) {
                member.setNickname(invisibleName);
                log("Made " + member.user.username + " invisible");
            }
        }
        catch (error) {
            logError(error);
        }
    }));

    console.log("Updating invisible roles");
}
