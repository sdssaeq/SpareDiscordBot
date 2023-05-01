const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js')
if (process.platform === "win32"){
    console.log(__dirname)
    CURRENTDIR = '../'
   }else if(process.platform === "linux"){
       console.log(__dirname)
       CURRENTDIR = '../../'
   }
const Datas = require(CURRENTDIR+'model/playerSchema')

module.exports={
    data: new SlashCommandBuilder()
        .setName("setuser")
        .setDescription('Set Your Growid in Growtopia')
        .addStringOption(option => 
            option.setName('player')
                    .setDescription('Regist Player In DataBase')
                    .setRequired(true)),
            
        async execute(interaction){
            const datas = await Datas.findOne({ discordid: { $eq: interaction.user.id }})
            const usernames = await Datas.findOne({ namaplayer: { $eq: interaction.options.getString('player').toUpperCase() }})
            if (usernames){
                interaction.reply({ content: `${interaction.options.getString('player').toUpperCase()} UDAH ADA TOLOL! ` ,ephemeral: true});
                return
            }

            if (!datas) {
                    await Datas.create({
                    discordid: interaction.user.id,
                    namaplayer: interaction.options.getString('player').toUpperCase(),
                    namabarang: 'World Lock',
                    jumlah: 0
                })
                interaction.reply({ content: `ADDED GROWID SET TO ${interaction.options.getString('player').toUpperCase()}` ,ephemeral: true});
                return
            }
            await Datas.findOneAndUpdate({discordid: interaction.user.id },{ namaplayer: interaction.options.getString('player').toUpperCase()})
             const embed = new MessageEmbed()
            .setColor('#0099ff')
            .setTitle(`GROWID SET TO ${interaction.options.getString('player').toUpperCase()}`)
            await interaction.reply({ embeds: [ embed ] ,ephemeral: true});
    }
}