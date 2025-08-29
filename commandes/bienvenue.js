const fs = require("fs");
const { SlashCommandBuilder } = require("discord.js");

module.exports = {
    name: "bienvenue",
    description: "Gérer les salons de message de bienvenue",
    botOwner: true,
    async executeSlash(client, interaction) {
        const sub = interaction.options.getSubcommand();
        const channel = interaction.options.getChannel("channel");

        client.config.channel = client.config.channel || [];

        if (sub === "list") {
            return interaction.reply({
                embeds: [{
                    title: "`📬`・Salons De Bienvenue",
                    color: 0xFF0000,
                    description: client.config.channel.length > 0
                        ? client.config.channel.map((id, i) => `\`${i + 1}\` - <#${id}> | \`${id}\``).join("\n")
                        : "Aucun salon configuré"
                }],
                ephemeral: true
            });
        }

        if (!channel) return interaction.reply({ embeds: [{ color: 0xFF0000, description: "<:990not:1371830095391756379>・Veuillez mentionner un salon." }], ephemeral: true });

        if (sub === "add") {
            if (client.config.channel.includes(channel.id)) return interaction.reply({ embeds: [{ color: 0xFF0000, description: `<:990not:1371830095391756379>・<#${channel.id}> est déjà ajouté.` }], ephemeral: true });
            client.config.channel.push(channel.id);
            fs.writeFileSync("./config.json", JSON.stringify(client.config, null, 4), "utf8");
            return interaction.reply({ embeds: [{ color: 0x00FF00, description: `<:990yyes:1371830093252399196>・<#${channel.id}> a été ajouté aux salons de bienvenue.` }], ephemeral: true });
        }

        if (sub === "remove") {
            if (!client.config.channel.includes(channel.id)) return interaction.reply({ embeds: [{ color: 0xFF0000, description: `<:990not:1371830095391756379>・<#${channel.id}> n'est pas dans la liste.` }], ephemeral: true });
            client.config.channel = client.config.channel.filter(id => id !== channel.id);
            fs.writeFileSync("./config.json", JSON.stringify(client.config, null, 4), "utf8");
            return interaction.reply({ embeds: [{ color: 0x00FF00, description: `<:990yyes:1371830093252399196>・<#${channel.id}> a été retiré des salons de bienvenue.` }], ephemeral: true });
        }
    },

    get data() {
        return new SlashCommandBuilder()
            .setName("bienvenue")
            .setDescription("Gérer les salons de message de bienvenue")
            .addSubcommand(sc => sc
                .setName("add")
                .setDescription("Ajouter un salon")
                .addChannelOption(o => o.setName("channel").setDescription("Salon à ajouter").setRequired(true))
            )
            .addSubcommand(sc => sc
                .setName("remove")
                .setDescription("Supprimer un salon")
                .addChannelOption(o => o.setName("channel").setDescription("Salon à supprimer").setRequired(true))
            )
            .addSubcommand(sc => sc
                .setName("list")
                .setDescription("Afficher la liste des salons")
            );
    }
};
