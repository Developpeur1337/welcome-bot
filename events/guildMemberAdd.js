const { EmbedBuilder } = require('discord.js');
const config = require('../config.json');

module.exports = {
  name: "guildMemberAdd",
  once: false,
  async execute(client, member) {
    const ids = Array.isArray(config.channel) ? config.channel : [config.channel];

    const channels = ids
      .map(id => client.channels.cache.get(id))
      .filter(channel => channel != null);

    for (const channel of channels) {
      const welcomeEmbed = new EmbedBuilder()
        .setColor('#2B2D31')
        .setTitle('`🌌`・Welcome')
        .setAuthor({ name: member.user.tag, iconURL: member.user.displayAvatarURL() })
        .setDescription(`*Bienvenue sur **\`${member.guild.name}\`** ${member} !*\nNous sommes maintenant **${member.guild.memberCount}** membres sur le serveur.`)
        .setFooter({ text: `${member.guild.name}`, iconURL: member.guild.iconURL() });

      await channel.send({ embeds: [welcomeEmbed] }).catch(() => {});
    }
  }
};
