const version = "10.24";
const loadDelay = "2500" // ms | Overall delay for everything. Gives some time for classes and content to load in.
const updateRate = "75" //  ms | Overall rate to run the code at. 
const forceUpdateRate = "500" //  ms | Edge case to force update code (if) it already has run, but detected no change recently by the MutationObserver. Workaround for scrolling too fast and failing to color text sometimes (hacky workaround)
const colors = {
    cTeamBluefor: "#e7a600",
    cTeamOpfor: "rgb(217,86,39)",
    cAdminName: "#00fff7",
    cbmAdmin: "#58ff47",
    cModAction: "#ff3333",
    cAdminAction: "#37ff00",
    cTeamKilled: "#ffcc00",
    cLeftServer: "#ff33cc",
    cJoined: "#919191",
    cGrayed: "#919191",
    cTracked: "#FF931A",
    cNoteColorIcon: "#f5ccff"
};

const styles = {
    zShift: ".css-ym7lu8 {z-index: 2;}",
    zShiftTime: ".css-z1s6qn {z-index: 3;}",
    zShiftTimeDate: ".css-1jtoyp {z-index: 3;}",
    teamkillBar: ".css-1tuqie1 {background-color: #5600ff1a;width: 1920px}",
    moderationBar: ".css-1rwnm41 {background-color: #ff000008;width: 1920px;}",
    adminCam: ".css-1fy5con {background-color: #31e3ff21;width: 1920px}",
    nobranding: "#poweredbyovh {background-color: #31e3ff21;width: 1920px}"
};

const sets = {
    teamKilled: new Set(["team killed"]),
    grayedOut: new Set([
        "AFK - Thanks for playing!",
        "Please get a Squad Leader kit within 8 mins",
        "Final warning: Get Squad Leader kit within 5m",
        "SEEDING WHITELIST ACTIVE! Thanks for helping seed the server!",
        "You will be kicked in 2 minutes if you are still not in a squad",
        "To switch teams, please run the",
        "Check your seeding reward status via",
        "Trigger added flag LiQ Seeder",
    ]),
    trackedTriggers: new Set(["[SL Kit]"]),
    leftServer: new Set(["left the server"]),
    joinedServer: new Set(["joined the server"]),
    actionList: new Set([
        "was warned",
        "was kicked",
        "was banned",
        "edited BattleMetrics Ban",
        "added BattleMetrics Ban",
        "deleted BattleMetrics Ban",
        "Trigger added flag Previously banned",
    ]),
    adminList: new Set([
        "Aomm2025",
        "Archangel",
        "Basa_Doc",
        "Blackout",
        "Brennan",
        "budge",
        "Chaot3ch",
        "Cossack_440",
        "Digikind",
        "DontFaket",
        "E10",
        "El 24 throttle4u",
        "Exploits",
        "Gilly",
        "got2bhockey",
        "Hellsaber",
        "iCampHard",
        "JAMESTERRARIA",
        "Jonboy",
        "Kibz",
        "Kyle",
        "Mike.H",
        "Nightshade",
        "Outlast",
        "QTheEngineer",
        "Redneck",
        "Shaka",
        "sleepyguy1",
        "Skipper",
        "TempusOwl",
        "Too Many Cooks",
        "Valkyrie",
        "WatdaHek",
        "Wobblebob29",
        "Wolf Fang",
        "Θscar Mike",
        "xplay0321",
        "Chillz",
        "HellHound6396",
        "omgitsjesse",
        "MODERNMEGA",
        "Whip me more, Grandma",
        "Wjli13125",
        "Temper",
        "MadDawgMorales",
        "The ROMAN99",
        "jordonrtelles",
        "ETXBONES",
        "Moses",
        "white knife",
    ]),

    teamBluefor: new Set([
        "Australian Defence Force",
        "British Armed Forces",
        "Canadian Armed Forces",
        "United States Army",
        "United States Marine Corps",
        "Turkish Land Forces",
    ]),

    teamOpfor: new Set([
        "Russian Ground Forces",
        "Middle Eastern Alliance",
        "Insurgent Forces",
        "Irregular Militia Forces",
        "People's Liberation Army",
        "Russian Airborne Forces",
        "PLA Navy Marine Corps",
        "PLA Amphibious Ground Forces",
        "Western Private Military Contractors"
    ]),

    adminTerms: new Set([
        "admin",
        "Admin",
        "ADMIN",
        "aDMIN",
        "to the other team.",
        ") was disbanded b",
        "requested a list of squads.",
        "requested a list of squads.",
        "set the next map to",
        "changed the map to",
        "requested the next map.",
        ") forced",
        "AdminRenameSquad",
        "(Global)",
        "executed Player Action Action",
        "requested the current map.",
        "restarted the match.",
        "Squad disband - SL",
        "was removed from their squad by Trigger.",
        "requested layer list.",
        "was removed from their squad by",
    ]),
};

