const { EmbedBuilder } = require('discord.js');

module.exports = {
    name: "guildMemberAdd",
    once: false,
    async execute(client, member) {
        // ▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬[Bienvenue]▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬
        const channelID = Array.isArray(client.config.channel) ? client.config.channel : [client.config.channel];
        const salon = channelID
            .map(id => client.channels.cache.get(id))
            .filter(ch => ch);

        if (salon.length > 0) {
            const welcomeEmbed = new EmbedBuilder()
                .setColor('#2B2D31')
                .setTitle('`🌌`・Welcome')
                .setAuthor({ name: member.user.tag, iconURL: member.user.displayAvatarURL() })
                .setDescription(`*Bienvenue sur **\`${member.guild.name}\`** ${member} !*\nNous sommes maintenant **${member.guild.memberCount}** membres sur le serveur.`)
                .setFooter({ text: `${member.guild.name}`, iconURL: member.guild.iconURL() });

            await Promise.all(
                salon.map(ch => ch.send({ embeds: [welcomeEmbed] }).catch(() => {}))
            );
        }

        // ▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬[Ghost - Ping]▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬
        if (!Array.isArray(client.config.ghost) || client.config.ghost.length === 0) return;

        const salonghost = client.config.ghost
            .map(id => client.channels.cache.get(id))
            .filter(ch => ch);

        salonghost.forEach(channel => {
            channel.send(`${member}`)
                .then(msg => setTimeout(() => msg.delete().catch(() => {}), 500))
                .catch(() => {});
        });
    }
};
