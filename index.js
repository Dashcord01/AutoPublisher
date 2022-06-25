const Discord = require("discord.js");
const bot = new Discord.Client();
const app = require('express')()
app.get("/", (req, res) => res.sendStatus(200))
let listener = app.listen(process.env.PORT, () => console.log('[Hosting] - Hosting Website Ready - Host Your Bots Via: https://pingbreak.com ' + listener.address().port));


bot.login(process.env.token);

let queue = {}

bot.on("ready", () => {
    console.log("[Bot] - Bot Gestartet " + bot.user.tag);
    for(let id of config.channels){
        queue[id] = [];
    }
    
    // console.log(queue)

    

    bot.setInterval(run, 3600000)
    // bot.setInterval(run, 45000)
})

bot.on("message", message => {
    if(config.channels.includes(message.channel.id)){
        console.log("message in " + message.channel.name)
        queue[message.channel.id].push(message);
        console.log(queue[message.channel.id].length)
    }
})

async function run(){
    //let pushArr = queue.slice(0, 10);

    console.log("start")
    console.time("start")

    for(let channel in queue){
        let pushArr = queue[channel].slice(0, 10);
        queue[channel] = queue[channel].slice(10);

        for(let m of pushArr){
            await m.crosspost().catch(err => {
                console.log(err)
            })
        }
    }
    console.timeEnd("start")
    //console.log(Object.keys(queue).length)
}
