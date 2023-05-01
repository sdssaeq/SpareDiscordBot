const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js')
const Datas = require('../model/playerSchema')

module.exports={
    data: new SlashCommandBuilder()
        .setName("balance")
        .setDescription('Check Balance!'),
            
        async execute(interaction){
            const datas = await Datas.findOne({ discordid: { $eq: interaction.user.id }})
            if (!datas) {
                interaction.reply({ content: `Set Growid /setuser <namabot>` ,ephemeral: true});
                return
            }
            let JsonStringfy = await JSON.stringify(datas)
            let JsonRill = await JSON.parse(JsonStringfy)
             const embed = new MessageEmbed()
            .setColor('#0099ff')
            .setTitle(`Saldo Di Bank ${interaction.guild.name}`)
            .setAuthor({ name: interaction.user.username, iconURL: interaction.user.displayAvatarURL()})
            .addField('\u200b', `**${JsonRill.jumlah.toString()}** ${process.env.WL}`, true)
            .setImage(process.env.GAMBARBANNER)
            .setTimestamp()
            .setFooter({ text: `Requested by ${interaction.user.username}`,iconURL: interaction.user.displayAvatarURL()});
        
            await interaction.reply({ embeds: [ embed ] ,ephemeral: false});
    }
}