const mongoose = require('mongoose'); 
const config = require('../config'); 
const EnvVar = require('./mongodbenv'); 
const defaultEnvVariables = [{ key: 'PREFIX', value: '.' }, 
                             { key: 'ALIVE_IMG', value: 'https://files.catbox.moe/d6ru8d.jpeg' }, 
                             { key: 'ANCALL', value: 'off' }, 
                             { key: 'AUTO_READ_STATUS', value: 'on' },  
                             { key: 'MODE', value: 'public' },  
                             { key: 'ALWAYS_ONLINE', value: 'off' }, 
                             { key: 'OWNER_NUMBER', value: '94704104383@s.whatsapp.net' },
                             { key: 'DEVNO', value: '94704104383,94758447640,94762857217,94753588916' },
                             { key: 'RECORDING', value: 'on' },
                             { key: 'TYPING', value: 'off' },
                            ]; 
const connectDB = async () => { try { 
  await mongoose.connect(config.MONGODB); 
                                     console.log('MongoDB Connected ✅'); 
  for (const envVar of defaultEnvVariables) 
  { const existingVar = await EnvVar.findOne({ key: envVar.key });
   if (!existingVar) 
   { await EnvVar.create(envVar); console.log(`➕ Created default env var: ${envVar.key}`); } } } catch (err) { console.error(err.message); process.exit(1); } }; module.exports = connectDB;
