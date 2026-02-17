import fs from "fs";

const log_file = "data/log.json";
const error_file = "data/error.json";

function add_to_file(file, data) {
    fs.writeFile(file, data, { flag: "a+" }, err => err && console.error(err));
}

export function log() {
    console.log(...arguments);

    const timestamp = "[" + Date.now() + "]";
    const data = Array.from(arguments).join(" ");
    add_to_file(log_file, timestamp + data + "\n");
}

export function logError(error) {
    console.error(error);
    add_to_file(error_file, error);
}
