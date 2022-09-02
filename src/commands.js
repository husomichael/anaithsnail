import {browser, discordPage, plexPage} from "./anaithsnail.js";
import {
    enableVideoButton,
    friendRequests,
    playTogether,
    voiceChannelSelector
} from "./selectors.js";

export async function playPlex() {
    // Play shared video on plex.
    await plexPage.waitForSelector(playTogether, {
        timeout: 0,
    });
    await plexPage.evaluate(
        v => document.querySelector(v).click(),
        playTogether,
    );

    // join discord channel
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
    //new friends tab
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
