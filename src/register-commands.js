var TOKEN = "MTExMTcxNDIyOTkxMzkxNTQ3Ng.G8cnzT.rMZVbbsTB3XCVAYuVpOiZlUwGDbvLabvTRIOh4"
var GUILD_ID = "1099375271368462376"
var CLIENT_ID = "1111714229913915476"
var TWITCH_API_ID = "zqqt7rm578kmy3xfwbkg7hszv8dyvj"
var TWITCH_SECRET_ID = "f4u95gh9eyjzweay4udye4pddymy6r"

const { REST, Routes, ApplicationCommandOptionType } = require('discord.js');

const commands = [
  { 
    name: 'setup', ///
    description: 'Para empezar a usarme, te guiaré paso por paso para poner todo en orden :).' /// q envie un embed asi q explique los commands
  },
  {
    name: 'ayuda', ///
    description: 'Te muestro de lo que soy capaz. Todos los comandos', /// como nekotina
  },
  {
    name: 'otros', /// ?
    description: 'Mis otras capacidades',
  },
  {
    name: 'moderation', /// 
    description: 'Toda la moderación que necesitaras, baneos, muteos, etc.',
  },
  {
    name: 'mod_ban',
    description: 'Banea al usuario.',
    options: [
      {
        name: 'usuario',
        description: '@ Usuario al que se le sancionará',
        type: ApplicationCommandOptionType.User,
        required: true
      },
      {
        name: 'razon',
        description: 'Razón del por que de la sancion.',
        type: ApplicationCommandOptionType.String
      }
    ]
  },
  {
    name: 'mod_mute',
    description: 'Silencia al usuario por un periodo',
    options: [
      {
        name: 'usuario',
        description: '@ Usuario al que se le sancionará',
        type: ApplicationCommandOptionType.User,
        required: true
      },
      {
        name: 'razon',
        description: 'Razón del por que de la sancion.',
        type: ApplicationCommandOptionType.String
      },
      {
        name: 'tiempo',
        description: 'Tiempo en minutos de la sancion. Max: 35000 Minutos (24 días)',
        type: ApplicationCommandOptionType.String
      }
    ]
  },
  {
    name: 'mod_unmute',
    description: 'Desmutea al usuario sancionado',
    options: [
      {
        name: 'usuario',
        description: '@ Usuario al que se le sancionará',
        type: ApplicationCommandOptionType.User,
        required: true
      },
      {
        name: 'razon',
        description: 'Razón del por que de la sancion.',
        type: ApplicationCommandOptionType.String
      }
    ]
  },
  {
    name: 'mod_kick',
    description: 'Kickea al usuario.',
    options: [
      {
        name: 'usuario',
        description: '@ Usuario al que se le sancionará',
        type: ApplicationCommandOptionType.User,
        required: true
      },
      {
        name: 'razon',
        description: 'Razón del por que de la sancion.',
        type: ApplicationCommandOptionType.String
      }
    ]
  },
  {
    name: 'mod_softban',
    description: 'Baneo temporal a un usuario.',
    options: [
      {
        name: 'usuario',
        description: '@ Usuario al que se le sancionará',
        type: ApplicationCommandOptionType.User,
        required: true
      },
      {
        name: 'razon',
        description: 'Razón del por que de la sancion.',
        type: ApplicationCommandOptionType.String
      },
      {
        name: 'tiempo',
        description: 'Tiempo en minutos de la sancion. Max: 35000 Minutos (24 días)',
        type: ApplicationCommandOptionType.String,
      }
    ]
  },
  {
    name: 'mod_unban',
    description: 'Desbanea al usuario',
    options: [
      {
        name: 'usuario',
        description: '@ Usuario al que se le sancionará',
        type: ApplicationCommandOptionType.User,
        required: true
      },
    ]
  },
  {
    name: 'streaming',
    description: 'Todo los comandos para poner tu empezar tu camino.'
  },
  {
    name: 'tiktok',
    description: 'El canal de tiktok del Creador de contenido',
  },
  {
    name: 'twitch',
    description: 'El canal de twitch del Creador de contenido',
  },
  {
    name: 'instagram',
    description: 'El canal de instagram del Creador de contenido',
  },
  {
    name: 'twitter',
    description: 'El canal de twitter del Creador de contenido',
  },
  {
    name: 'youtube',
    description: 'El canal de youtube del Creador de contenido',
  },
  {
    name: 'borrar_redes',
    description: 'Este comando borrara TODAS las redes sociales para que configures de nuevo.'
  },
  {
  name: 'configurar_redes',  ///
  description: 'Redes Sociales que colocarás para promocionarte, Twitch, Youtube, Instagram, Twitter, etc.',
  options: [
    {
      name: 'nombre',
      description: 'Coloca tu nombre que tienes como creador de contenido',
      type: ApplicationCommandOptionType.String,
      required: true
    },
    {
      name: 'youtube',
      description: 'Inserta el Link directo.',
      type: ApplicationCommandOptionType.String,
    },
    {
      name: 'twitch',
      description: 'Inserta el Link directo.',
      type: ApplicationCommandOptionType.String,
    },
    {
      name: 'instagram',
      description: 'Inserta el Link directo.',
      type: ApplicationCommandOptionType.String,
    },
    {
      name: 'twitter',
      description: 'Inserta el Link directo.',
      type: ApplicationCommandOptionType.String,
    },
    {
      name: 'tiktok',
      description: 'Inserta el Link directo.',
      type: ApplicationCommandOptionType.String,
    },
  ]
  },
  {
    name: 'join',
    description: 'musica owo'
  },
  
];

const rest = new REST({ version: '10' }).setToken(TOKEN);

(async () => {
  try {
    console.log('Registrando comandos de barra');

    await rest.put(
      Routes.applicationGuildCommands(
        CLIENT_ID,
        GUILD_ID
      ),
      { body: commands }
    );

    console.log('Comandos de barra registrados con exito');
  } catch (error) {
    console.log(`Error o horror: ${error}`);
  }
})();