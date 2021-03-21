// SupportBot, Created by Emerald Services
// Remove User

const Discord = require("discord.js");
const fs = require("fs");

const yaml = require('js-yaml');
const supportbot = yaml.load(fs.readFileSync('./supportbot-config.yml', 'utf8'));

module.exports = {
    name: supportbot.RemoveUser,
    description: supportbot.RemoveUserDesc,

    execute(message, args) {        
        if (supportbot.DeleteMessages == "true") message.delete();
        
        console.log(`\u001b[32m`, `[${supportbot.Bot_Name}]:`, `\u001b[32m`, `${message.author.tag} has executed ${supportbot.Prefix}${supportbot.RemoveUser}!`);

        let SupportStaff = message.guild.roles.cache.find(SupportTeam => SupportTeam.name === supportbot.Staff)
        let Admins = message.guild.roles.cache.find(AdminUser => AdminUser.name === supportbot.Admin)

        const NoPerms = new Discord.MessageEmbed()
            .setTitle("Invalid Permissions!")
            .setDescription(`${supportbot.IncorrectPerms}\n\nRole Required: \`${supportbot.Staff}\` or \`${supportbot.Admin}\``)
            .setColor(supportbot.WarningColour)

            if (message.member.roles.cache.has(SupportStaff.id) || message.member.roles.cache.has(Admins.id)) {
                if (!message.channel.name.startsWith( `${supportbot.TicketChannel}-` )) {
                    const Exists = new Discord.MessageEmbed()
                        .setTitle("No Ticket Found!")
                        .setDescription(`${supportbot.NoValidTicket}`)
                        .setColor(supportbot.WarningColour);
                    message.channel.send({ embed: Exists });
        
                    return;
                }
        
                let rUser = message.guild.member(message.mentions.users.first() || message.guild.members.cache.get(args[0]));
                    const UserNotExist = new Discord.MessageEmbed()
                        .setTitle("User Not Found!")
                        .setDescription(`${supportbot.UserNotFound}\n\nTry Again:\`${supportbot.Prefix}${supportbot.RemoveUser} <user#0000>\``)
                        .setColor(supportbot.ErrorColour)
        
                    if (!rUser) return message.channel.send({ embed: UserNotExist });
                
                        message.channel.updateOverwrite(rUser, {
                            VIEW_CHANNEL: false,
                            CREATE_INVITE: false,
                            SEND_MESSAGES: false,
                            READ_MESSAGES: false
                        });
                
                    const Complete = new Discord.MessageEmbed()
                        .setTitle("User Removed!")
                        .setDescription(supportbot.RemovedUser.replace(/%user%/g, rUser.id))
                        .setTimestamp()
                        .setColor(supportbot.EmbedColour)
                   message.channel.send({ embed: Complete });
            } else {
                return message.channel.send({ embed: NoPerms });
            }

    }
};
