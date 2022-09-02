const Discord = require('discord.js');
const puppeteer = require('puppeteer');
const child_process = require('child_process');
require('dotenv').config();

const client = new Discord.Client();;
const config = {
    token: process.env.TOKEN,
    serverId: process.env.SERVER_ID,
    textChannelID: process.env.TEXT_CHANNEL_ID,
    voiceChannelID: process.env.VOICE_CHANNEL_ID,
};

let player = null;

var start = async function(){

    // Open a browser to Discord web.
    const browser = await puppeteer.launch({ 
        headless: false, 
        userDataDir: './data',
        defaultViewport: null,
        executablePath: process.env.CHROME_PATH,
        devtools: true,
    });
    const discordPage = await browser.newPage();
    const plexPage = await browser.newPage();

    client.on('ready', () => {
        console.log(`Logged in as ${client.user.tag}!`);
    });
    
    //Commands
    client.on('message', msg => {
        if (msg.content === 'ping') {
            msg.reply('pong');
        }
        if (msg.content === 'play') {
            playPlex();
        };
        if (msg.content === 'friends') {
            addFriends();
        }
    });


    await client.login(config.token);
    // Sign in to Discord using the API.

    //Open discord in a browser.
    await discordPage.goto(`https://discord.com/channels/${config.serverId}`, { waitUntil: 'networkidle0' });

    //Open Plex
    await plexPage.goto(`https://app.plex.tv/desktop/#!/`,{ 
        waitUntil: `networkidle0`
    });

    //Plex Selectors
    const menu = `span[class="_11ni0ce12 _11ni0ce9 _11ni0ce4e _11ni0ce1m _11ni0ce2a _11ni0ce2e _11ni0ce2u"]`;
    const plexAccountSettings = `a[class="pksp574 _11ni0ce1e _11ni0cea _11ni0cend"]`
    const movies = `a[title="Movies"]`;
    const accountSettings = `a[id="accountSettingsNavBarBtn"]`;
    const playTogether = `button[class="WatchTogetherHubItemPosterCard-link-L73ErH PosterCardLink-link-LozvMm Link-link-vSsQW1 Link-default-bdWb1S"]`;
    const friendRequests = `button[aria-controls="radix-26"]`;
    const acceptFriend = `button[class="ihlo9k2 _11ni0ce1a _11ni0cem _11ni0ceea _1kzuok60 ihlo9kd _11ni0cedq ihlo9k7"]`;

    // Discord Selectors
    const voiceChannelSelector = `a[data-list-item-id="channels___${config.voiceChannelID}"]`;
    const enableVideoButton = 'button[aria-label="Share Your Screen"]';

    //Command functions.
    var playPlex = async function() {

        // Play shared video on plex.
        await plexPage.waitForSelector(playTogether, { timeout: 0 });
        await plexPage.evaluate(v => document.querySelector(v).click(), playTogether);

        // join discord channel
        await discordPage.waitForSelector(voiceChannelSelector, { timeout: 0 });
        await discordPage.evaluate(v => document.querySelector(v).click(), voiceChannelSelector);

        // Press the share screen button.
        await discordPage.waitForSelector(enableVideoButton, { timeout: 0 });
        await discordPage.evaluate(v => document.querySelector(v).click(), enableVideoButton);

    }

    var addFriends = async function() {

        //new friends tab
        const friendsPage = await browser.newPage();

        //go to plex friends
        await friendsPage.goto(`https://app.plex.tv/desktop/#!/friends`, { waitUntil: 'networkidle0' });

        //Click requests
        await plexPage.waitForSelector(friendRequests, { timeout: 0 });
        await plexPage.evaluate(v => document.querySelector(v).click(), friendRequests);

        //Click navbar
        // await plexPage.waitForSelector(accountSettings, { timeout: 0 });
        // await plexPage.select(v => document.querySelector(v).click(), accountSettings);
    }
};

start();
