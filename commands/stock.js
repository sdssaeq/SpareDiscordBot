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

module.exports={
    data: new SlashCommandBuilder()
        .setName("stock")
        .setDescription('Stock Shop Here!'),
            
        async execute(interaction){
            const findalltypebarang = await Rdp.aggregate([{$group:{_id: "$typebarang",count: { $count : {} }}},{"$sort": {_id: 1}}])    
            async function jsonParsing(datas){
                const toJsons = await JSON.stringify(datas)
                const finals = await JSON.parse(toJsons)
                return finals
            }

            async function setFindByType(matchtipe){
                const datas = await Rdp.aggregate([{$match : { typebarang : matchtipe }},{$project:{_id: 0,sum: 1, typebarang:"$typebarang",namatipe:"$type",desc:"$nama",harga:"$harga",stok:{$size:"$data"}}},{"$sort": {namatipe: 1}}])
                const JsonRill = await jsonParsing(datas)
                return JsonRill
            }          
            
            const tipebarang = await jsonParsing(findalltypebarang)

            const TCID = await setFindByType("PRODUCTS")
            console.log(tipebarang) 
            
            const ShopRdp = new MessageEmbed()
            .setColor('#0099ff')
            .setTitle(`**LIST PRODUCTS**`)
            .setAuthor({ name: interaction.user.username, iconURL: interaction.user.displayAvatarURL()})
            .setTimestamp()
            .setImage(process.env.GAMBARBANNER)
            .setFooter({ text: `Requested by ${interaction.user.username}`,iconURL: interaction.user.displayAvatarURL()});
            for (let i = 0; i < tipebarang[0].count; i++) {
                ShopRdp.addField('\u200b', `${process.env.ARROW} Kode : **${TCID[i].namatipe.toString()}**\n${process.env.ARROW} Nama: **${TCID[i].desc.toString()}**\n${process.env.ARROW} Stok: **${TCID[i].stok.toString()}**\n${process.env.ARROW} Harga: **${TCID[i].harga.toString()}** ${process.env.WL}`, true)
            };
            await interaction.reply({ embeds: [ ShopRdp ] ,ephemeral: false});
    }
}