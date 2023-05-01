const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js')
const Rdp = require('../model/rdpSchema')
const Datas = require('../model/playerSchema')
const History = require('../model/HistorySchema');
const Keys = require('../model/keySchema');

module.exports={
    data: new SlashCommandBuilder()
        .setName("key")
        .setDescription('Update Version!')
        .addStringOption(option => option
            .setName("key")
            .setDescription('Login Keys!')
            .setRequired(true)
            ),
        async execute(interaction){
            const IsHave = await Datas.findOne({ discordid: { $eq: interaction.user.id}})

            if(!IsHave){
                interaction.reply({ content: `Maaf Kamu Belum Setuser Growid /setuser (namabot)` ,ephemeral: true});
                return
            }

            const bal = await Datas.findOne({ discordid: { $eq: interaction.user.id }})
            let JsonBalance = await JSON.stringify(bal)
            let JsonRill2 = await JSON.parse(JsonBalance)
            const totalwl = await JsonRill2.jumlah.toString()

            if(totalwl < 124){
                interaction.reply({ content: `${process.env.WL} Kurang ${totalwl-125} ` ,ephemeral: true});
                return
            }
            
            //console.log(IsKeyAvail);
            try {
                await Keys.findOne({_id: {$eq: interaction.options.getString("key").toLowerCase()}});
              }
              catch(err) {
                interaction.reply({ content: `Key Not Found` ,ephemeral: false});
                return
              }
                await Keys.updateOne({_id: interaction.options.getString("key").toUpperCase()}, {$set: {userkey: "4.23"}});
                await interaction.reply(`${interaction.user.username} Key Updated`);
                await Datas.findOneAndUpdate({discordid: interaction.user.id},{ $inc: { jumlah: -125} })
                await interaction.followUp(`$delete`);
            
    }
}