

const { cmd, commands } = require('../lib/command');
st { cmd, commands } = require('../command');
const config = require('../config');
const { ytsearch } = require('@dark-yasiya/yt-dl.js');

// Store active searches per user or chat
const activeSearches = new Map(); // Key: chat ID, Value: { isActive: boolean, targetJid: string }

cmd({
    pattern: "jidsong",
    alias: ["asongto"],
    use: '.csongto <search> | <group/channel JID>',
    react: "📤",
    desc: "Search YouTube and send voice note to a specific group/channel (Owner Only)",
    category: "download",
    filename: __filename
}, async (conn, mek, m, { from, q, reply }) => {
    try {
        

        // Split query into search term and JID
        const [searchTerm, targetJid] = q.split('|').map(s => s.trim());
        if (!searchTerm || !targetJid) return reply("🔥Please provide a search term and a valid group/channel JID. Usage: .jidsong <search> | <JID>");

        // Validate JID format (basic check)
        if (!targetJid.includes('@g.us') && !targetJid.includes('@newsletter')) {
            return reply("Invalid JID! Please provide a valid group (@g.us) or channel (@newsletter) JID.");
        }

        // Initialize search state for this chat
        activeSearches.set(from, { isActive: true, targetJid: targetJid });

        const yt = await ytsearch(searchTerm);
        if (!yt.results || yt.results.length === 0) {
            activeSearches.delete(from); // Clean up
            return reply("No results found!");
        }

        const videos = yt.results.slice(0, 10); //  10 යවනවා

        for (let vid of videos) {
            // Check if search is still active
            if (!activeSearches.get(from)?.isActive) {
                reply("Search stopped by user!");
                activeSearches.delete(from); // Clean up
                break;
            }

            let mp3Api = `https://apis.davidcyriltech.my.id/youtube/mp3?url=${encodeURIComponent(vid.url)}`;
            let mp3res = await fetch(mp3Api).then(r => r.json());

            if (!mp3res?.success) continue;

            const caption = ` 𝙎𝙊𝙉𝙂 🤍

🎬 *тιттℓє:* ${vid.title}

⏱️ *∂υяєтιση:* ${vid.timestamp}

👀 *νιєωѕ:* ${vid.views}

👤 *αυтнσя:* ${vid.author.name}

🔗 *ѕηg ℓιηк:* ${vid.url}


`;

            await conn.sendMessage(activeSearches.get(from).targetJid, {
                image: { url: vid.thumbnail },
                caption: caption,
                contextInfo: {
                    mentionedJid: [m.sender],
                    forwardingScore: 999,
                    isForwarded: true,
                    forwardedNewsletterMessageInfo: {
                        newsletterJid: '@newsletter',
                        newsletterName: '✘  ＳＯＮＧ 🔥',
                        serverMessageId: 143
                    }
                }
            }, { quoted: mek });

            // Send voice note
            await conn.sendMessage(activeSearches.get(from).targetJid, {
                audio: { url: mp3res.result.downloadUrl },
                mimetype: "audio/mpeg",
                ptt: true
            });

            // Notify the owner
            await conn.sendMessage(from, { text: `Song "${vid.title}" sent to ${targetJid}` });

            // Add delay to prevent flooding
            await new Promise(resolve => setTimeout(resolve, 1000)); // 1-second delay
        }

        // Clean up after loop
        activeSearches.delete(from);

    } catch (e) {
        console.log(e);
        activeSearches.delete(from); // Clean up on error
        reply("An error occurred. Please try again later.");
    }
});