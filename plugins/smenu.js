const { readEnv } = require('../lib/database');
const { cmd, commands } = require('../command');
const os = require("os");
const moment = require('moment-timezone');
const axios = require('axios');
const config = require('../config');
let readmore = "\u200B".repeat(4000);
const src = require('api-dylux')
const yts = require('yt-search')
const cheerio = require("cheerio");
const {sleep}=require('../lib/functions');
cmd(
  {pattern:"restart",
   desc:"restart the bot",
   category:"xxx",
   filename:__filename},
  async(conn,mek,m,{from,quoted,body,isCmd,command,args,q,isGroup,sender,senderNumber,botNumber2,botNumber,pushname,isMe,isOwner,groupMetadata,groupName,participants,groupAdmins,isBotAdmins,isAdmins,reply})=>{
    try{
      if(!isOwner)return;
        const {exec}=require("child_process");
        reply("*Restarting... 🔄*");
        await sleep(1500);exec("pm2 restart all");
       }catch(e){
      console.log(e);
      reply(`${e}`);}});


// Function to convert seconds into a readable format
function runtime(seconds) {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = Math.floor(seconds % 60);
    return `${hours}h ${minutes}m ${secs}s`;
}

cmd({
    pattern: "menu",
    desc: "Check uptime, RAM usage, and more",
    category: "main",
    react: "📃",
    filename: __filename
}, async (conn, mek, m, { from, quoted, pushname, reply , sender }) => {
    try {
       const config = await readEnv();
        const totalRAM = Math.round(os.totalmem() / 1024 / 1024); // Total RAM in MB
        const usedRAM = (process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2); // Used RAM in MB
        const freeRAM = (totalRAM - parseFloat(usedRAM)).toFixed(2); // Free RAM in MB
        const caption = `
╔══✦❘༻༺❘✦══╗
*𝗛𝗘𝗬 ${pushname}!*
╚══✦❘༻༺❘✦══╝

━━━━━━━━━━━━━━━━━
*𝐒𝙷𝙰𝙶𝙴𝙴 𝐌𝙳 ██▌▍▌▍██* 
━━━━━━━━━━━━━━━━━  

⏱ *𝐔𝐏𝐓𝐈𝐌𝐄: ${runtime(process.uptime())}*
💾 *𝐌𝐄𝐌𝐎𝐑𝐘 𝐔𝐒𝐀𝐆𝐄:*
  ▪️ *𝐔𝐒𝐄𝐃: ${usedRAM}𝐌𝐁*
  ▪️ *𝐅𝐑𝐄𝐄: ${freeRAM}𝐌𝐁*  
  ▪️ *𝐓𝐎𝐓𝐀𝐋: ${totalRAM}𝐌𝐁*
  
📩 *𝗥ᴇᴘʟʏ 𝗧ʜᴇ 𝗠ᴇɴᴜ 𝗡ᴜᴍʙᴇʀ*:  
 *╔┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉*⟾
*┋*♱▯ ◯ ❦┟1️⃣ • *𝗢ᴡɴᴇʀ 𝗠ᴇɴᴜ*
*┋*♱▯ ◯ ❦┟2️⃣ • *𝗗ᴏᴡɴʟᴏᴅ 𝗠ᴇɴᴜ*
*┋*♱▯ ◯ ❦┟3️⃣ • *𝗦ᴇᴀʀᴄʜ 𝗠ᴇɴᴜ*
*┋*♱▯ ◯ ❦┟4️⃣ • *𝗙ᴜɴ 𝗠ᴇɴᴜ*
*┋*♱▯ ◯ ❦┟5️⃣ • *𝗚ʀᴏᴜᴘ 𝗠ᴇɴᴜ*
*┋*♱▯ ◯ ❦┞6️⃣ • *𝗟ᴏɢᴏ 𝗠ᴇɴᴜ*
*╚┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉⇏*

~_*ᴋɪɴɢ ꜱʜᴀɢᴇᴇ ᴍᴅ*❗❗_~


> © 𝐏ᴏᴡᴇʀᴅ 𝐁ʏ 𝐒ʜᴀɢᴇᴇ 𝐌ᴅ ᴠ1`;

    

        // Sending the thumbnail link preview
     const sentMsg = await conn.sendMessage(from, {
            image: {url:config.ALIVE_IMG},
            caption: caption,
                   contextInfo: {
                forwardingScore: 1,
                isForwarded: true,
                forwardedNewsletterMessageInfo: {
                    newsletterJid: '120363421350428668@newsletter',
                    newsletterName: "𝐒𝙷𝙰𝙶𝙴𝙴 𝐌𝙳 ██▌▍▌▍██",
                    serverMessageId: 1041,
                }
            }
        }, { quoted: mek || null });  

        // Listen for replies to the menu message
        conn.ev.on('messages.upsert', async (msgUpdate) => {
            const msg = msgUpdate.messages[0];
            if (!msg.message || !msg.message.extendedTextMessage) return;

            const selectedOption = msg.message.extendedTextMessage.text.trim();
            const contextInfo = msg.message.extendedTextMessage.contextInfo;

            // Check if the reply is for the initial menu message
            if (contextInfo && contextInfo.stanzaId === sentMsg.key.id) {
                switch (selectedOption) {
                    case '1':
                        await conn.sendMessage(from, { text: `▁𝗢𝗪𝗡𝗘𝗥 𝗖𝗢𝗠𝗠𝗔𝗡𝗗𝗦▁
                        
*╔┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉┉*⟾                        
> ▯☛${config.PREFIX}prefix

> ▯☛${config.PREFIX}mode

> ▯☛${config.PREFIX}online

> ▯☛${config.PREFIX}status

> ▯☛${config.PREFIX}recording

> ▯☛${config.PREFIX}typing

> ▯☛${config.PREFIX}settings 

> ▯☛${config.PREFIX}aliveimg

> © 𝐏ᴏᴡᴇʀᴅ 𝐁ʏ 𝐒ʜᴀɢᴇᴇ 𝐌ᴅ ᴠ1
 ` }, { quoted: mek || null });
                        break;
                    case '2':
                        await conn.sendMessage(from, { text: `▁𝗗𝗢𝗪𝗡𝗟𝗢𝗗 𝗖𝗢𝗠𝗠𝗔𝗡𝗗𝗦▁;

> ▯☛${config.PREFIX}song  

> ▯☛${config.PREFIX}video  

> ▯☛${config.PREFIX}fb

> ▯☛${config.PREFIX}xnxx  

> ▯☛${config.PREFIX}phub
 
> ▯☛${config.PREFIX}gdrive

> ▯☛${config.PREFIX}mfire  

> ▯☛${config.PREFIX}tiktok

> © 𝐏ᴏᴡᴇʀᴅ 𝐁ʏ 𝐒ʜᴀɢᴇᴇ 𝐌ᴅ ᴠ1` }, { quoted: mek || null });
                        break;
                    case '3':
                        await conn.sendMessage(from, { text: `▁𝗦𝗘𝗔𝗥𝗖𝗛 𝗖𝗢𝗠𝗠𝗔𝗡𝗗𝗦▁;

> ▯☛${config.PREFIX}yts  

> ▯☛${config.PREFIX}save

> ▯☛${config.PREFIX}song  

> ▯☛${config.PREFIX}wallpaper

> ▯☛${config.PREFIX}ai

> :© 𝐏ᴏᴡᴇʀᴅ 𝐁ʏ 𝐒ʜᴀɢᴇᴇ 𝐌ᴅ ᴠ1` }, { quoted: mek || null });
                        break;
                        case '4':
                        await conn.sendMessage(from, { text: `▁𝗙𝗨𝗡 𝗖𝗢𝗠𝗠𝗔𝗡𝗗𝗦▁;

> ▯☛${config.PREFIX}hack  

> ▯☛${config.PREFIX}live

> ▯☛${config.PREFIX}ip  

> ▯☛${config.PREFIX}anime

> ▯☛${config.PREFIX}joke

> :© 𝐏ᴏᴡᴇʀᴅ 𝐁ʏ 𝐒ʜᴀɢᴇᴇ 𝐌ᴅ ᴠ1` }, { quoted: mek || null });
                   break;
                        case '5':
                        await conn.sendMessage(from, { text: `▁𝗙𝗨𝗡 𝗖𝗢𝗠𝗠𝗔𝗡𝗗𝗦▁;

> ▯☛${config.PREFIX}mute 

> ▯☛${config.PREFIX}unmute

> ▯☛${config.PREFIX}tag  

> ▯☛${config.PREFIX}hidetag

> ▯☛${config.PREFIX}info

> :© 𝐏ᴏᴡᴇʀᴅ 𝐁ʏ 𝐒ʜᴀɢᴇᴇ 𝐌ᴅ ᴠ1` }, { quoted: mek || null });
break;
                        case '6':
                        await conn.sendMessage(from, { text: `▁𝗙𝗨𝗡 𝗖𝗢𝗠𝗠𝗔𝗡𝗗𝗦▁;

> ▯☛${config.PREFIX}hack  

> ▯☛${config.PREFIX}live

> ▯☛${config.PREFIX}ip  

> ▯☛${config.PREFIX}anime

> ▯☛${config.PREFIX}joke

> :© 𝐏ᴏᴡᴇʀᴅ 𝐁ʏ 𝐒ʜᴀɢᴇᴇ 𝐌ᴅ ᴠ1` }, { quoted: mek || null });
                     default:
                        await conn.sendMessage(from, { text: `Invalid option! Please select a valid number.` }, { quoted: mek || null });
                        break;
                }
            }
        });

    } catch (e) {
        console.error(e);
        reply(`Error: ${e.message}`);
    }
});

