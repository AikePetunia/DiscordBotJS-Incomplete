const { Client, REST, Routes, GatewayIntentBits, Message, MessageEmbed,  EmbedBuilder, Intents} = require('discord.js');

const client = new Client({
	intents: [
		GatewayIntentBits.Guilds,
		GatewayIntentBits.GuildMessages,
		GatewayIntentBits.MessageContent,
		GatewayIntentBits.GuildMembers,
	],
})

const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const dbPath = path.resolve(__dirname, 'database.sqlite');
const db = new sqlite3.Database(dbPath);
   
db.serialize(() => {
    db.run(`
      CREATE TABLE IF NOT EXISTS redes_sociales (
        usuario_id TEXT PRIMARY KEY,
        youtube TEXT,
        twitch TEXT,
        instagram TEXT,
        twitter TEXT,
        tiktok TEXT,
        creator_content_name TEXT 
      )
    `);
});



module.exports = function redesSociales(interaction) {

    if (!interaction || !interaction.commandName) {
        return;
      }

    const usuarioId = interaction.user.id;

    const { commandName, options } = interaction;

    const socialMediaNotFound = new EmbedBuilder ()
                    .setTitle(':x: Error: Red social no encontrada. :x:')
                    .setDescription('El **creador de Contenido** *`no cuenta con esta red Social`* o no lo ha configurado')
                    .setColor('Red')
                    

    if (commandName === 'configurar_redes') {
    const usuarioId = interaction.user.id;
    const youtube = options.getString('youtube');
    const twitch = options.getString('twitch');
    const instagram = options.getString('instagram');
    const twitter = options.getString('twitter');
    const tiktok = options.getString('tiktok');
    const creator_content_name = options.getString('nombre');

    const sql = `
      INSERT INTO redes_sociales (usuario_id, youtube, twitch, instagram, twitter, tiktok, creator_content_name)
      VALUES (?, ?, ?, ?, ?, ?, ?)
      ON CONFLICT(usuario_id) DO UPDATE SET
        youtube = excluded.youtube,
        twitch = excluded.twitch,
        instagram = excluded.instagram,
        twitter = excluded.twitter,
        tiktok = excluded.tiktok,
        creator_content_name = excluded.creator_content_name;
    `;

    db.run(sql, [usuarioId, youtube, twitch, instagram, twitter, tiktok, creator_content_name], (err) => {
        if (err) {
            console.error('Error al guardar los datos:', err);
            interaction.reply('Hubo un error al guardar los datos. Por favor, inténtalo nuevamente.');
        } else {
            interaction.reply('Se han guardado los datos correctamente.');
        }
    });
}


    if (commandName === 'youtube') {
        db.get('SELECT youtube, creator_content_name FROM redes_sociales WHERE usuario_id = ?', usuarioId, (err, row) => {
            if (err) {
                console.error('Error al consultar la base de datos:', err);
                return;
            }
    
            if (row && row.youtube && row.creator_content_name) {
                const youtube = row.youtube;
                const creator_content_name = row.creator_content_name;
                const embed = new EmbedBuilder()
                    .setTitle(':red_circle: **Canal de YouTube** :red_circle:')
                    .setDescription(`Canal de YouTube ${creator_content_name}: \n **${youtube}**`)
                    .setColor('#FF0000')
                    .setFooter({ text: 'Creado por: aike.petunia', iconURL: 'https://aikepetunia.github.io/Aike/images/888_sin_titulo_20230227183052.png' });
    
                interaction.reply({ embeds: [embed] });
            } else {
                interaction.reply({ embeds: [socialMediaNotFound]});
            }
        });
    }

    if (commandName === 'tiktok') { ///tik tok
        db.get('SELECT tiktok, creator_content_name FROM redes_sociales WHERE usuario_id = ?', usuarioId, (err, row) => {
            if (err) {
                console.error('Error al consultar la base de datos:', err);
                return;
            }
    
            if (row && row.tiktok && row.creator_content_name) {
                const tiktok = row.tiktok;
                const creator_content_name = row.creator_content_name;
                const embed = new EmbedBuilder()
                    .setTitle(':musical_note: **TikTok** :musical_note:')
                    .setDescription(`TikTok:  \n**${tiktok}**`)
                    .setColor('#69C9D0')
                    .setFooter({ text: 'Creado por: aike.petunia', iconURL: 'https://aikepetunia.github.io/Aike/images/888_sin_titulo_20230227183052.png' });
    
                interaction.reply({ embeds: [embed] });
            } else {
                interaction.reply({ embeds: [socialMediaNotFound]});
            }
        });
    }
    

    if (commandName === 'twitter') {
        db.get('SELECT twitter, creator_content_name FROM redes_sociales WHERE usuario_id = ?', usuarioId, (err, row) => {
            if (err) {
                console.error('Error al consultar la base de datos:', err);
                return;
            }
    
            if (row && row.twitter && row.creator_content_name) {
                const twitter = row.twitter;
                const creator_content_name = row.creator_content_name;
                const embed = new EmbedBuilder()
                    .setTitle(':bird: **Twitter** :bird:')
                    .setDescription(`Twitter:  \n**${twitter}**`)
                    .setColor('#1DA1F2')
                    .setFooter({ text: 'Creado por: aike.petunia', iconURL: 'https://aikepetunia.github.io/Aike/images/888_sin_titulo_20230227183052.png' });
    
                interaction.reply({ embeds: [embed] });
            } else {
                interaction.reply({ embeds: [socialMediaNotFound]});
            }
        });
    }
    

    if (commandName === 'instagram') {
        db.get('SELECT instagram, creator_content_name FROM redes_sociales WHERE usuario_id = ?', usuarioId, (err, row) => {
            if (err) {
                console.error('Error al consultar la base de datos:', err);
                return;
            }
    
            if (row && row.instagram && row.creator_content_name) {
                const instagram = row.instagram;
                const creator_content_name = row.creator_content_name;
                const embed = new EmbedBuilder()
                    .setTitle(':camera_with_flash: **Canal de Instagram** :camera_with_flash:')
                    .setDescription(`Instagram: \n**${instagram}**`)
                    .setColor('#E1306C')
                    .setFooter({ text: 'Creado por: aike.petunia', iconURL: 'https://aikepetunia.github.io/Aike/images/888_sin_titulo_20230227183052.png' });
    
                interaction.reply({ embeds: [embed] });
            } else {
                interaction.reply({ embeds: [socialMediaNotFound]});
            }
        });
    }
    

    if (commandName === 'twitch') {
        db.get('SELECT twitch, creator_content_name FROM redes_sociales WHERE usuario_id = ?', usuarioId, (err, row) => {
            if (err) {
                console.error('Error al consultar la base de datos:', err);
                return;
            }
    
            if (row && row.twitch && row.creator_content_name) {
                const twitch = row.twitch;
                const creator_content_name = row.creator_content_name;
                const embed = new EmbedBuilder()
                    .setTitle(':purple_heart: **Canal de Twitch** :purple_heart:')
                    .setDescription(`El canal de Twitch: \n**${twitch}**`)
                    .setColor('#6441A4')
                    .setFooter({ text: 'Creado por: aike.petunia', iconURL: 'https://aikepetunia.github.io/Aike/images/888_sin_titulo_20230227183052.png' });
    
                interaction.reply({ embeds: [embed] });
            } else {
                interaction.reply({ embeds: [socialMediaNotFound]});
            }
        });
    }

    if (commandName === 'borrar_redes') {
        const sqlDelete = 'DELETE FROM redes_sociales WHERE usuario_id = ?';
      
        db.run(sqlDelete, [usuarioId], function (err) {
          if (err) {
            console.error('Error al eliminar las redes sociales:', err);
            interaction.reply('Ocurrió un error al eliminar las redes sociales.');
          } else {
            if (this.changes > 0) {
              interaction.reply('Se han eliminado las redes sociales asociadas al usuario. Puedes configurar todo de nuevo');
            } else {
              interaction.reply('Parece que ya has borrado todas las redes sociales...');
            }
          }
        });
      }      
    }
   