function cornerButtons() {
    const buttons = [
        { id: "NPFbutton", label: "N", url: "https://www.battlemetrics.com/rcon/servers/7871746", backgroundColor: "#187E00" },
        { id: "TRbutton", label: "T", url: "https://www.battlemetrics.com/rcon/servers/7894269", backgroundColor: "orange" },
        { id: "ban", label: "B", url: "https://www.battlemetrics.com/rcon/bans?filter%5Borganization%5D=17085&filter%5Bexpired%5D=true", backgroundColor: "red" },
        { id: "lanes", label: "M", url: "https://squadmaps.com/", backgroundColor: "#7E6900" },
        { id: "version", label: version, url: "https://raw.githubusercontent.com/TempusOwl/bm-userscript/main/bm-toolkit-desktop.min.js", backgroundColor: "black", fontSize: "6pt" }
    ];

    const buttonContainer = Object.assign(document.createElement("div"), {
        style: "position: absolute; top: 10px; right: 5%; z-index: 99999;"
    });
    document.body.appendChild(buttonContainer);

    buttons.forEach(({ id, label, url, backgroundColor }) => {
        const button = Object.assign(document.createElement("input"), {
            type: "button", id, value: label,
            style: `width: 35px; margin-right: 5px; padding: 2px; font-size: 8pt; background: ${backgroundColor};`,
            onclick: () => window.open(url, '_blank')
        });
        buttonContainer.appendChild(button);
    });
}


function logColoring() {
    let namePlayers = document.querySelectorAll(".css-1ewh5td");
    let nameActivity = document.querySelectorAll(".css-fj458c");
    let messageLog = document.querySelectorAll(".css-ym7lu8");
    let bmAdmin = document.querySelectorAll(".css-18s4qom");
    let bmNoteFlag = document.querySelectorAll(".css-he5ni6");

    function applyColor(elements, set, color) {
        elements.forEach((element) => {
            for (let phrase of set) {
                if (element.textContent.includes(phrase)) {
                    element.style.color = color;
                    break;
                }
            }
        });
    }

    function adminApplyColor(elements, phrases, color) {
        elements.forEach(function (el) {
            phrases.forEach(function (phrase) {
                const regex = new RegExp(
                    "(\\b" + phrase + "\\b)|(\\b『LiQ』 ?" + phrase + "\\b)",
                    "i"
                );
                if (regex.test(el.textContent)) {
                    el.style.color = color;
                }
            });
        });
    }

    // Apply colors based on phrases
    applyColor(messageLog, sets.adminTerms, colors.cAdminAction);
    applyColor(messageLog, sets.grayedOut, colors.cGrayed);
    applyColor(messageLog, sets.joinedServer, colors.cJoined);
    applyColor(messageLog, sets.leftServer, colors.cLeftServer);
    applyColor(messageLog, sets.actionList, colors.cModAction);
    applyColor(messageLog, sets.teamBluefor, colors.cTeamBluefor);
    applyColor(messageLog, sets.teamOpfor, colors.cTeamOpfor);
    applyColor(messageLog, sets.teamKilled, colors.cTeamKilled);
    applyColor(messageLog, sets.trackedTriggers, colors.cTracked);

    // Apply colors to player names
    adminApplyColor(nameActivity, sets.adminList, colors.cAdminName);
    adminApplyColor(namePlayers, sets.adminList, colors.cAdminName);

    // Highlights the Player Is Admin to neon in the players bar.
    bmAdmin.forEach((element) => {
        if (element.textContent.includes("Admin")) {
            element.style.color = colors.cbmAdmin;
        }
    });

    // Changes Flag Color For Note On Player List
    bmNoteFlag.forEach((element) => {
        element.style.color = colors.cNoteColorIcon;
    });
}