//songdl
cmd({
  pattern: 'song',
  alias: 'ytmp3j',
  react: '🎵',
  desc: "Download Song",
  category: 'download',
  filename: __filename
}, async (conn, mek, text, { from, quoted, q, reply ,isOwner , isGroup }) => {
  try {
    if (!q) return reply("Enter Name or URL ❤️");

    const config = await readEnv();

	       if (config.MODE === "private" && !isOwner) {
	return; 
}
if (config.MODE === "groups" && !isOwner && !isGroup) {
return reply("Bot only allowed to use Command in Groups.");
}
if (config.MODE === "inbox" && !isOwner && isGroup) {
return reply("You are only allowed to use Command in Inbox.");
} 
    const search = await yts(q);
    const video = search.videos[0];
    if (!search.videos.length) return reply("❌ Video not found!");

    const mp3Response = await (await fetch(`https://manul-official-new-api-site.vercel.app/convert?mp3=${video.url}&apikey=Manul-Official`)).json(); 
    const mp3 = mp3Response.data;

  const safeTitle = video.title?.replace(/[^\x00-\x7F]/g, '') || 'song';
    
    const sentMsg = await conn.sendMessage(from, {
             image: { url: video.thumbnail },
            caption: `⦁⦂⦁*━┉━┉━┉━┉━┉━┉━┉━⦁⦂⦁
 
📃 *𝗧ɪᴛᴇʟ:* ${video.title}
📅 *𝗔ɢᴏ:* ${video.ago}
⏱️ *𝗧ɪᴍᴇ:* ${video.timestamp}
🎭 *𝗩ɪᴇᴡꜱ:* ${video.views}
🔗 *𝗨ʀʟ:* ${video.url}

*🔢 Reply with a number :*

1 ┃ Audio 🎵  
2 ┃ Document 📁  
3 ┃ Voice Note 🎙️

> *© 𝐏ᴏᴡᴇʀᴅ 𝐁ʏ 𝐒ʜᴀɢᴇᴇ 𝐌ᴅ ᴠ1*`,
                   contextInfo: {
                forwardingScore: 1,
                isForwarded: true,
                forwardedNewsletterMessageInfo: {
                    newsletterJid: '120363421350428668@newsletter',
                    newsletterName: "𝐒𝙷𝙰𝙶𝙴𝙴 𝐌𝙳 ██▌▍▌▍██",
                    serverMessageId: 1041,
                }
            }
        }, { quoted: mek || null });

    // Listen for replies to that specific message
    conn.ev.on('messages.upsert', async (msgUpdate) => {
      const msg = msgUpdate.messages[0];
      if (!msg?.message || !msg.message.extendedTextMessage) return;

      const selectedOption = msg.message.extendedTextMessage.text.trim();
      const contextInfo = msg.message.extendedTextMessage.contextInfo;
           
      // Check if the reply matches the original message
      if (contextInfo && contextInfo.stanzaId === sentMsg.key.id) {
        switch (selectedOption) {
          case "1":
            await conn.sendMessage(from, {
              audio: { url: mp3.url },
              mimetype: 'audio/mpeg',
		       contextInfo: {
                forwardingScore: 1,
                isForwarded: true,
                forwardedNewsletterMessageInfo: {
                    newsletterJid: '120363421350428668@newsletter',
                    newsletterName: "𝐒𝙷𝙰𝙶𝙴𝙴 𝐌𝙳 ██▌▍▌▍██",
                    serverMessageId: 1041,
                }
            }
            }, { quoted: mek });
            break;

       case "2":
  await conn.sendMessage(from, {
    document: { url: mp3.url },
    mimetype: 'audio/mpeg',
    fileName: `${safeTitle}.mp3`,
    caption: "*Here's your song as a document* 🎧",
  contextInfo: {
                forwardingScore: 1,
                isForwarded: true,
                forwardedNewsletterMessageInfo: {
                    newsletterJid: '120363421350428668@newsletter',
                    newsletterName: "𝐒𝙷𝙰𝙶𝙴𝙴 𝐌𝙳 ██▌▍▌▍██",
                    serverMessageId: 1041,
                }
            }
  }, { quoted: mek });
  break;


          case "3":
            await conn.sendMessage(from, {
              audio: { url: mp3.url },
              mimetype: 'audio/mp4',
              ptt: true,
	   contextInfo: {
                forwardingScore: 1,
                isForwarded: true,
                forwardedNewsletterMessageInfo: {
                    newsletterJid: '120363421350428668@newsletter',
                    newsletterName: "𝐒𝙷𝙰𝙶𝙴𝙴 𝐌𝙳 ██▌▍▌▍██",
                    serverMessageId: 1041,
                }
            }    
            }, { quoted: Data.quoted });
            break;

          default:
            await conn.sendMessage(from, {
              text: "❌ Invalid option. Choose 1, 2, or 3."
            }, { quoted: msg });
            break;
        }
      }
    });

  } catch (err) {
    console.error(err);
    reply("❌ Error: " + err.message);
  }
});



