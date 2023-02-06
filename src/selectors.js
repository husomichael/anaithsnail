//Plex Selectors
import { getConfig } from './anaithsnail';

const config = getConfig();
export const
    menu = 'span[class="_11ni0ce12 _11ni0ce9 _11ni0ce4e' +
        ' _11ni0ce1m _11ni0ce2a _11ni0ce2e' +
        ' _11ni0ce2u"]',
    plexAccountSettings = 'a[class="pksp574 _11ni0ce1e _11ni0cea _11ni0cend"]',
    movies = 'a[title="Movies"]',
    accountSettings = 'a[id="accountSettingsNavBarBtn"]',
    playTogether = 'button[class="WatchTogetherHubItemPosterCard-link-L73ErH' +
        ' PosterCardLink-link-LozvMm' +
        ' Link-link-vSsQW1' +
        ' Link-default-bdWb1S"]',
    friendRequests = 'button[aria-controls="radix-26"]',
    acceptFriend = 'button[class="ihlo9k2 _11ni0ce1a _11ni0cem' +
        ' _11ni0ceea _1kzuok60 ihlo9kd _11ni0cedq' +
        ' ihlo9k7"]',
    // Discord Selectors
    voiceChannelSelector = `a[data-list-item-id="channels___${config.voiceChannelID}"]`,
    enableVideoButton = 'button[aria-label="Share Your Screen"]',
    continueInBrowserButton = 'div[class="contents-3ca1mk"]',
    logInButton = `button[class="button-f2h6uQ lookFilled-yCfaCM colorPrimary-2AuQVo sizeMedium-2bFIHr grow-2sR_-F"]`,
    discordInputEmail = `input[class="inputDefault-Ciwd-S input-3O04eu inputField-2RZxdl"]`,
    discordInputPassword = `input[class="inputDefault-Ciwd-S input-3O04eu"]`,
    discordEmail = `${config.discordEmail}`,
    discordPassword = `${config.discordPassword}`;
