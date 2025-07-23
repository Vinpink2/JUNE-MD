const settings = require('../settings');
const fs = require('fs');
const path = require('path');
const os = require('os');

function formatTime(seconds) {
    const days = Math.floor(seconds / (24 * 60 * 60));
    seconds = seconds % (24 * 60 * 60);
    const hours = Math.floor(seconds / (60 * 60));
    seconds = seconds % (60 * 60);
    const minutes = Math.floor(seconds / 60);
    seconds = Math.floor(seconds % 60);

    let time = '';
    if (days > 0) time += `${days}d `;
    if (hours > 0) time += `${hours}h `;
    if (minutes > 0) time += `${minutes}m `;
    if (seconds > 0 || time === '') time += `${seconds}s`;

    return time.trim();
}

async function helpCommand(sock, chatId, message) {
        const start = Date.now();
        await sock.sendMessage(chatId, { text: '_Loading♻️ please wait..._' }, { quoted: message });
        const end = Date.now();
        const ping = Math.round((end - start) / 2);

        const uptimeInSeconds = process.uptime();
        const uptimeFormatted = formatTime(uptimeInSeconds);
    const helpMessage = `
┏❐═══════════════════╗
┃     🌌  𝐉ᴜɴᴇ 𝐌ᴅ  🌌
┗❐═══════════════════╝
 
┏❐═══════════════════╗
┃▢  *Owner: ${settings.botOwner}*
┃▢  *Uptime: ${uptimeFormatted}*
┃▢  *Time: ${new Date().toLocaleString()}*
┃▢  *Speed: ${ping} ms*
┃▢  *vassion: v${settings.version}*
┗❐═══════════════════╝
> *OWNER CMD*
┏❐═══════════════════╗
┃➤ .ban
┃➤ .unban
┃➤ .promote
┃➤ .demote
┃➤ .mute 
┃➤ .unmute
┃➤ .delete
┃➤ .kick
┃➤ .warnings
┃➤ .warn
┃➤ .antilink
┃➤ .antibadword
┃➤ .clear
┃➤ .tag
┃➤ .tagall
┃➤ .chatbot
┃➤ .resetlink
┃➤ .welcome
┃➤ .goodbye
┗❐═══════════════════╝
> *GENERAL CMD*
┏❐═══════════════════╗
┃➤ .menu
┃➤ .ping
┃➤ .alive
┃➤ .tts
┃➤ .owner
┃➤ .joke
┃➤ .quote
┃➤ .fact
┃➤ .weather 
┃➤ .news
┃➤ .attp
┃➤ .lyrics
┃➤ .8ball 
┃➤ .groupinfo
┃➤ .admins 
┃➤ .vv
┃➤ .trt
┃➤ .ss 
┃➤ .jid
┗❐═══════════════════╝
> *SETTINGS CMD*
┏❐═══════════════════╗
┃➤ .mode
┃➤ .autostatus
┃➤ .clearsession
┃➤ .antidelete
┃➤ .cleartmp
┃➤ .setpp 
┃➤ .autoreact
┗❐═══════════════════╝
> *STICKER CMD*
┏❐═══════════════════╗
┃➤ .blur
┃➤ .simage 
┃➤ .sticker
┃➤ .tgsticker
┃➤ .meme
┃➤ .take 
┃➤ .emojimix
┗❐═══════════════════╝
> *GAMEMENU CMD*
┏❐═══════════════════╗
┃➤ .tictactoe 
┃➤ .hangman
┃➤ .guess 
┃➤ .trivia
┃➤ .answer
┃➤ .truth
┃➤ .dare
┗❐═══════════════════╝
> *SERCH AI*
┏❐═══════════════════╗
┃➤ .gpt
┃➤ .gemini
┃➤ .imagine
┃➤ .flux
┗❐═══════════════════╝
> *OTHER CMDS* 
┏❐═══════════════════╗
┃➤ .compliment
┃➤ .insult
┃➤ .flirt 
┃➤ .shayari
┃➤ .goodnight
┃➤ .roseday
┃➤ .character
┃➤ .wasted
┃➤ .ship 
┃➤ .simp
┃➤ .stupid
┗❐═══════════════════╝
> *MAKER MENU*
┏❐═══════════════════╗
┃➤ .metallic 
┃➤ .ice 
┃➤ .snow
┃➤ .impressive
┃➤ .matrix
┃➤ .light
┃➤ .neon
┃➤ .devil
┃➤ .purple
┃➤ .thunder
┃➤ .leaves
┃➤ .1917 
┃➤ .arena
┃➤ .hacker
┃➤ .sand
┃➤ .blackpink
┃➤ .glitch
┃➤ .fire 
┗❐═══════════════════╝
> *SEACH CMD*
┏❐═══════════════════╗
┃➤ .play
┃➤ .song 
┃➤ .instagram
┃➤ .facebook
┃➤ .tiktok 
┃➤ .video
┃➤ .ytmp4
┗❐═══════════════════╝
> *GITHUB CMD*
┏❐═══════════════════╗
┃➤ .git
┃➤ .github
┃➤ .sc
┃➤ .script
┃➤ .repo
┃➤ .gitclone
┗❐═══════════════════╝`;

    try {
        const imagePath = path.join(__dirname, '../assets/menu_image.jpg');
        
        if (fs.existsSync(imagePath)) {
            const imageBuffer = fs.readFileSync(imagePath);
            
            await sock.sendMessage(chatId, {
                image: imageBuffer,
                caption: helpMessage,
                contextInfo: {
                    forwardingScore: 1,
                    isForwarded: false,
                    forwardedNewsletterMessageInfo: {
                        newsletterJid: '@newsletter',
                        newsletterName: '',
                        serverMessageId: -1
                    }
                }
            },{ quoted: message });
        } else {
            console.error('Bot image not found at:', imagePath);
            await sock.sendMessage(chatId, { 
                text: helpMessage,
                contextInfo: {
                    forwardingScore: 1,
                    isForwarded: false,
                    forwardedNewsletterMessageInfo: {
                        newsletterJid: '@newsletter',
                        newsletterName: '𝐉ᴜɴᴇ 𝐌ᴅ',
                        serverMessageId: -1
                    } 
                }
            });
        }
    } catch (error) {
        console.error('Error in help command:', error);
        await sock.sendMessage(chatId, { text: helpMessage });
    }
}

module.exports = helpCommand;