//====================video_dl=======================

cmd({
  pattern: "video",
  alias: ["video2"],
  desc: "To download videos.",
  react: "🎥",
  category: "download",
  filename: __filename
},
async (conn, mek, text, { from, quoted, q, reply ,isOwner , isGroup }) => {
  try {  const config = await readEnv();
       
	        if (config.MODE === "private" && !isOwner) {
	return; 
}
if (config.MODE === "groups" && !isOwner && !isGroup) {
return reply("Bot only allowed to use Command in Groups.");
}
if (config.MODE === "inbox" && !isOwner && isGroup) {
return reply("You are only allowed to use Command in Inbox.");
}
    if (!q) return reply("Please give me a URL or video title 🎯");
  
    const search = await yts(q);
    const data = search.videos[0];
    if (!data) return reply("❌ Video not found.");

    const mp4Res = await (await fetch(`https://apis.davidcyriltech.my.id/download/ytmp4?url=${data.url}`)).json();
    const mp3Res = await (await fetch(`https://manul-official-new-api-site.vercel.app/convert?mp3=${data.url}&apikey=Manul-Official`)).json();

    const video = mp4Res.result;
    const audio = mp3Res.data;
    const safeTitle = data.title?.replace(/[^\x00-\x7F]/g, '') || 'video';

    const caption = `
⫷⦁[ *𝐒𝙷𝙰𝙶𝙴𝙴 𝐌𝙳* ]⦁⫸ 

🎥 *VIDEO FOUND!* 

➥ *𝐓ɪᴛᴇʟ:* ${data.title}
➥ *𝐃ᴜʀᴀᴛɪᴏɴ:* ${data.timestamp}
➥ *𝐕ɪᴇᴡꜱ:* ${data.views}
➥ *𝐀ɢᴏ:* ${data.ago}
➥ *𝐋ɪɴᴋ:* ${data.url}

*🔢 Reply with a number to download:*
1 ┃ Video 🎥
2 ┃ Document 📁
3 ┃ Audio 🎵
4 ┃ Voice Note 🎙️

> *┋© 𝐏ᴏᴡᴇʀᴅ 𝐁ʏ 𝐒ʜᴀɢᴇᴇ 𝐌ᴅ ᴠ1*
`;

      const sentMsg = await conn.sendMessage(from, {
        image: { url: data.thumbnail },
        caption,
        contextInfo: {
          forwardingScore: 1,
          isForwarded: true,
          forwardedNewsletterMessageInfo: {
            newsletterJid: '120363421350428668@newsletter',
            newsletterName: "𝐒𝙷𝙰𝙶𝙴𝙴 𝐌𝙳 ██▌▍▌▍██",
            serverMessageId: 1041,
          }
        }
      }, { quoted: mek || null });

      conn.ev.on('messages.upsert', async (msgUpdate) => {
        const msg = msgUpdate.messages[0];
        if (!msg?.message?.extendedTextMessage) return;
        const selectedOption = msg.message.extendedTextMessage.text.trim();
        const contextInfo = msg.message.extendedTextMessage.contextInfo;
        if (contextInfo?.stanzaId === sentMsg.key.id) {
          switch (selectedOption) {
            case "1":
              return conn.sendMessage(from, {
                video: { url: video.download_url },
                mimetype: "video/mp4",
                contextInfo: {
          forwardingScore: 1,
          isForwarded: true,
          forwardedNewsletterMessageInfo: {
            newsletterJid: '120363421350428668@newsletter',
            newsletterName: "𝐒𝙷𝙰𝙶𝙴𝙴 𝐌𝙳 ██▌▍▌▍██",
            serverMessageId: 1041,
          }
        }
              }, { quoted: mek });
            case "2":
              return conn.sendMessage(from, {
                document: { url: video.download_url },
                mimetype: "video/mp4",
                fileName: safeTitle + ".mp4",
                caption: "*┋ 𝐒𝙷𝙰𝙶𝙴𝙴 𝐌𝙳*",
               contextInfo: {
                forwardingScore: 1,
                isForwarded: true,
                forwardedNewsletterMessageInfo: {
                    newsletterJid: '120363421350428668@newsletter',
                    newsletterName: "𝐒𝙷𝙰𝙶𝙴𝙴 𝐌𝙳 ██▌▍▌▍██",
                    serverMessageId: 1041,
                }
            }
              }, { quoted: mek });
            case "3":
              return conn.sendMessage(from, {
                audio: { url: audio.url },
                mimetype: 'audio/mpeg'
              }, { quoted: Data.quoted });
            case "4":
              return conn.sendMessage(from, {
                audio: { url: audio.url },
                mimetype: 'audio/mp4',
                ptt: true,
                contextInfo: {
          forwardingScore: 1,
          isForwarded: true,
          forwardedNewsletterMessageInfo: {
            newsletterJid: '120363421350428668@newsletter',
            newsletterName: "𝐒𝙷𝙰𝙶𝙴𝙴 𝐌𝙳 ██▌▍▌▍██",
            serverMessageId: 1041,
          }
        }
              }, { quoted: Data.quoted });
            default:
              return conn.sendMessage(from, {
                text: "❌ Invalid option. Choose 1 to 4."
              }, { quoted: msg });
          }
        }
      });


  } catch (e) {
    console.error(e);
    reply("❌ Error: " + e.message);
  }
});


