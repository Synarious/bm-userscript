## About This Repository
Userscript that takes advantage of custom triggers you may have created in BM, as well as parse important text. I made this help color code important details like Squad Leaders, among other things for Squad community. 

## Requirements & Install
- Requirements: A chrome based browser with **DEV MODE** enable and the Tampermonkey web extension. Firefox is supported as well.
- Install Guide: https://docs.google.com/document/d/1swXqOl2guYp3PNhqA1h07U7KVQkDoYjBgVHVtCZkjgI/edit?usp=sharing
- Backup: There is a PDF file, if the above URL becomes broken.
  
## Features Of bm-desktop-auto.min.js
---- All customizable! ----
* Highlights ban, warns and kicks in red.
* Highlights terms involving admin with bright green.
* Highlights those listed as "Admins" on BM.
* Highlights the name of admins using an admin word bank. Displays both in activity and player list.
* Auto updating (see important note on this below). 
* Quick link buttons - access admin resources in one click.
* [optional] [CommunityBanList](https://communitybanlist.com/) steamID auto lookup.(/GmG\ Eddie)
* One Click Player Copy - Link, steamID and URL to your clipboard.
* Grays out unimportant events like joins/leaves.
* Color codes server actions, to prevent accidental map changes etc..
* Adds time in seconds to timestamp (tooltip hover) (LiQ Avengerian)
* Color coded groups, such as for player teams/factions in a game. US vs. RUS etc..

## What Is TamperMonkey
It’s a browser add-on that loads “userscripts” that can modify how a website displays itself to you. User scripts are powerful tools that can totally modify websites. Remember, tampermonkey can pose significant security issues for your device if you install scripts from unknown sources. Only use scripts if you know what they are doing!
- In latest versions of chrome everyone needs to enable "DEV" made in Chrome Extensions for Tampermonkey to work. Then chrome needs to be force closed & restarted.

# Using This Script For Your Organization
- Fork this project, modify lines in bm-toolkit-desktop.min.js (@updateURL, @downloadURL, @author) to match yourself and your github location. 
- This repo includes a GitHub Action that automatically minifies code.js to code.min.js, then replaces line 17 in bm-toolkit-desktop.min.js with the minified code. It also extracts the CONST version = "value" from code.js and updates the version header in bm-toolkit-desktop.min.js to trigger script updates. 
- .... As such you should only need to modify code.js and it should just do everything. If you change bm-toolkit-desktop.min.js by itself you may need to tick the version up in code.js for github action to activate. 
- Important: Never instruct users to "edit" their scripts in Tampermonkey, as this breaks auto-updating and leads to outdated versions. Edited scripts must be deleted and re-created for auto-updating to work again.
- Warning: If you fork this for your ORG, be wary of who you give github access to. Tampermonkey scripts can become js malware in wrong hands. 

## Documentation
- This project works off grabbing content based on their class, then applying colors based on conditions of what is contained in the piece of code selected. There is strong potential for code to change and classes to become renamed and this will break the code's ability to run. Using inspect elements you can track down and update classes so they're selected. 
- The code.js is broken down into parts, top part of things you can change and bottom area where code itself is. It's designed to be customizable, changing code below the warning line may break things.
- A small number of elements, like tags, are unique to the user and can't be captured with classes alone and thus not included.
- All processing is done locally by the browser and Javascript selectors/styling, besides for https://communitybanlist.com/ API player lookup.
- The code was completely rewritten to fix a long-standing Cloudflare reload loop issue. The problem was caused by missing elements at runtime, and the solution involved using Async/Await and MutationObservers. For the MutationObservers to trigger the code, the page must fully load. However, this fix caused the code to run too often. To improve stability and limit execution by the "updateRate," Async/Await was implemented. Due to the functionality of GM_AddStyles, a portion of the code only runs once. Multiple executions create extra div elements, which cause significant performance issues when the browser remains open for extended periods.
- Do not use @ symbol anywhere in the code, it is deserved for the github action. 

## Known Issues
- Occasionally, BM may omit new log entries while scrolling or during spam events. This issue occurs even without the script, so if you're missing logs, simply reload the page to resync with the server.
- Userscripts are not perfect, but reloading the page typically resolves most issues. The script works correctly in 98% of cases.
- Text may crowd itself in some elements when resizing the window, this seems to be a BM issue sometimes and refreshing redraws the elements and fixes it. 

## Contributions
LiQ Gaming (https://liqgaming.com/#/) - Avengerian (time seconds), Got2bHockey (Github Actions)
/GmG\ - Eddie (button fixes and CBL bits)
- The project largely works by using Inspect Element to find the names of classes, and then using selectors to capture them and apply effects to them. This project is limited to applying CSS class coloring and QoL updates by reading/modifying the locally delivered web document. Code that automates or performs API request like bans, kicks and queries will not be merged into this project. 
- Modifying mod/admin name changes, new factions or wording changes is as simple as updating the word list.