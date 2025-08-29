const fs = require("fs");
const { SlashCommandBuilder } = require("discord.js");

module.exports = {
    name: "ghostping",
    description: "Gérer les salons de ghostping",
    botOwner: true,
    async executeSlash(client, interaction) {
        const sub = interaction.options.getSubcommand();
        const channel = interaction.options.getChannel("channel");

        client.config.ghost = client.config.ghost || [];

        if (sub === "list") {
            return interaction.reply({
                embeds: [{
                    title: "`👻`・Salons Ghostping",
                    color: 0xFF0000,
                    description: client.config.ghost.length > 0
                        ? client.config.ghost.map((id, i) => `\`${i + 1}\` - <#${id}> | \`${id}\``).join("\n")
                        : "Aucun salon configuré"
                }],
                ephemeral: true
            });
        }

        if (!channel) return interaction.reply({ embeds: [{ color: 0xFF0000, description: "<:990not:1371830095391756379>・Veuillez mentionner un salon." }], ephemeral: true });

        if (sub === "add") {
            if (client.config.ghost.includes(channel.id)) return interaction.reply({ embeds: [{ color: 0xFF0000, description: `<:990not:1371830095391756379>・<#${channel.id}> est déjà ajouté.` }], ephemeral: true });
            client.config.ghost.push(channel.id);
            fs.writeFileSync("./config.json", JSON.stringify(client.config, null, 4), "utf8");
            return interaction.reply({ embeds: [{ color: 0x00FF00, description: `<:990yyes:1371830093252399196>・<#${channel.id}> a été ajouté aux salons ghostping.` }], ephemeral: true });
        }

        if (sub === "remove") {
            if (!client.config.ghost.includes(channel.id)) return interaction.reply({ embeds: [{ color: 0xFF0000, description: `<:990not:1371830095391756379>・<#${channel.id}> n'est pas dans la liste.` }], ephemeral: true });
            client.config.ghost = client.config.ghost.filter(id => id !== channel.id);
            fs.writeFileSync("./config.json", JSON.stringify(client.config, null, 4), "utf8");
            return interaction.reply({ embeds: [{ color: 0x00FF00, description: `<:990yyes:1371830093252399196>・<#${channel.id}> a été retiré des salons ghostping.` }], ephemeral: true });
        }
    },

    get data() {
        return new SlashCommandBuilder()
            .setName("ghostping")
            .setDescription("Gérer les salons de ghostping")
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
