import { guild } from "./utils.js";

const invisibleName = "᲼᲼";
const invisibleRoleId = "1180979381024325773";

export function updateInvisible() {
    guild.members.fetch().then(members => members.forEach(member => {
        const name = member.nickname || "";

        const invisible = member.roles.cache.get(invisibleRoleId);

        try {
            if (!invisible && name == invisibleName) {
                member.setNickname(null);
                console.log("Made " + member.user.username + " visible");
            }
            if (invisible && name != invisibleName) {
                member.setNickname(invisibleName);
                console.log("Made " + member.user.username + " invisible");
            }
        }
        catch (error) {
            console.error(error);
        }
    }));

    console.log("Updating invisible roles");
}
