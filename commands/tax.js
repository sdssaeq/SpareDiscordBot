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
const Keys = require(CURRENTDIR+'model/keySchema');

module.exports={
    data: new SlashCommandBuilder()
        .setName("tax")
        .setDescription('Update Date!')
        .addStringOption(option => option
            .setName("key")
            .setDescription('Update Date Keys!')
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

            if(totalwl < 499){
                interaction.reply({ content: `${process.env.WL} Kurang ${totalwl-500} ` ,ephemeral: true});
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

                Date.prototype.addDays = function (days) {
                    const date = new Date(this.valueOf())
                    date.setDate(date.getDate() + days)
                    return date
                }

                const product = await Keys.findById(interaction.options.getString("key").toLowerCase()).select({"dateExpired":1,"dateAdded":1,"_id":0});
                if(Object.keys(product.toObject()).length === 0){
                    const date = new Date(); //current date
                    const now = date; // GMT + 7 JAKARTA TIME
                    const date2 = date.addDays(30) // + 30 DAYS DATE REGISTERED DAY
                    await Keys.updateOne({_id: interaction.options.getString("key").toUpperCase()}, {$set: {dateAdded: now,dateExpired:date2}});
                    await interaction.reply(`${interaction.user.username} Date Updated 30 Days`);
                    await Datas.findOneAndUpdate({discordid: interaction.user.id},{ $inc: { jumlah: -500} })
                }else{
                    const date = new Date(product.dateExpired); //current date
                    const now = date; // GMT + 7 JAKARTA TIME
                    const date2 = date.addDays(30) // + 30 DAYS DATE REGISTERED DAY
                    await Keys.updateOne({_id: interaction.options.getString("key").toUpperCase()}, {$set: {dateAdded: now,dateExpired:date2}});
                    await interaction.reply(`${interaction.user.username} Date Updated 30 Days`);
                    await Datas.findOneAndUpdate({discordid: interaction.user.id},{ $inc: { jumlah: -500} })
                }

    }
}