import Discord from 'discord.js';
import puppeteer from 'puppeteer';
import { onMessage, onReady } from "./events.js";

let browser, client, config, discordPage, plexPage;

// Open a browser to Discord web.

export function getConfig() {
    if (config) return config;
    config = {
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
    return config;
}


export async function getBrowser() {
    if (browser) return browser;
    browser = await puppeteer.launch(getConfig().browser);
}

export function getDiscordClient() {
    if (client) return client;
    client = new Discord.Client();
    return client;
}

export async function getDiscordPage() {
    if (discordPage) return discordPage;
    discordPage = await browser.newPage();
    return discordPage
}

export async function getPlexPage() {
    if (plexPage) return plexPage;
    plexPage = await browser.newPage();
    return plexPage;
}

export async function start() {
    const config = getConfig();
    client.once('ready', onReady);
    client.on('message', onMessage);

    // Sign in to Discord using the API.
    await client.login(config.token);
}