function copyButtoANDSteamIDs() {
    function createCopyButton() {
        const button = document.createElement("button");
        button.id = "copy-button";
        button.textContent = "Copy Player Info";
        button.classList.add("copy-button-style");

        document.body.appendChild(button);

        button.addEventListener("click", () => {
            const pSteamID = getInnerTextByTitle("765", "SteamID MISSING?");
            const pEOSID = getInnerTextByTitle("0002", "");
            const pName = document.querySelector("#RCONPlayerPage > h1")?.innerText || 'NAME MISSING?';

            const textToCopy = `**User**: ${pName} <${window.location.href}>\n**IDs**: ${pSteamID} // ${pEOSID}\n**Server**:\n**Infraction**:\n**Evidence Linked Below**:`;
            copyToClipboard(textToCopy);

        });
        buttonStyles();
    }

    function buttonStyles() {
        const style = document.createElement("style");
        style.innerHTML =
            ".copy-button-style {" +
            "width: 125px;" +
            "height: 35px;" +
            "background: #4c82ffab;" +
            "color: white;" +
            "border: none;" +
            "border-radius: 3px;" +
            "box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);" +
            "font-size: 14px;" +
            "font-weight: bold;" +
            "cursor: pointer;" +
            "padding: 2px;" +
            "position: absolute;" +
            "top: 90px;" +
            "left: 0;" +
            "z-index: 99999;" +
            "transition: background 0.3s, box-shadow 0.3s;" +
            "}" +
            ".copy-button-style:hover {" +
            "background: #4c8aff;" +
            "box-shadow: 0 6px 8px rgba(0, 0, 0, 0.15);" +
            "}";
        document.head.appendChild(style);
    }


    function getInnerTextByTitle(titlePart, defaultValue) {
        return document.querySelector(`[title*="${titlePart}"]`)?.innerText || defaultValue;
    }

    function copyToClipboard(text) {
        const textarea = document.createElement("textarea");
        textarea.style.position = 'fixed'; // Avoids scrolling to the bottom
        textarea.style.opacity = '0'; // Hides the element
        textarea.value = text;
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand("copy");
        document.body.removeChild(textarea);
    }

    function replaceSteamIDSpans() {
        const spans = document.querySelectorAll(".css-q39y9k");

        spans.forEach(span => {
            const steamID = span.title;
            const anchor = document.createElement("a");

            // Clone span's attributes to the new anchor element
            Array.from(span.attributes).forEach(attr => anchor.setAttribute(attr.name, attr.value));

            anchor.href = "https://communitybanlist.com/search/" + steamID;
            anchor.innerHTML = steamID;
            anchor.target = "_blank";

            span.replaceWith(anchor);
        });
    }

    const playerPageExists = document.querySelector("#RCONPlayerPage");

    if (playerPageExists) {
        ensureElementExists("copy-button", createCopyButton);
    } else {
        removeElementById("copy-button");
    }
    replaceSteamIDSpans();

    function ensureElementExists(elementId, creationFunction) {
        if (!document.getElementById(elementId)) {
            creationFunction();
        }
    }

    function removeElementById(elementId) {
        const element = document.getElementById(elementId);
        if (element) {
            element.remove();
        }
    }
}

