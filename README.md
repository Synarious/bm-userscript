## About This Repository
Userscript that takes advantage of custom triggers you may have created in BM, as well as parse important text. I made this help color code important details like Squad Leaders, among other things for Squad community. 

## Requirements & Install
- Chrome based browser (v130+ Tested) with **DEV MODE** enable (required).  Firefox is supported as well (dev mode not needed).
- Tampermonkey Browser Extension: [Chrome](https://chromewebstore.google.com/detail/tampermonkey/dhdgffkkebhmkfjojejmpbldmpobfkfo?hl=en&pli=1) v120+ OR [Firefox](https://addons.mozilla.org/en-US/firefox/addon/tampermonkey/) 78+ (Tested on stable). 

## Features Of bm-desktop-auto.min.js
---- All customizable! ----
* Log highlighting for ban, warns and kicks and more.
* Highlights terms involving admin with bright green.
* Highlights those listed as "Admins" on BM.
* Highlights the staff names. Displays both in activity and player list.
* Auto updating (see important note on this below). 
* Quick link buttons - access admin resources in one click.
* [optional] [CommunityBanList](https://communitybanlist.com/) CBL auto lookup. (/GmG\ Eddie)
* One Click Player Copy - Link, steamID and URL to your clipboard.
* Grays out unimportant events like joins/leaves.
* Color codes server actions, to prevent accidental map changes etc..
* Adds time in seconds to timestamp (when hovering over the tooltip) (LiQ Avengerian)
* Color coded groups, such as for player teams/factions in a game. US vs. RUS etc..
* Fixes "RCON disabled warning" so it doesn't overflow over other servers when many servers are collapsed.

## What Is TamperMonkey
It’s a browser add-on that loads “userscripts” that can modify how a website displays itself to you. User scripts are powerful tools that can totally modify websites. Remember, tampermonkey can pose significant security issues for your device if you install scripts from unknown sources. Only use scripts if you know what they are doing!
- In latest versions of chrome everyone needs to enable "DEV" made in Chrome Extensions for Tampermonkey to work. Then chrome needs to be force closed & restarted.
- See getting started for step-by-step guide on how install and use this script for your own community.

## Getting Started 
### See [Getting Started Wiki](https://github.com/Synarious/bm-userscript/wiki ) on how to install & more.

## Contributions
- LiQ Gaming (https://liqgaming.com/#/) - Avengerian (time seconds), Got2bHockey (Github Actions)
- /GmG\ - Eddie (button fixes and CBL bits)
- This project's scope is limited to reading/modifying the **locally** delivered web content and locally injecting CSS and web improvements without touching the BM API (as such this code could run offline). Code suggestions that automates or performs API request like bans, kicks and queries using your Battlemetrics tokens will not be merged into this project as that approches selfbot which could result in your BM account being suspended.
