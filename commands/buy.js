const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js')
const Rdp = require('../model/rdpSchema')
const Datas = require('../model/playerSchema')
const History = require('../model/historySchema');

module.exports={
    data: new SlashCommandBuilder()
        .setName("buy")
        .setDescription('Buy Here!')
        .addStringOption(option => option
            .setName("kode")
            .setDescription('Tipe Produk')
            .setRequired(true)
            ),
        async execute(interaction){
            const IsHave = await Datas.findOne({ discordid: { $eq: interaction.user.id }})

            if(!IsHave){
                interaction.reply({ content: `Maaf Kamu Belum Setuser Growid /setuser (namabot)` ,ephemeral: true});
                return
            }
            const datas = await Rdp.findOne(
            {type: interaction.options.getString("kode").toUpperCase()}
            )
            const datas2 = await Rdp.findOne(
                {type: interaction.options.getString("kode").toUpperCase()},{data:1,_id:0}
            )

            const bal = await Datas.findOne({ discordid: { $eq: interaction.user.id }})
            if (!datas) {
                interaction.reply({ content: `Kode Tidak ditemukan cari di /stok` ,ephemeral: true});
                return
            }
            let JsonStringfy = await JSON.stringify(datas)
            let JsonRill = await JSON.parse(JsonStringfy)

            let JsonStringfy1 = await JSON.stringify(datas2)
            let JsonRill1 = await JSON.parse(JsonStringfy1)

            if(JsonRill.data.length === 0 ){
                interaction.reply({ content: `Stock **${JsonRill.nama}** Habis` ,ephemeral: true});
                return
            }
            let JsonBalance = await JSON.stringify(bal)
            let JsonRill2 = await JSON.parse(JsonBalance)
            const totalwl = await JsonRill2.jumlah.toString()

            if(totalwl < JsonRill.harga){
                interaction.reply({ content: `${process.env.WL} Kurang ${totalwl-JsonRill.harga} ` ,ephemeral: true});
                return
            }
            await interaction.reply(`DATA SEND TO DM`);
            
            await Rdp.updateOne(
                { type: interaction.options.getString("kode").toUpperCase() },
                { $pop: { data: -1 } }
            );
            
            await Datas.findOneAndUpdate({discordid: interaction.user.id},{ $inc: { jumlah: -JsonRill.harga} })
            const embed = new MessageEmbed()
            .setColor('#0099ff')
            .setTitle(`${process.env.WL} : ${totalwl-JsonRill.harga}`)
            .setAuthor({ name: interaction.user.username, iconURL: interaction.user.displayAvatarURL()})
            .setTimestamp()
            .setFooter({ text: `Requested by ${interaction.user.username}`,iconURL: interaction.user.displayAvatarURL()})
            .addField(`Berhasil Membeli **${JsonRill.nama}**\nDengan Harga : **${JsonRill.harga}** ${process.env.WL}\n`, `\u200b`, false)
            for (var key in JsonRill1.data[0]) {
                
                embed.addField(`**${key.toUpperCase()}** : ||${JsonRill1.data[0][key]}||`,`\u200b`, false)
            }
            embed.setImage(process.env.GAMBARBANNER)

            const ToHistory = JSON.stringify(JsonRill1.data[0]);
            
            await interaction.user.send({ embeds: [ embed ] ,ephemeral: true});
            if (interaction.member.roles.cache.has(process.env.NAME_ROLE_TOBUYER) === false ){
            await interaction.member.roles.add(process.env.NAME_ROLE_TOBUYER);
            }
        
              IsCount = await History.findOne({ no: { $eq: 0 }})
              if (!IsCount){
                await History.create({
                    no: 0,
                    discordid: 1,
                    namaplayer: "null",
                    typebarang: "null",
                    namabarang: "null",
                    hargabarang: 1,
                    data: "null",
                    jumlah: 1
                })
              }
            countsz = await History.aggregate([
                {
                  $group : 
                  {
                    _id : "",
                    last : 
                    {
                      $max : "$no"
                    }
                  }
                }]
            )
            const dogshit = new MessageEmbed()
            .setColor('#0099ff')
            .setTitle(`${process.env.ARROW} **#Order Number** : ${countsz[0].last+1}`)
            .setTimestamp()
            .setFooter({text: "Time"})
            .addField('\u200b', `${process.env.ARROW} Member : **${"<@" + interaction.user.id + ">"}**\n${process.env.ARROW} Kode Produk : **${interaction.options.getString("kode").toUpperCase()}** \n${process.env.ARROW} Berhasil Membeli **${JsonRill.nama}**\n${process.env.ARROW} Dengan Harga : **${JsonRill.harga}** ${process.env.WL}\n`, true)
            .setImage(process.env.GAMBARBANNER)
            await interaction.guild.channels.cache.get(process.env.HISTORY_CHANNEL).send({embeds: [dogshit],ephemeral: false})
            dataz = await Datas.findOne({ discordid: { $eq: interaction.user.id }});
            
            await History.create({
                no: countsz[0].last+1,
                discordid: interaction.user.id,
                namaplayer: dataz.namaplayer,
                typebarang: interaction.options.getString("kode").toUpperCase(),
                namabarang: JsonRill.nama,
                hargabarang: JsonRill.harga,
                data: ToHistory,
                jumlah: 1
            })

    }
}