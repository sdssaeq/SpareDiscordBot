const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName("echo")
        .setDescription('Echo Ur MSG HERE!!')
        .addStringOption((option) =>
        option
            .setName('msg')
            .setDescription('msg to echo')
            .setRequired(true)
        ),
        async execute(interaction){
            interaction.reply({
                content: `**${interaction.user.username}** \nMSG: **${interaction.options.getString("msg")}**`,
                ephemeral: false
            })
        }
}