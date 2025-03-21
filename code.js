const version = "1" // Changing this version is what causes updates. A higher number = update.
const updateRate = "65" // ms Overall rate to run the code at.
const bmORG_ID = "<REPLACE>" // Used for ban shortcut, use the # ID in URL of your org's main ban filter on BM..
const versionSource = "https://raw.githubusercontent.com/<REPLACE>/bm-userscript/main/bm-toolkit-desktop.min.js" // link to raw github article.
const admistlistSource = "https://raw.githubusercontent.com/<REPLACE>/bm-userscript/refs/heads/unstable/adminList.json" // file is found in your repo by default.
const serverName1 = "[EU]" // 1 and 2 Used for coloring of server names in banlist.
const serverName2 = "[NA]"

// Quick Button Settings
const cornerBT1 = "1"
const cornerBTname1 = "2"
const cornerBTserverID1 = "123456789" // shortcut to single BM server ID.
const cornerBT2 = "#" //dropdown
const cornerBTname2 = "R"
const cornerBT3 = "B" //bans
const cornerBTname3 = "B"
const cornerBT4 = "M"
const cornerBTname4 = "M"
const cornerBTurl4 = "https://squadmaps.com/"; // shortcut to simple resource.
const dropdownOptions = [
    { label: "Server 1", url: "https://www.battlemetrics.com/rcon/servers/12345678" },
    { label: "Server 2", url: "https://www.battlemetrics.com/rcon/servers/12345678" },
    { label: "Server 3", url: "https://www.battlemetrics.com/rcon/servers/12345678" },
    { label: "Server 4", url: "https://www.battlemetrics.com/rcon/servers/12345678" },
    { label: "Server 5", url: "https://www.battlemetrics.com/rcon/servers/12345678" },
    { label: "Server 6", url: "https://www.battlemetrics.com/rcon/servers/12345678" },
    { label: "Server 7", url: "https://www.battlemetrics.com/rcon/servers/12345678" },
    { label: "Server 8", url: "https://www.battlemetrics.com/rcon/servers/12345678" },
    { label: "Server 9", url: "https://www.battlemetrics.com/rcon/servers/12345678" },
];

const sets = {
    teamKilled: new Set(["team killed"]),
    grayedOut: new Set([
        "You were teamkilled!",
        "Please revive the player if you can.) by Trigger.",
        "You MUST apologize for your teamkills in all chat!",
    ]), // this grays out unimportant messages.
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
    ]),

    factionGroup1: new Set([
        "Australian Defence Force",
        "British Armed Forces",
        "Canadian Armed Forces",
        "United States Army",
        "United States Marine Corps",
        "Turkish Land Forces",
    ]),

    factionGroup2: new Set([
        "Russian Ground Forces",
        "Middle Eastern Alliance",
        "Middle Eastern Insurgents",
        "Insurgent Forces",
        "Irregular Militia Forces",
        "People's Liberation Army",
        "Russian Airborne Forces",
        "PLA Navy Marine Corps",
        "PLA Amphibious Ground Forces",
    ]),

    factionGroup3: new Set([
        "Western Private Military Contractors"
    ]),

    adminTerms: new Set([
        "admin",
        "Admin",
        "ADMIN",
        "aDMIN",
        "AdMIN",
        "to the other team.",
        ") was disbanded b",
        "requested a list of squads.",
        "set the next map to",
        "changed the map to",
        "requested the next map.",
    ]),
};

const colors = {
    cStaffGroup1: "#00fdff",
    cStaffGroup2: "#00ff5c",
    cStaffGroup3: "#00ffbb",
    cFactionGroup1: "#4eacff",
    cFactionGroup2: "#d0b1ff",
    cFactionGroup3: "#fd6aff",
    cbmAdmin: "#b3ffac",
    cModAction: "#ff3333",
    cAdminAction: "#37ff00",
    cTeamKilled: "#ffcc00",
    cLeftServer: "#d9a6a6",
    cJoined: "#919191",
    cGrayed: "#919191",
    cTracked: "#FF931A",
    cNoteColorIcon: "#f5ccff"
}; // This is the color scheme for the script, change to your liking.

// Bar Coloring Settings
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
        { phrase: "Admin", styles: { background: "#537eff" } },
        { phrase: "Reforger Admin", styles: { background: "#0ccb00" } },
        { phrase: "Moderator", styles: { background: "#00acd0" } },
        { phrase: "Squad", styles: { background: "#ffc900" } },
        { phrase: "Appeal Team", styles: { background: "#c5081d" } },
        { phrase: "Director", styles: { background: "black" } },
        { phrase: "Recruiter", styles: { background: "#674ea7" } },
    ], // put least the specific e.g "admin" at top, then "super admin" at bottom.
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

