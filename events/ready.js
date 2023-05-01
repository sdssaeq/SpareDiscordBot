const {REST} = require('@discordjs/rest');
const {Routes} = require('discord-api-types/v9'); 
require('dotenv').config()

module.exports={
    name: "ready",
    execute (client,commands){
    client.user.setPresence({activities: [{name: "\n/help to see commands",type:"LISTENING"}]})
    console.log(`Logged in as ${client.user.tag}!`)

    const CLIEND_ID = client.user.id
    const rest = new REST({
      version: "9"
    }).setToken(process.env.TOKEN);

    (async ()=>{
      try {
          if (process.env.ENV === "production"){
          await rest.put(Routes.applicationCommands(CLIEND_ID),{ body: commands})
          console.log("Sucess Regist Global commands")
        }else{
          await rest.put(Routes.applicationGuildCommands(CLIEND_ID, process.env.GUILD_ID),{ body: commands});
          console.log("Sucess Regist Local commands")  
        }
      } catch (err) {
          if (err) console.error(err)
      }
    })()
    }
}