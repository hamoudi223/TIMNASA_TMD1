const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoibVA0cStnNjhTOHJPUzBibjhnZEIydVhLeVhScFBFTnk0R0pmVGtxbEVGTT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiTVdzb1NMdzk1RXZVRkwxUlNOdS9RNGZSQVBuK0dMTVZSbDJDM0ZTME9GUT0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJxR2ZQYlo4OHpHZzNwUGtrOEJ3RlB1dTJZSlNnWm1oMEI3WURQVW10RW5nPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJxK1FJSWFqZ1lrZ0d1NkJJVHpsR0VKV1ZFUGo5SXE0bGVzNCtReUVzN0NRPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6InlCV0VaRzJiMVkrc3VhaEg0VW8zVTNWVUFDMjF6L3VFcGY4NktiZTdHbDg9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IktSRGV6TXVodkJabnh1elZvREpVVjRIdTQrTUMyZTltWE83VjZZd2hjWFE9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoic0RCMEJWaWNPMUw1RXB5dFFFL2tubG9QQWtyUzJpVzNWRUJ1bzZtcTlrdz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiRG5mYWpjWUl6TG1lZm9oVkdHdmZwZmJ0UjkydjR0ZDFKeWRRWVpteTh3ST0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkJqak83SnlvYzNHVElWZG1lQWtqSlF6elVZWTN0ZmZRZVBYR3NkMEY0dHZKaEF6WGdTTjhQSGh5TzFvbldpb2x2RnJOcjYyQm1MV0F4TjNjSFIyOEJRPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MTY3LCJhZHZTZWNyZXRLZXkiOiJRajBxTGw1ZkxCMmJhSzZHNjVoZmZEL2V5Q2Zrd3B6UjZpR2VSZjFhYjdFPSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W10sIm5leHRQcmVLZXlJZCI6MzEsImZpcnN0VW51cGxvYWRlZFByZUtleUlkIjozMSwiYWNjb3VudFN5bmNDb3VudGVyIjowLCJhY2NvdW50U2V0dGluZ3MiOnsidW5hcmNoaXZlQ2hhdHMiOmZhbHNlfSwiZGV2aWNlSWQiOiJ4dENXV25hU1NRYWd6eV9IWWNQZkl3IiwicGhvbmVJZCI6IjhiYjc2OTZhLTExNWEtNGZjNy1iZmY1LTZmZGMxM2I4ZmEzMCIsImlkZW50aXR5SWQiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJ6cGdabU8xRUlWdCs2ekpqQldmNko5d1Z1Y2s9In0sInJlZ2lzdGVyZWQiOnRydWUsImJhY2t1cFRva2VuIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiUFpybnIrcXoxeUhzU2JSYWNGRnovY1Q2RHdBPSJ9LCJyZWdpc3RyYXRpb24iOnt9LCJwYWlyaW5nQ29kZSI6IkI0Vko1NjNXIiwibWUiOnsiaWQiOiIyMjM5NTA2NDQ5NzoxOEBzLndoYXRzYXBwLm5ldCJ9LCJhY2NvdW50Ijp7ImRldGFpbHMiOiJDUEw4dDdrQ0VQQ0prYjRHR0FFZ0FDZ0EiLCJhY2NvdW50U2lnbmF0dXJlS2V5IjoiL3dhOXFZTXMvTnBkdUxSZlpVR2g3aFJ3MzkrOWdldVFGT3EyZFRnMXQwND0iLCJhY2NvdW50U2lnbmF0dXJlIjoiMis1VkRES3l5Ukk5YVAwc1Y2bVZULzhDaFcvTC9vdzVQK0FFb0d4UjlYTjliYkxBbXZlcDVhSFVXcXB5N1ZXSkxuakZweTRTT2RiUVNpMmpVYnBUZ1E9PSIsImRldmljZVNpZ25hdHVyZSI6ImhSMWxsNTkxYXJzdTM0bWV1M0tDRkoyUnNMMlRnMCtvdFk5by9nZ3Y3TWlJa1FERG14akRnNzd0UCtyS1laZUVqRmwvc1ZoYjhCS0hTTHdOVCtHWkFnPT0ifSwic2lnbmFsSWRlbnRpdGllcyI6W3siaWRlbnRpZmllciI6eyJuYW1lIjoiMjIzOTUwNjQ0OTc6MThAcy53aGF0c2FwcC5uZXQiLCJkZXZpY2VJZCI6MH0sImlkZW50aWZpZXJLZXkiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJCZjhHdmFtRExQemFYYmkwWDJWQm9lNFVjTi9mdllIcmtCVHF0blU0TmJkTyJ9fV0sInBsYXRmb3JtIjoiaXBob25lIiwibGFzdEFjY291bnRTeW5jVGltZXN0YW1wIjoxNzQwOTE1OTY0fQ==',
    PREFIXE: process.env.PREFIX || ".",
    OWNER_NAME: process.env.OWNER_NAME || "TIMNASA-TMD",
    NUMERO_OWNER : process.env.NUMERO_OWNER || "22395064497",              
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "no",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'no',
    BOT : process.env.BOT_NAME || 'BMW_MD',
    URL : process.env.BOT_MENU_LINKS || 'https://telegra.ph/file/17c83719a1b40e02971e4.jpg',
    MODE: process.env.PUBLIC_MODE || "no",
    PM_PERMIT: process.env.PM_PERMIT || 'yes',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME,
    HEROKU_APY_KEY : process.env.HEROKU_APY_KEY ,
    WARN_COUNT : process.env.WARN_COUNT || '3' ,
    ETAT : process.env.PRESENCE || '',
    CHATBOT : process.env.PM_CHATBOT || 'no',
    DP : process.env.STARTING_BOT_MESSAGE || "yes",
    ADM : process.env.ANTI_DELETE_MESSAGE || 'no',
    TIMNASA_TMD : process.env.AUTO_LIKE_STATUS || 'no',
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgresql://moudy_ggs4_user:1Tx91xlTiQ7jL2EMPUjVLa9xN4BfhafW@dpg-cusc0ca3esus73fltvs0-a.oregon-postgres.render.com/moudy_ggs4" : "postgresql://moudy_ggs4_user:1Tx91xlTiQ7jL2EMPUjVLa9xN4BfhafW@dpg-cusc0ca3esus73fltvs0-a.oregon-postgres.render.com/moudy_ggs4",
   
};

let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`mise à jour ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});
