import { guild } from "./utils.js";
import fs from "fs";

const path = "./data/invisible.json";
let invisiblePeople = undefined; // list of IDs
const invisibleRoleId = "1180979381024325773";
let members = undefined; // list of GuildMember
const invisibleName = "᲼᲼";

function getInvisiblePeople(callback) {
    const set = new Set();

    members = [];
    guild.members.fetch().then(members => members.forEach(member => {
        members.push(member);

        member.roles.fetch().then(roles => roles.forEach(role => {
            if (role.id == invisibleRoleId) set.add(member.id);
        }));
    }));

    return set;
}

function loadFile(callback = undefined) {
    fs.readFile(path, 'utf8', (err, data) => {
        if (err) {
            console.log(err);
            invisiblePeople = new Set();
        }
        else if (!data) invisiblePeople = new Set();
        else invisiblePeople = new Set(JSON.parse(data));

        if (callback !== undefined) callback();
    });
}

export function initInvisible() {
    loadFile(updateInvisible);
}

export function updateInvisible() {
    if (invisiblePeople == null) {
        // force load file if not loaded yet
        // (might load the file twice but oh well)
        loadFile(updateInvisible);
        return;
    }
    console.log("update");

    const prev = invisiblePeople;
    getInvisiblePeople(people => {
        invisiblePeople = people;

        // update persistent storage
        fs.writeFile(path, JSON.stringify(Array.from(invisiblePeople)),
            err => err && console.log(err));

        // new hidden people
        invisiblePeople.difference(prev).forEach(id => {
            console.log('more', id);
        });
        prev.difference(invisiblePeople).forEach(id => {
            console.log('less', id);
        });
    });
}
