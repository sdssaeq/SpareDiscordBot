const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js')
module.exports = {
    data: new SlashCommandBuilder()
        .setName("help")
        .setDescription('See Commands in here'),
        async execute(interaction){
            const embed = new MessageEmbed()
            .setColor('#0099ff')
            .setTitle(`Help Command`)
            .setAuthor({ name: interaction.user.username, iconURL: interaction.user.displayAvatarURL()})
            .addField('List Commands', '\n**/SETUSER set akun growtopia\n/STOK Liat List Produk\n/BUY (KODE) Membeli Produk\n/BALANCE Melihat Saldo Akun\n/PING Test Ping\n/ECHO (msg) Bot Follow User**', true)
            .setTimestamp()
            .setImage(process.env.GAMBARBANNER)
            .setFooter({ text: `Requested by ${interaction.user.username}`,iconURL: interaction.user.displayAvatarURL()});
            await interaction.reply({
                embeds: [embed],
                ephemeral: false
            })
        }
}