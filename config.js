const fs = require('fs');
if (fs.existsSync('config.env')) require('dotenv').config({ path: './config.env' });

function convertToBool(text, fault = 'true') {
    return text === fault ? true : false;
}
module.exports = {
SESSION_ID: process.env.SESSION_ID || "SHAGEE-MD=9vUhkYTK#gmcKs_1vAN9EMkuu4RmMRfSjwS5R7QU1fePVnnYaog8",
MONGODB: process.env.MONGODB || "mongodb+srv://dinuwah8:HgcqIFRK0yPPpHke@cluster0.kdzse9j.mongodb.net/", //Railway or atlas eg: mongodb+srv://example:mongo@cluster0.7kjia.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
};


//mongodb+srv://Chamath:Chamath@cluster0.ptx139b.mongodb.net/
