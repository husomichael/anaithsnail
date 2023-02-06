import { getDiscordPage, getPlexPage } from "./anaithsnail.js";
import {
    enableVideoButton,
    friendRequests,
    playTogether,
    voiceChannelSelector,
    continueInBrowserButton,
    logInButton,
    discordInputEmail,
    discordInputPassword,
    discordEmail,
    discordPassword,
} from "./selectors.js";

export async function loginToDiscord(discordEmail, discordPassword) {
    const discordPage = await getDiscordPage();
    await discordPage.evaluate(
        v => document.querySelector(v).click(),
        logInButton,
    );
    // await discordPage.$eval(discordInputEmail, el => el.value = discordEmail);
    // await discordPage.$eval(discordPassword, el => el.value = process.env.DISCORD_PASSWORD);
}

export async function playPlex() {
    const discordPage = await getDiscordPage();
    const plexPage = await getPlexPage();
    // Join shared video on plex.
    await plexPage.waitForSelector(playTogether, {
        timeout: 0,
    });
    await plexPage.evaluate(
        v => document.querySelector(v).click(),
        playTogether,
    );

    // Join discord channel
    await discordPage.waitForSelector(voiceChannelSelector, {
        timeout: 0,
    });
    await discordPage.evaluate(
        v => document.querySelector(v).click(),
        voiceChannelSelector,
    );

    // Press the share screen button.
    await discordPage.waitForSelector(enableVideoButton, {
        timeout: 0,
    });
    await discordPage.evaluate(
        v => document.querySelector(v).click(),
        enableVideoButton,
    );
}

export async function addFriends() {
    const plexPage = await getPlexPage();
    //new tab for plex friends
    const friendsPage = await browser.newPage();

    //go to plex friends
    await friendsPage.goto(`https://app.plex.tv/desktop/#!/friends`, {
        waitUntil: 'networkidle0',
    });

    //Click requests
    await plexPage.waitForSelector(friendRequests, { timeout: 0 });
    await plexPage.evaluate(
        v => document.querySelector(v).click(),
        friendRequests,
    );

    //Click navbar
    // await plexPage.waitForSelector(accountSettings, { timeout: 0 });
    // await plexPage.select(v => document.querySelector(v).click(), accountSettings);
}
