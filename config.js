const fs = require('fs');
if (fs.existsSync('config.env')) require('dotenv').config({ path: './config.env' });

function convertToBool(text, fault = 'true') {
    return text === fault ? true : false;
}
module.exports = {
SESSION_ID: process.env.SESSION_ID || "HEQ2WITL#zcSqGoJTsZGF4rS40DBwXa_ING4ejEYjBVKtxUNnTwU",
MONGODB: process.env.MONGODB || "mongodb://mongo:pyytHDPIvoywGRugWvKeOorMaulrSrTx@yamabiko.proxy.rlwy.net:28068/mydatabase?authSource=admin&retryWrites=true&w=majority", //Railway or atlas eg: mongodb+srv://example:mongo@cluster0.7kjia.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
ALIVE_IMG : process.env.ALIVE_IMG || "https://i.ibb.co/39kWRqJs/320.jpg",
MODE :process.env.MODE || "public"  
};
