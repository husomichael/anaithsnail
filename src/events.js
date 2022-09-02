import {addFriends, playPlex} from "./commands.js";
import {client, discordPage, plexPage} from "./anaithsnail.js";
import {config} from "dotenv";

export async function onReady() {
    console.log(`Logged in as ${client.user.tag}!`);

    //Open discord in a browser.
    await discordPage.goto(`https://discord.com/channels/${config.serverId}`, {
        waitUntil: 'networkidle0',
    });

    //Open Plex
    await plexPage.goto(`https://app.plex.tv/desktop/#!/`, {
        waitUntil: `networkidle0`,
    });
}

export async function onMessage(msg) {
    const cmdName = msg.content.toLowerCase();

    //Commands
    switch (cmdName) {
        case 'ping':
            await msg.reply('pong');
            break;
        case 'play':
            await playPlex();
            break;
        case 'friends':
            await addFriends();
            break;
    }
}

