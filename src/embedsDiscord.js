const { Client, REST, Routes, GatewayIntentBits, Message, MessageEmbed,  EmbedBuilder, Intents} = require('discord.js');

const client = new Client({
	intents: [
		GatewayIntentBits.Guilds,
		GatewayIntentBits.GuildMessages,
		GatewayIntentBits.MessageContent,
		GatewayIntentBits.GuildMembers,
	],
})

module.exports = function embeds(interaction) {
    
    if (!interaction || !interaction.commandName) {
        return;
      }
    
      if (interaction.commandName === 'ayuda') {
        const ayuda = new EmbedBuilder()
          .setColor('#6441A4')
          .setTitle('🚀 StreamBoost IDK')
          .setURL('https://aikepetunia.github.io/Aike/')
          .setAuthor({ name: 'Stream Boost', iconURL: 'https://cdn.discordapp.com/avatars/1111714229913915476/d1671a31c164347189dcd97889ea772c.png?size=2048', url: 'https://aikepetunia.github.io/Aike/' })
          .setDescription('¡Hey! Si es la *primera vez que me usas*, prueba poner `/setup`!')
          .setThumbnail('https://www.google.com/url?sa=i&url=https%3A%2F%2Ficon-library.com%2Ficon%2Fcommand-icon-4.html&psig=AOvVaw16n3ZcxrrpGZIR1nZM58Jm&ust=1686889058966000&source=images&cd=vfe&ved=0CBEQjRxqFwoTCKC1ksq1xP8CFQAAAAAdAAAAABAg')
          .addFields(
            { name: '🔍 ¿En qué ayudo?', value: 'Voy a ***potenciar tu camino*** como creador de contenido al **máximo**, *ayudándote*. Si recién comienzas, prueba colocar el comando `/setup`.', inline: true }
          )
          .setTimestamp()
          .setFooter({ text: 'Created By: aike.petunia', iconURL: 'https://aikepetunia.github.io/Aike/images/888_sin_titulo_20230227183052.png' });
        
        interaction.reply({ embeds: [ayuda] });
      }
      

    if (interaction.commandName === 'setup') {
      const setup = new EmbedBuilder()
        .setColor('#6441A4')
        .setTitle('Preparemos todo 🌟')
        .setURL('https://aikepetunia.github.io/Aike/') // Imagen de la derecha, chikita
        .setAuthor({ name: 'Stream Boost', iconURL: 'https://cdn.discordapp.com/avatars/1111714229913915476/d1671a31c164347189dcd97889ea772c.png?size=2048', url: 'https://aikepetunia.github.io/Aike/' })
        .setDescription('Soy un bot hecho para ayudarte como streamer, moderación y más! 🤖')
        .setThumbnail('https://pbs.twimg.com/media/F0jlbtoXoAI8PYo?format=jpg&name=small')
        .addFields(
          { name: '\u200B', value: '\u200B' },
          { name: '**Streaming**', value: 'Usa el comando `/streaming` para que te ayude en la creación de contenido  🎥.', inline: true },
          { name: '**Moderación**', value: 'Usa el comando `/moderation` para ver todos los comandos de moderación', inline: true },
          { name: '**Otros**', value: 'Usa el comando `/otros` para ver qué agregados tengo como bot.', inline: true },
        )
        .setFooter({ text: 'Created By: aike.petunia', iconURL: 'https://aikepetunia.github.io/Aike/images/888_sin_titulo_20230227183052.png' });
    
      interaction.reply({ embeds: [setup] });
    }

    if (interaction.commandName === 'moderation') {
      const moderation = new EmbedBuilder()
        .setColor('#6441A4')
        .setTitle('🔨 Comandos de Moderación')
        .setURL('https://aikepetunia.github.io/Aike/')
        .setAuthor({ name: 'StreamBoost IDK', iconURL: 'https://cdn.discordapp.com/avatars/1111714229913915476/d1671a31c164347189dcd97889ea772c.png?size=2048', url: 'https://discord.js.org' })
        .setDescription('***Ten en cuenta:***\nLas sanciones por tiempo tienen un **tope de tiempo de 35000 minutos** (24 días), si te excedes del límite, la sanción será temporalmente de 1 segundo.\n***La razón no es obligatoria***, y si no se especifica solo dirá "usuario sancionado".')
        .addFields(
          { name: '🔨 Comando -> `/mod_ban`', value: 'El baneo es una expulsión permanente al usuario.\nComando: `/mod_ban {nombre_del_usuario} {Razón_del_Baneo}`.' }
        )
        .addFields(
          { name: '🕒 Comando -> `/mod_softban`', value: 'El SoftBan banea temporalmente.\nComando: `/mod_softban {nombre_del_usuario} {Tiempo_del_baneo_en_MINUTOS} {Razón_del_Baneo}.`' }
        )
        .addFields(
          { name: '🔓 Comando -> `/mod_unban`', value: 'Desbanea al usuario.\nComando: `/mod_unban {nombre_del_usuario}`.' }
        )
        .addFields(
          { name: '👢 Comando -> `/mod_kick`', value: 'Expulsa al usuario, podrá entrar de nuevo tras la expulsión.\nComando: `/mod_kick {nombre_del_usuario} {Razón_de_la_expulsión}`.' }
        )
        .addFields(
          { name: '🔇 Comando -> `/mod_mute`', value: 'Silencia al usuario.\nComando: `/mod_mute {nombre_del_usuario} {Tiempo_del_muteo_en_MINUTOS} {Razón_del_muteo}`.' }
        )
        .addFields(
          { name: '🔊 Comando -> `/mod_unmute`', value: 'Desmutea al usuario.\nComando: `/mod_unmute {nombre_del_usuario} {Razón_del_muteo}`.' }
        )
        .setFooter({ text: 'Created By: aike.petunia', iconURL: 'https://aikepetunia.github.io/Aike/images/888_sin_titulo_20230227183052.png' });
      
      interaction.reply({ embeds: [moderation] });
    }
    

  if (interaction.commandName === 'streaming') {
    const streaming = new EmbedBuilder()
    .setTitle('Comandos para potenciar tu camino como Creador de Contenido')
    .setDescription('Aquí están los comandos disponibles:')
    .setColor('random')
    .addFields({
      name: 'Comandos de moderación', 
      value: 'Some random value', 
      inline: true
    }) //////////////////////////////////////////////////////////////////////////////////
    .setFooter({ text: 'Created By: aike.petunia', iconURL: 'https://aikepetunia.github.io/Aike/images/888_sin_titulo_20230227183052.png' });
    interaction.reply({ embeds: [streaming]})
  }


    if (interaction.commandName === 'redes') {
        const redes = new EmbedBuilder()
            .setColor(0x0099FF)
            .setTitle('Redes Sociales de {nombre lmao}')
            .setDescription('Instagram, tik tok, twitter, youtube, twitch')
            .setThumbnail('') /// Icono de arriba a la derecha
            .addFields({ name: 'REDESS', value: '***Twitch: https://www.twitch.tv/ \nYoutube Principal: https://www.youtube.com/ \nTwitter: https://twitter.com/ \nInstagram: https://www.instagram.com/ ', inline: true })
            .setTimestamp()
            .setFooter({ text: 'Created By: aike.petunia', iconURL: 'https://aikepetunia.github.io/Aike/images/888_sin_titulo_20230227183052.png' });
        
        interaction.reply({ embeds: [redes] });
    }
  } //////////////////////////////////////////////////////////////////////////////////
  
