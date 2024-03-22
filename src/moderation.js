const { Client, REST,  GatewayIntentBits, Message, MessageEmbed,  EmbedBuilder, Intents} = require('discord.js');

const client = new Client({
	intents: [
		GatewayIntentBits.Guilds,
		GatewayIntentBits.GuildMessages,
		GatewayIntentBits.MessageContent,
		GatewayIntentBits.GuildMembers,
	],
})

module.exports = async function moderationCommands(interaction) {
    
    const commandName = interaction.commandName;
    const options = interaction.options;
  

  if (commandName === 'mod_ban') {
    const userOption = options.getUser('usuario');
    const reasonOption = options.getString('razon');

    if (!userOption) {
      await interaction.reply('No has puesto el nombre de usuario, por favor, colocalo.');
      return;
    }

    const member = await interaction.guild.members.fetch(userOption);

    if (member) { ///Perma ban
      try {
        await member.ban({ reason: reasonOption || 'Sin razón especificada.' });
        await interaction.reply(`Se ha baneado al ${userOption.tag} de forma permanente, por la razón: ${reasonOption || 'Sin razón especificada'}`);
      } catch (error) {
        console.error(`Error de baneo: ${error} , por favor, réportalo con la desarrolladora aike.petunia en discord`);
        await interaction.reply('No ha sido posible banear al usuario.');
      }
    } else {
      await interaction.reply('No existe el usuario mencionando, verifica haber usado el nombre real y no el apodo.');
    }
  } 
  
  if (commandName === 'mod_unban') {
    const userOption = options.getUser('usuario');
  
    if (!userOption) {
      await interaction.reply('No has especificado el nombre de usuario a desbanear. Por favor, proporciónalo.');
      return;
    }

    const userId = userOption.id;
  
    try {
      await interaction.guild.members.unban(userId);
      interaction.reply(`El usuario ${userOption.username} ha sido desbaneado.`);
    } catch (error) {
      interaction.reply('No se pudo desbanear al usuario. Asegúrate de que el usuario está baneado en el servidor, en el caso contrario, verifica haber usado el nombre real y no el apodo.');
    }
  }
  

  if (commandName === 'mod_softban') {
    const userOption = options.getUser('usuario');
    const reasonOption = options.getString('razon');
    const timeOption = options.getString('tiempo');
  
    if (!userOption) {
      await interaction.reply('No has especificado el nombre de usuario a desbanear. Por favor, proporciónalo.');
      return;
    }
  
    const member = await interaction.guild.members.fetch(userOption);
  
    if (!timeOption) {
      await interaction.reply('Introduce el tiempo que estará baneado el usuario, `***recuerda los parametros que se mencionan en /setup.***`');
      return;
    }
  
    const time = parseInt(timeOption);
  
    if (isNaN(time)) {
      await interaction.reply('Verifica poner un número dentro de términos y sin letras.');
      return;
    }
  
    const softBanDuration = time * 1000 * 60 ; // esto por esto y esto por esto y pam no hay mas milisegundos
    if (member) {
      member.ban({ softBanDuration }).then(() => {
        if (softBanDuration >= 3500000000) {
          interaction.reply("Has ingresado más de 35000 minutos, lo cual no es válido, checa de ingresar un tiempo menor ya que el usuario se sancionara durante 1 segundo por un error no correjible de código.");
        } else if (softBanDuration >= 86400000) {
          const dias = Math.floor(softBanDuration / 86400000);
          const horasRestantes = Math.floor((softBanDuration % 86400000) / 3600000);
          interaction.reply(`El usuario ${userOption.username} se fue sancionado por ${dias} días y ${horasRestantes} horas, por la razón: ${reasonOption || 'Sin razón especificada'}`);
        } else if (softBanDuration >= 3600000) {
          const horas = Math.floor(softBanDuration / 3600000);
          const minutosRestantes = Math.floor((softBanDuration % 3600000) / 60000);
          interaction.reply(`El usuario ${userOption.username} se fue sancionado por ${horas} horas y ${minutosRestantes} minutos, por la razón: ${reasonOption || 'Sin razón especificada'}`);
        } else {
          const minutos = Math.floor(softBanDuration / 60000);
          interaction.reply(`El usuario ${userOption.username} se fue sancionado por ${minutos} minutos, por la razon de ${reasonOption || 'razon no especificada'}.`);
        }
      });
    }
  }  
  
  if (commandName === 'mod_kick') {
    const userOption = options.getUser('usuario');
    const reasonOption = options.getString('razon');
  
    if (!userOption) {
      await interaction.reply('No has especificado el nombre de usuario. Por favor, proporciónalo.');
      return;
    }
  
    const member = await interaction.guild.members.fetch(userOption);
  
    if (member) {
      member.kick(reasonOption || 'Razón no especificada');
      interaction.reply(`El usuario ${userOption.username} ha sido expulsado por la siguiente razón: ${reasonOption || 'Razón no especificada'}.`);
    } else {
      interaction.reply('No se pudo encontrar al usuario especificado en el servidor, en el caso contrario, verifica haber usado el nombre real y no el apodo.');
    }
  }  

    /// MUTES

  if (commandName === 'mod_mute') {
    const mutedRoleName = 'muteado';
    const mutedRole = interaction.guild.roles.cache.find(role => role.name === mutedRoleName);
    const reasonOption = interaction.options.getString('razon');

    if (!mutedRole) {
      interaction.channel.send('Error al crear el rol de "muteado", por favor, créalo tú mismo o bien borra el que tienes, para evitar este error.');
    }   //////////////////////fijate q realmente no tenga permisos el muteado, o q los canales no tengan permisos

    const userOption = interaction.options.getUser('usuario');
    const member = interaction.guild.members.cache.get(userOption.id);
  
    if (member) {
      const timeOption = interaction.options.getString('tiempo') * 1000 * 60; ///ya es minutos, hora y dia meow
      let muteDuration = 0 ;
      
      if (timeOption) {
        const time = parseInt(timeOption);
        if (isNaN(time)) {
          return interaction.reply('pone un tiempo valido, te recuerdo que se son minutos.');
        }
        muteDuration = time;
      } else {
        return interaction.reply('no se ha muteado al user pq no me pusiste el tiempo que estará muteado');
      }
  
      member.roles.add(mutedRole).then(() => {
        if (muteDuration >= 3500000000) {
          replyMessage = ("Has ingresado más de 35000 minutos, y no es posible poner ese tiempo, si lo haces El usuario se silenciará durante 1 segundo. Por favor, ingresa un tiempo menor. ");
        } else if (muteDuration >= 86400000) {
          const dias = Math.floor(muteDuration / 86400000);
          const horasRestantes = Math.floor((muteDuration % 86400000) / 3600000);
          replyMessage = (`El usuario ${userOption.username} fue al calabozo por aproximadamente ${dias} días y ${horasRestantes} horas, por la razón: ${reasonOption || 'Sin razón especificada'} `);
        } else if (muteDuration >= 3600000) {
          const horas = Math.floor(muteDuration / 3600000);
          const minutosRestantes = Math.floor((muteDuration % 3600000) / 60000);
          replyMessage = (`El usuario ${userOption.username} fue al calabozo por aproximadamente ${horas} horas y ${minutosRestantes} minutos, por la razón: ${reasonOption || 'Sin razón especificada'}`);
        } else {
          const minutos = Math.floor(muteDuration / 60000);
          replyMessage = (`El usuario ${userOption.username} fue al calabozo por aproximadamente ${minutos} minutos, por la razón: ${reasonOption || 'Sin razón especificada'}`);
        }

        if (reasonOption) {
          replyMessage += ` Razon: ${reasonOption}`;
        } else {
          replyMessage += ' Razon no especificada.';
        }
        
        interaction.reply(replyMessage);

        setTimeout(() => {
          member.roles.remove(mutedRole).catch(console.error);
        }, muteDuration);
      }).catch(console.error);
    } else {
      interaction.reply('no existe.');
    }
  }

  if (commandName === 'mod_unmute') {
    const user = interaction.options.getUser('usuario');
    const reasonOption = interaction.options.getString('razon');
  
    const mutedRoleName = 'muteado';
    const mutedRole = interaction.guild.roles.cache.find(role => role.name === mutedRoleName);
  
    if (!mutedRole) {
      return interaction.reply('El rol de "muteado" no existe en el servidor.');
    }
  
    const member = interaction.guild.members.cache.get(user.id);
  
    if (!member) {
      return interaction.reply('El usuario no se encuentra en el servidor.');
    }
  
    try {
      await member.roles.remove(mutedRole);
      interaction.reply(`El usuario ${user.username} ha sido desmuteado, por la razón: ${reasonOption || 'Sin razón especificada'}`);
    } catch (error) {
      console.error('Error al desmutear al usuario:', error);
      interaction.reply('Ocurrió un error al desmutear al usuario.');
    }
  }
  
}