function navButtons() {
    const navTools = {
        changeMapWarning: [
            {
                phrase: "Change Layer",
                styles: {
                    color: "red",
                    fontStyle: "bold",
                    textAlign: "center",
                    fontSize: "200pt",
                },
            },
            {
                phrase: "Set Next Layer",
                styles: {
                    color: "lime",
                    fontStyle: "bold",
                    textAlign: "center",
                    fontSize: "24pt",
                },
            },
            {
                phrase: "Kick",
                styles: {
                    color: "orange",
                    fontStyle: "bold",
                    textAlign: "center",
                    fontSize: "48pt",
                },
            },
            {
                phrase: "Warn",
                styles: {
                    color: "lime",
                    fontStyle: "bold",
                    textAlign: "center",
                    fontSize: "24pt",
                },
            },
        ],
        orgGroup: [
            { phrase: "Arma", styles: { background: "#333300" } },
            { phrase: "Squad Mod", styles: { background: "#2b9937" } },
            { phrase: "Comp", styles: { background: "lime" } },
            { phrase: "Squad Admin", styles: { background: "#119ab7" } },
            { phrase: "Rust Admin", styles: { background: "#672c00" } },
            { phrase: "Org", styles: { background: "black" } },
            { phrase: "Recruiter", styles: { background: "#cc6600" } },
            { phrase: "Minecraft Admin", styles: { background: "#8d0cff" } },
            { phrase: "Squad Event", styles: { background: "#660033" } },
        ],
        playerMenuDialog: [
            { phrase: "Warn", styles: { color: "lime" } },
            { phrase: "Squad List", styles: { color: "gold" } },
            { phrase: "Kick", styles: { color: "orange" } },
            { phrase: "Ban", styles: { color: "red" } },
            { phrase: "Force Team Change", styles: { color: "#db4dff" } },
            { phrase: "Remove Player from Squad", styles: { color: "#804d00" } },
            { phrase: "Action - Reset Squad Name", styles: { color: "gold" } },
        ],
        serverCommands: [
            { phrase: "Warn", styles: { color: "lime" } },
            { phrase: "Kick", styles: { color: "orange" } },
            { phrase: "Ban", styles: { color: "red" } },
            { phrase: "Force Team Change", styles: { color: "#db4dff" } },
            { phrase: "Remove Player from Squad", styles: { color: "#804d00" } },
            { phrase: "Action - Reset Squad Name", styles: { color: "gold" } },
            { phrase: "Next Layer", styles: { color: "lime", fontSize: "16pt" } },
            { phrase: "Change Layer", styles: { color: "red", fontStyle: "bold", fontSize: "8pt" } },
            { phrase: "Squad List", styles: { color: "gold", fontSize: "16pt" } },
        ]
    };
    applyStyles(
        document.querySelectorAll(".modal-title"),
        navTools.changeMapWarning
    );
    applyStyles(document.querySelectorAll(".css-4ey69y"), navTools.orgGroup);
    applyStyles(
        document.querySelectorAll(".css-f5o5h6 a, .css-f5o5h6 button"),
        navTools.playerMenuDialog
    );
    applyStyles(
        document.querySelectorAll(".css-1ixz43s a, .css-1ixz43s button"),
        navTools.playerMenuDialog
    );
    applyStyles(
        document.querySelectorAll(".css-yun63y a, .css-yun63y button"),
        navTools.serverCommands
    );

    function applyStyles(elements, styles) {
        elements.forEach((el) => {
            styles.forEach(({ phrase, styles }) => {
                if (el.textContent.includes(phrase)) {
                    Object.assign(el.style, styles);
                }
            });
        });
    }

    Object.values(styles).forEach((style) => GM_addStyle(style));

}

function otherFeatures() {
    // Adds seconds when hovering over timestamps.
    let timeStampElements = document.querySelectorAll(".css-z1s6qn");
    timeStampElements.forEach((element) => {
        let utcTime = element.getAttribute("datetime");
        let date = new Date(utcTime);
        let titleDate = new Date(element.getAttribute("title"));
        titleDate.setHours(date.getHours(), date.getMinutes(), date.getSeconds());
        element.setAttribute("title", titleDate.toLocaleString());
    });
}

// Select the document body or specific element to observe changes
const targetNode = document.body;
// Options for the observer (which mutations to observe)
const config = { childList: true, subtree: true, attributes: true };

// Throttle function to limit how often a function can be called
function throttle(func, limit) {
    let inThrottle;
    return function () {
        const args = arguments;
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => (inThrottle = false), limit);
        }
    };
}

const callback = throttle(function (mutationsList, observer) {
    let significantChanges = false;

    for (let mutation of mutationsList) {
        // Only check for mutations involving the ReactVirtualized__Grid__innerScrollContainer class
        if (mutation.target.classList && mutation.target.classList.contains('ReactVirtualized__Grid__innerScrollContainer')) {
            significantChanges = true;
            break; // Stop looping once a significant change is found
        }
    }

    if (significantChanges) {
        console.log('BM Tampermonkey Userscript: Detected ReactVirtualized, applying styles.');
        cornerButtons();
        logColoring();
        copyButtoANDSteamIDs();
        navButtons();
        otherFeatures();
    }

}, 75); // 75ms interval

// Create a new observer instance linked to the callback function
const observer = new MutationObserver(callback);
observer.observe(targetNode, config);
