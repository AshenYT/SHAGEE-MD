const config = require('../config');
const { cmd, commands } = require('../command');
const pdfUrl = "https://i.ibb.co/39kWRqJs/320.jpg";

cmd({
    pattern: "alive",
    desc: "Check if the bot is alive.",
    category: "main",
    react: "✅",
    filename: __filename
}, async (conn, mek, m, { from, quoted, reply }) => {
    try {


        // Send a message indicating the bot is alive
        const message = await conn.sendMessage(from, { text: '`𝐒𝐇𝐀𝐆𝐄𝐄 𝐌𝐃 𝐀𝐋𝐈𝐕𝐄 𝐍𝐎𝐖💚`' });

        // Simulate some processing time
        const startTime = Date.now();
        await new Promise(resolve => setTimeout(resolve, 500)); // Simulating a delay
        const endTime = Date.now();
        const ping = endTime - startTime;

        // Send the alive response with additional information
        await conn.sendMessage(from, {
            document: { url: pdfUrl }, // Path to your PDF file
            fileName: 'SHAGEE MD💗', // Filename for the document
            mimetype: "application/pdf",
            fileLength: 99999999999999,
            image: { url: 'https://i.ibb.co/39kWRqJs/320.jpg' },
            pageCount: 2024,
            caption: `𝗦𝗛𝗔𝗚𝗘𝗘 𝗠𝗗 𝗩1 𝗜𝘀 𝗔𝗹𝗶𝘃𝗲! \n\n⏰ 𝗥𝗲𝘀𝗽𝗼𝗻𝘀𝗲 𝗧𝗶𝗺𝗲 : ${ping} ms\n\n𝗧𝘆𝗽𝗲   .𝗺𝗲𝗻𝘂 𝗼𝗿 .𝗹𝗶𝘀𝘁 𝗳𝗼𝗿 𝗴𝗲𝘁 𝗰𝗼𝗺𝗺𝗮𝗻𝗱𝘀\n\𝗦𝗛𝗔𝗚𝗘𝗘 𝗠𝗗 𝗩1 💚`,
            contextInfo: {
                forwardingScore: 999,
                isForwarded: true,
                forwardedNewsletterMessageInfo: {
                    newsletterName: '𝐒𝙷𝙰𝙶𝙴𝙴 𝐌𝙳 ██▌▍▌▍██',
                    newsletterJid: "120363421350428668@newsletter",
                },
                externalAdReply: {
                    title: '©𝗦𝗛𝗔𝗚𝗘𝗘 𝗠𝗗 💚',
                    body: ' *𝗦𝗛𝗔𝗚𝗘𝗘 𝗠𝗗 💗*',
                    thumbnailUrl: 'https://i.ibb.co/39kWRqJs/320.jpg',
                    sourceUrl: 'https://wa.me/message/94766518242',
                    mediaType: 1,
                    renderLargerThumbnail: true
                }
            }
        });

    } catch (e) {
        console.error(e);
        reply(`${e}`);
    }
});

