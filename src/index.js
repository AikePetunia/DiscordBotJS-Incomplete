/// needs, nodemon, discord.js V14, sqlite3

var TOKEN = ""
var GUILD_ID = ""
var CLIENT_ID = ""
var TWITCH_API_ID = ""
var TWITCH_SECRET_ID = ""
var WEBHOOK_ID = ""

const { Client, REST, Routes, ApplicationCommandOptionType, GatewayIntentBits, Message, MessageEmbed,  EmbedBuilder, ActivityType, Intents, Embed} = require('discord.js');

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMembers,
  ],
})

const capitulo = Math.floor(Math.random() * 1068) + 1;
const embeds = require('./embedsDiscord');
const moderationCommands = require('./moderation');
const redesConfiguradas = require('./redes');

client.on('ready', (c) => {
    console.log(`✅ ${c.user.tag} Está listo !`)

    client.user.setActivity({
        name: "one piece cap" + capitulo,
        type: ActivityType.Watching,
    });
});

client.on('messageCreate', (msg) => {
    if (msg.author.bot) {
        return;
    };

    console.log(msg.content);
});



client.on('interactionCreate', async (interaction) => {
    if (!interaction.isCommand()) {
        return;
    }

    embeds(interaction);
    moderationCommands(interaction);
    redesConfiguradas(interaction);

});
    
    
client.login(TOKEN);


/// purge, welcome, notis de tw, ig, yt, twitch, detectador de links, poner x everyones cada x tiempo cada vdeo nuevo, musica ? help, gpt
/// trans bot y easy set up bot. pone permisos para banear pq ya veo q todos usan los comandos xd
/// acordate de ponerle permis