/*
!
! Start of the code that runs the logic, do not change below unless you know what you're doing!
!
*/
// Function to get color from the mapping

async function fetchAdminList() {
    try {
        const response = await fetch(admistlistSource);
        if (!response.ok) throw new Error("Failed to fetch CONST admistlistSource");
        const data = await response.json();
        sets.adminList1 = new Set(data.group1);
        sets.adminList2 = new Set(data.group2);
        sets.adminList3 = new Set(data.group3);
        console.log("adminList1 updated:", sets.adminList1);
        console.log("adminList2 updated:", sets.adminList2);
        console.log("adminList3 updated:", sets.adminList3);
    } catch (error) {
        console.error("Error fetching admin list:", error);
    }
}

async function runCode() {
    console.log("Running initial one-time code...");
    // One-time logic here that runs only once after element detection, prevents spam creation of div elements due to how GM_addStyles interacts.

    console.log("Fetching admin list");
    await fetchAdminList();

    function GM_addStyleElements() {
        const styles = {
            blockMenu: ".navbar-toggle { display: block !important; visibility: visible !important; padding-left: 15%; background: rgb(34, 34, 34);}",
            buttonitself: ".navbar-toggle { display: block !important; visibility: visible !important; padding-left: 15%; background: rgb(34, 34, 34);}",
            removeLogo: ".css-1nxi32t { width: 1px;}",
            disableRCON: ".css-1xkypod { position: unset !important; }",
            banMenuWidthSmall: "@media (max-width: 1099px) and (min-width: 950px) { .css-mxzvlz { width:100% !important } }",
            banMenuWidth: "@media (max-width: 949px) { .css-mxzvlz { width:70% !important } }",
            banInnerMenuWidth: ".css-e70h1 { max-width: 1000px !important;}",
            banMenuReason: "{.css-e70h1 {width: 50em;}",
            mainWidth: ".main { width: 90% !important; margin-left: 4em; margin-right: 4em; } @media (max-width: 768px) { .main { width: inherit !important; }}",
            flagList: ".css-mxzvlz { padding-left: .5em; width: 20%; display: inline-block;}",
            flagHideDetails: ".css-110bni0 {font-size: 0px;}",
            flagListMedium: "@media (max-width: 1099px) and (min-width: 950px) { .css-mxzvlz { width: 33% !important; } }",
            flagListSmall: "@media (max-width: 949px) { .css-mxzvlz { width: 50% !important; } }",
            cblButtonStyle: "@media (max-width: 768px) { .CBL-Button {left: 16em !important; } }"

        };

        Object.values(styles).forEach((style) => GM_addStyle(style));

    } GM_addStyleElements()

    if (/Mobi|Android|iPhone|iPad|iPod/i.test(navigator.userAgent)) {
        // console.log("User is on a mobile device. quick buttons disabled");
    } else {

        function cornerButtons() {
            const buttons = [
                { id: "cornerBT1", label: cornerBTname1, url: "https://www.battlemetrics.com/rcon/servers/" + cornerBTserverID1, backgroundColor: "#187E00", textColor: "white" },
                { id: "cornerBT2", label: cornerBTname2, url: "#", backgroundColor: "orange", textColor: "black", isDropdown: true },
                { id: "cornerBT3", label: cornerBTname3, url: "https://www.battlemetrics.com/rcon/bans?filter%5Borganization%5D=" + bmORG_ID + "&filter%5Bexpired%5D=true", backgroundColor: "red", textColor: "white" },
                { id: "cornerBT4", label: cornerBTname4, url: cornerBTurl4, backgroundColor: "#7E6900", textColor: "white" },
                { id: "version", label: version, url: versionSource, backgroundColor: "black", fontSize: "6pt", textColor: "white" }
            ];

            const buttonContainer = Object.assign(document.createElement("div"), {
                style: "position: absolute; top: 0px; right: 3em; z-index: 99999;background: #222222d1;margin: 1em .5em 1em 4em;"
            });
            document.body.appendChild(buttonContainer);

            buttons.forEach(({ id, label, url, backgroundColor, textColor, isDropdown }) => {
                const button = Object.assign(document.createElement("input"), {
                    type: "button", id, value: label,
                    style: `width: 35px; margin-right: 5px; padding: 2px; font-size: 8pt; background: ${backgroundColor}; color: ${textColor}; border: none; border-radius: 4px;`,
                    onclick: isDropdown ? toggleDropdown : () => window.open(url, '_blank')
                });
                buttonContainer.appendChild(button);

                // Create dropdown container for "R"
                if (isDropdown) {
                    const dropdownContainer = Object.assign(document.createElement("div"), {
                        id: id + "-dropdown",
                        style: "display: none; position: absolute; top: 35px; left: 0; z-index: 100000; background: white; border: 1px solid #ccc; box-shadow: 0 4px 8px rgba(0,0,0,0.2); border-radius: 4px;"
                    });
                    dropdownOptions.forEach(({ label, url }) => {
                        const option = document.createElement("div");
                        option.innerText = label;
                        option.style = "padding: 8px; cursor: pointer; background: #f1f1f1; color: black; border-bottom: 1px solid #ddd; border-radius: 4px;";
                        option.onmouseover = function () { this.style.backgroundColor = "#e2e2e2"; }; // Hover effect
                        option.onmouseout = function () { this.style.backgroundColor = "#f1f1f1"; };
                        option.onclick = () => window.open(url, '_blank');
                        dropdownContainer.appendChild(option);
                    });
                    buttonContainer.appendChild(dropdownContainer);
                }
            });

            // Toggle dropdown visibility
            function toggleDropdown() {
                const dropdown = document.getElementById("cornerBT2-dropdown");
                dropdown.style.display = (dropdown.style.display === "block") ? "none" : "block";
            }
        }

        cornerButtons();

    }
    let isFetching = false;

    async function updateLogic() {
        // Avoid overlapping by waiting for the previous execution to finish
        await new Promise(resolve => setTimeout(resolve, updateRate));

        // Ensure the element still exists before running
        if (document.querySelector('.ReactVirtualized__Grid__innerScrollContainerddd') || document.querySelector('.css-b7r34x')) {
            // console.log("Updating logic now..");
            // The codes main recurring logic below, handles coloring of text in player list and activity log and most of real-time events.

            function applyTimeStamps() {
                let timeStampElements = document.querySelectorAll(".css-z1s6qn");
                timeStampElements.forEach(element => {
                    let utcTime = element.getAttribute("datetime");
                    if (utcTime) {
                        let date = new Date(utcTime);
                        if (!isNaN(date.getTime())) {
                            element.setAttribute("title", date.toLocaleString(undefined, {
                                timeZoneName: 'short'
                            }));
                        }
                    }
                });
            } applyTimeStamps();

            function logColoring() {
                let namePlayers = document.querySelectorAll(".css-1ewh5td");
                let nameActivity = document.querySelectorAll(".css-fj458c");
                let messageLog = document.querySelectorAll(".css-ym7lu8");
                let bmAdmin = document.querySelectorAll(".css-18s4qom");
                let bmNoteFlag = document.querySelectorAll(".css-he5ni6");
                let conflictElements = document.querySelectorAll(".css-1ymmsk5");

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
                    elements.forEach(el => {
                        phrases.forEach(phrase => {
                            // Escape curly braces for literal match
                            const regex = new RegExp("(?<=^|[\\s\\p{P}])" + phrase.replace(/{/g, '\\{').replace(/}/g, '\\}') + "(?=$|[\\s\\p{P}])", "iu");
                            if (regex.test(el.textContent)) {
                                el.style.color = color;
                            }
                        });
                    });
                }
                

                // Apply colors based on phrases
                applyColor(messageLog, sets.joinedServer, colors.cJoined);
                applyColor(messageLog, sets.leftServer, colors.cLeftServer);
                applyColor(messageLog, sets.actionList, colors.cModAction);
                applyColor(messageLog, sets.adminTerms, colors.cAdminAction);
                applyColor(messageLog, sets.factionGroup1, colors.cFactionGroup1);
                applyColor(messageLog, sets.factionGroup2, colors.cFactionGroup2);
                applyColor(messageLog, sets.factionGroup3, colors.cFactionGroup3);
                applyColor(messageLog, sets.teamKilled, colors.cTeamKilled);
                applyColor(messageLog, sets.trackedTriggers, colors.cTracked);
                applyColor(messageLog, sets.grayedOut, colors.cGrayed);

                // Apply colors to player names
                adminApplyColor(nameActivity, sets.adminList1, colors.cStaffGroup1);
                adminApplyColor(namePlayers, sets.adminList1, colors.cStaffGroup1);
                adminApplyColor(nameActivity, sets.adminList2, colors.cStaffGroup2);
                adminApplyColor(namePlayers, sets.adminList2, colors.cStaffGroup2);
                adminApplyColor(nameActivity, sets.adminList3, colors.cStaffGroup3);
                adminApplyColor(namePlayers, sets.adminList3, colors.cStaffGroup3);

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

                // Changes server name colors in banlist.
                conflictElements.forEach((element) => {
                    if (element.textContent.includes(serverName1)) {
                        element.style.color = "green";
                    } else if (element.textContent.includes(serverName2)) {
                        element.style.color = "yellow";
                    }
                });
            }

            logColoring();


            if (/Mobi|Android|iPhone|iPad|iPod/i.test(navigator.userAgent)) {
                // console.log("User is on a mobile device. player buttons disabled");
            } else {

                // Handles both copy button on profiles and link generation to CBL.
                function copyButtoANDSteamIDs() {
                    function createCopyButton() {
                        const copyButton = document.createElement("button");
                        copyButton.id = "copy-button";
                        copyButton.textContent = "Copy Name";
                        copyButton.classList.add("copy-button-style");

                        const openURLButton = document.createElement("button");
                        openURLButton.id = "open-url-button";
                        openURLButton.textContent = "Open CBL";
                        openURLButton.classList.add("open-url-button-style");

                        document.body.appendChild(copyButton);
                        document.body.appendChild(openURLButton);

                        copyButton.addEventListener("click", () => {
                            const pSteamID = getInnerTextByTitle("765", "SteamID MISSING?");
                            const pEOSID = getInnerTextByTitle("0002", "");
                            const pName = document.querySelector("#RCONPlayerPage > h1")?.innerText || 'NAME MISSING?';

                            const textToCopy = `**User**: ${pName} <${window.location.href}>\n**IDs**: ${pSteamID} // ${pEOSID}\n`;
                            copyToClipboard(textToCopy);
                        });

                        openURLButton.addEventListener("click", () => {
                            const pSteamID = getInnerTextByTitle("765", "SteamID MISSING?");
                            if (pSteamID && pSteamID !== "SteamID MISSING?") {
                                const url = `https://communitybanlist.com/search/${pSteamID}`;
                                window.open(url, "_blank");
                            } else {
                                alert("SteamID is missing or invalid!");
                            }
                        });

                        buttonStyles();
                    }

                    function buttonStyles() {
                        const style = document.createElement("style");
                        style.innerHTML = `.copy-button-style,.open-url-button-style{width:100px;color:#fff;font-size:15px;font-weight:700;cursor:pointer;position:absolute;top:11.25em;z-index:99999}.copy-button-style{left:6em;border-radius:1em;background-color:#2d65a5;border:none}.copy-button-style:hover{background-color:#07f}.open-url-button-style{left:13em;border-radius:1em;background-color:#e5a411;border:none}.open-url-button-style:hover{background-color:#ffb500}@media (min-width:1200px){.copy-button-style{left:6em}.open-url-button-style{left:13em}}@media (max-width:768px){.copy-button-style{left:1em}.open-url-button-style{left:8em}}`;

                        document.head.appendChild(style);
                    }

                    function copyToClipboard(text) {
                        const textarea = document.createElement("textarea");
                        textarea.style.position = 'fixed'; // Avoids scrolling to the bottom.
                        textarea.style.opacity = '0'; // Hides the element.
                        textarea.value = text;
                        document.body.appendChild(textarea);
                        textarea.select();
                        document.execCommand("copy");
                        document.body.removeChild(textarea);
                    }


                    const playerPageExists = document.querySelector("#RCONPlayerPage");

                    if (playerPageExists) {
                        ensureElementExists("copy-button", createCopyButton);
                        ensureElementExists("CBL-info", runDataFetching);
                    } else {
                        removeElementById("copy-button");
                        removeElementById("open-url-button");
                        removeElementById("CBL-info");
                    }

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
                copyButtoANDSteamIDs();


                // Start CBL of section ------ >

                function getInnerTextByTitle(titlePart, defaultValue) {
                    return document.querySelector(`[title*="${titlePart}"]`)?.innerText || defaultValue;
                }

                const graphqlEndpoint = "https://communitybanlist.com/graphql";
                async function runDataFetching() {
                    if (isFetching) {
                        console.log("CBL script already in progress... Skipping...");
                        return;
                    }

                    const pSteamID = getInnerTextByTitle("765", "SteamID MISSING?");
                    if (pSteamID && pSteamID !== "SteamID MISSING?") {
                        try {
                            isFetching = true;
                            await fetchSteamUserData(pSteamID);
                        } catch (error) {
                            console.error("Error fetching Steam user data:", error);
                        } finally {
                            isFetching = false;
                        }
                    } else {
                        console.error("Invalid Steam ID");
                    }
                }

                async function fetchSteamUserData(steamID) {
                    // Adds slight delay so the script does not run before the page is ready.
                    await new Promise(resolve => setTimeout(resolve, 500));

                    const maxRetries = 1; // Do not increase beyond 3.
                    const retryDelay = 3000;
                    let attempt = 0;
                    let success = false;

                    while (attempt < maxRetries && !success) {
                        try {
                            attempt++;
                            console.log(`CBL API Query ${attempt}: Fetching user data for SteamID ${steamID}`);

                            const response = await fetch(graphqlEndpoint, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ query: `query Search($id: String!) { steamUser(id: $id) { riskRating activeBans: bans(orderBy: "created", orderDirection: DESC, expired: false) { edges { node { id } } } expiredBans: bans(orderBy: "created", orderDirection: DESC, expired: true) { edges { node { id } } } } }`, variables: { id: steamID } }) });

                            if (!response.ok) {
                                throw new Error(`HTTP error! Status: ${response.status} (${response.statusText})`);
                            }

                            const data = await response.json();
                            if (!data || !data.data || !data.data.steamUser) {
                                throw new Error("Invalid response format or user not found.");
                            }

                            const user = data.data.steamUser;
                            const riskRating = user.riskRating || "?";
                            const activeBansCount = user.activeBans.edges.length || 0;
                            const expiredBansCount = user.expiredBans.edges.length || 0;

                            displayUserData(riskRating, activeBansCount, expiredBansCount);
                            console.log("Fetch successful!");
                            success = true;

                        } catch (error) {
                            console.error(`Attempt ${attempt} failed: ${error.message}`, error);
                            if (attempt < maxRetries) {
                                console.log(`Retrying in ${retryDelay / 1000} seconds...`);
                                await new Promise(resolve => setTimeout(resolve, retryDelay));
                            } else {
                                console.error("Max retries reached. Fetch operation failed.");
                                displayUserData("?", "?", "?");
                                success = true;
                            }
                        }
                    }
                }

                function displayUserData(riskRating, activeBansCount, expiredBansCount) {
                    const CBL = document.createElement("div");
                    CBL.id = "CBL-info";
                    CBL.classList.add("CBL-Button");

                    CBL.style = `width: 150px;height: 50px;left: 16em;top: 12em;left: 22em;background: #000000bd;color: white;border: none;border-radius: 5%;box-shadow: 0 4px 6px rgba(15, 7, 7, 0.1);padding: 2px;position: absolute;text-align: center;z-index: 99998;`;

                    // Determine text color for risk rating
                    let riskColor = "white"; // Default color

                    if (riskRating >= 1 && riskRating <= 5) {
                        riskColor = "orange";
                    } else if (riskRating > 5) {
                        riskColor = "red";
                    }

                    CBL.innerHTML = `<span style="font-size: 1.2em; font-weight: bold; color: ${riskColor};"> CBL: ${riskRating}/10 <br><span style="font-size: 12px;">Active: ${activeBansCount} / Expired: ${expiredBansCount}<br></span></span>`;


                    document.body.appendChild(CBL);
                }


                // < ----------- end of CBL section.
            }
            function colorDialogMenus() {


                function applyStyles(elements, styles) {
                    elements.forEach((el) => {
                        styles.forEach(({ phrase, styles }) => {
                            if (el.textContent.includes(phrase)) {
                                Object.assign(el.style, styles);
                            }
                        });
                    });
                };

                setTimeout(() => {
                    // Apply styles to specific elements based on content
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
                }, 500)

            } colorDialogMenus();
        }
    }

    // Continuously run updateLogic using setInterval
    setInterval(async () => {
        await updateLogic();
    }, updateRate);
}

// Mutation observer setup to detect the presence of the target classes
function observeDOMChanges() {
    const observer = new MutationObserver((mutationsList, observer) => {
        for (const mutation of mutationsList) {
            if (mutation.type === 'childList' || mutation.type === 'attributes') {
                const targetElement1 = document.querySelector('.ReactVirtualized__Grid__innerScrollContainer');
                const targetElement2 = document.querySelector('.container-fluid');
                const targetElement3 = document.querySelector('.list-unstyled');

                // If either class exists, start the code and disconnect the observer
                if (targetElement1 || targetElement2 || targetElement3) {
                    console.log("Target element detected. Starting code...");
                    observer.disconnect(); // Stop observing after the first detection
                    runCode(); // Start the main logic
                    break;
                }
            }
        }
    });


    // Start observing mutations
    observer.observe(document.body, { childList: true, subtree: true, attributes: true });


    // Observe the entire document for changes in the DOM structure
    observer.observe(document.body, {
        childList: true, // Detect when nodes are added or removed
        subtree: true, // Look within the entire document
        attributes: true, // Detect attribute changes
    });
}

// Start observing when the script loads
observeDOMChanges();
