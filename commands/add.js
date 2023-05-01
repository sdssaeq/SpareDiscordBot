const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js')
if (process.platform === "win32"){
 console.log(__dirname)
 CURRENTDIR = '../'
}else if(process.platform === "linux"){
    console.log(__dirname)
    CURRENTDIR = '../../'
}
const Rdp = require(CURRENTDIR+'model/rdpSchema')
const Datas = require(CURRENTDIR+'model/playerSchema')

module.exports={
    data: new SlashCommandBuilder()
        .setName("add")
        .setDescription('Tambah Data')
        .addStringOption(option => option
            .setName("kode")
            .setDescription('Tambah Kode')
            .setRequired(true)
            )
        .addStringOption(option => option
                .setName("username")
                .setDescription('Tambah Username')
                .setRequired(true)
                ).addStringOption(option => option
                    .setName("password")
                    .setDescription('Tambah Password')
                    .setRequired(true)
                    ),
            
            
        async execute(interaction){
            if (interaction.member.roles.cache.has(process.env.OWNERID) === false ){
                await interaction.reply({ content: "No Admin Role" ,ephemeral: true});
		        console.log(interaction.user.username + " : Role Owner :" +interaction.member.roles.cache.has(process.env.OWNERID))
		        console.log(interaction.user.username + " : Role CO Owner :" +interaction.member.roles.cache.has(process.env.OWNERID))
                return;
            }else{
                const TambahBarangCid = await Rdp.updateOne(
                    { 'type': interaction.options.getString("kode").toUpperCase()},
                        { $push: { 'data': {$each:[
                    {Username:`${interaction.options.getString("username")}`,Password:`${interaction.options.getString("password")}`},
                ],$slice: -100} } },
                );

                const embed = new MessageEmbed()
                .setColor('RANDOM')
                .setTitle(`INFO\nAdded\n`)
                .setAuthor({ name: interaction.user.username, iconURL: interaction.user.displayAvatarURL()})
                .addField('\u200b',`**KODE**   : ${interaction.options.getString("kode").toUpperCase()}\n**Username**   : ${interaction.options.getString("username")} \n**Password**    : ${interaction.options.getString("password")}`, true)
                .setTimestamp()
                .setFooter({ text: `Requested by ${interaction.user.username}`,iconURL: interaction.user.displayAvatarURL()});
                
                TambahBarangCid;
                await interaction.reply({ 
                    embeds: [embed],
                    ephemeral: true
                });
            }
    }
}