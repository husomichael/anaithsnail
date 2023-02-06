import Discord from 'discord.js';
import puppeteer from 'puppeteer';
import { onMessage, onReady } from "./events.js";

const config = {
    token: process.env.TOKEN,
    serverId: process.env.SERVER_ID,
    textChannelID: process.env.TEXT_CHANNEL_ID,
    voiceChannelID: process.env.VOICE_CHANNEL_ID,
    discordEmail: process.env.DISCORD_EMAIL,
    discordPassword: process.env.DISCORD_PASSWORD,
    browser: {
        headless: false,
        userDataDir: './data',
        defaultViewport: null,
        executablePath: process.env.CHROME_PATH,
        devtools: true,
        args: [`--window-size=${process.env.WIDTH},${process.env.HEIGHT}`],
    },
};
export const client = new Discord.Client();

// Open a browser to Discord web.
export const browser = await puppeteer.launch(config.browser);
export const discordPage = await browser.newPage();
export const plexPage = await browser.newPage();

export async function start() {
    client.once('ready', onReady);
    client.on('message', onMessage);

    // Sign in to Discord using the API.
    await client.login(config.token);
}
