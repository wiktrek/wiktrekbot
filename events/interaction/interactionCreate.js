const client = require('../../index');
const { MessageEmbed, MessageActionRow, MessageButton } = require('discord.js');
module.exports = {
  name: 'InteractionCreateEvent',
};
client.on('interactionCreate', async (interaction) => {
  // Slash Command Handling
  if (interaction.isCommand()) {
    await interaction.deferReply({ ephemeral: false }).catch(() => {});
    const cmd = client.slashCommands.get(interaction.commandName);
    if (!cmd) {
      interaction.followUp({ content: 'this command doesnt exist! ' });
      console.log(
        `this coommand doesnt exist! (error) in ${interaction.member.guild.name}`
      );
    }
    if (!cmd) return;
    const args = [];
    for (let option of interaction.options.data) {
      if (option.type === 'SUB_COMMAND') {
        if (option.name) args.push(option.name);
        option.options?.forEach((x) => {
          if (x.value) args.push(x.value);
        });
      } else if (option.value) args.push(option.value);
    }
    interaction.member = interaction.guild.members.cache.get(
      interaction.user.id
    );

    if (!interaction.member.permissions.has(cmd.userPerm || []))
      return interaction.followUp({
        content: "You don't have perms to do that!",
      });
    cmd.run(client, interaction, args);
  }

  // Context Menu Handling
  if (interaction.isContextMenu()) {
    await interaction.deferReply({ ephemeral: false });
    const command = client.slashCommands.get(interaction.commandName);
    if (command) command.run(client, interaction);
  }

  if (interaction.isSelectMenu()) {
    if (interaction.customId !== 'reaction-roles') return;
    await interaction.deferReply({ ephemeral: true });
    const roleId = interaction.values[0];
    role = interaction.guild.roles.cache.get(roleId);
    memberRoles = interaction.member.roles;
    const HasRole = memberRoles.cache.has(roleId);

    if (HasRole) {
      memberRoles.remove(roleId);
      interaction.followUp(`${role.name} has been removed from you`);
    } else {
      memberRoles.add(roleId);
      interaction.followUp(`${role.name} has been added to you`);
    }
  }
  if (interaction.isButton()) {
    if (interaction.customId.includes('newMeme')) {
      //create an array of memes
      const config = require('../../config.json');
      const memes = config.memes;

      //create random index from 0 to the length of memes array
      var index = Math.floor(Math.random() * memes.length);

      //create new image embed
      let newMeme = new MessageEmbed().setImage(memes[index]);

      //change the embed to show the next meme
      interaction.update({ embeds: [newMeme] });
    }
  }
});
