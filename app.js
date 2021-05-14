const Discord = require('discord.js');
const { prefix, token, logChannel } = require('./config.json');
const client = new Discord.Client();
const fs = require('fs')

client.once('ready', () => {
	console.log('Logged in!');
});

client.on('message', message => {
    if(!message.content.startsWith(prefix) || message.author.bot) return;
    const args = message.content.slice(prefix.length).trim().split(/ +/);
    var output = args.join(' ');
    const command = args.shift().toLocaleLowerCase();

    if (command == 'report') {
        if (!args.length) {
            const errmsg = new Discord.MessageEmbed()
            .setColor('#eb3455')
            .setTitle('No input detected!')
            .setDescription("Usage: `!report <Cheater's Link> <Original Project's Link> <Additional Information>`")
            .setTimestamp()
            .setFooter('https://github.com/itzplayz0001');
            return message.channel.send(errmsg);
        }
        //message.delete();
        let inputMsg  = message.content.slice(prefix.length+command.toString().length).trim();

        let sorted = inputMsg.split(' ');

        if (sorted[0].length < 6) {
            message.channel.send("Missing parameters or invalid link type, please try again! (Cheater's Link)")
            return;
        } else {
            if (!sorted[0].startsWith("http")) {
                message.channel.send("The first link doesn't appear to be valid!"); return;
            }
        }

        if (sorted[1].length < 6) {
            message.channel.send("Missing parameters or invalid link type, please try again! (Origin)")
            return;
        } else {
            if (!sorted[1].startsWith("http")) {
                message.channel.send("The second link doesn't appear to be valid!"); return;
            }
        }

        let description = inputMsg.slice(sorted[0].length + sorted[1].length+2).trim();
        if (description.length < 2) {
            message.channel.send('Looks like your description is too short, try adding some extra information!')
            return;
        }
        message.channel.send(description)

        let thanks = new Discord.MessageEmbed()
        .setColor('#12ff59')
        .setTitle('Thanks for reporting!')
        .setDescription('You made our day!')
        .setFooter('https://github.com/itzplayz0001')
        .setTimestamp()

        let dm = new Discord.MessageEmbed()
        .setColor('#12ff59')
        .setTitle("Thanks for reporting, here's a confirmation!")
        .setDescription("You reported `" + sorted[0] + "` for plagiarism, according to our knowledge the original source of this project is `" + sorted[1] + "`, Here's some Additional information of what you gave us ```" + description + "```")
        .setFooter('https://github.com/itzplayz0001')
        .setTimestamp()
        
        let viewer = new Discord.MessageEmbed()
        .setColor('#12ffa4')
        .setTitle(`${message.author.tag} has just reported a team!`)
        .setDescription('`' + sorted[0]+ '` has been Plagiarised from `' + sorted[1] + '` Here\'s some Additional Information ```' + description + '```')
        .setFooter('https://github.com/itzplayz0001')
        .setTimestamp()
        message.channel.send(thanks)
        message.author.send(dm)
        // Need to send this to the logs channel 
        message.channel.send(viewer)
    }
});

client.login(token);
