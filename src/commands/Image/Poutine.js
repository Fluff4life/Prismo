const Command = require("../../abstract/command");
const DIG = require("discord-image-generation");
const { AttachmentBuilder, Message } = require("discord.js");

module.exports = class Poutine extends Command {
    constructor(...args) {
        super(...args, {
            name: "poutine",
            aliases: ["poutine"],
            description: "poutine a user",
            usage: ["poutine <user>"],
            image: "https://imgur.com/ifNAXfK",
            category: "Image",
            userPerms: ["SendMessages"],
            botPerms: ["SendMessages", "ReadMessageHistory", "AttachFiles"],
            options: [
                {
                    name: "user",
                    description: "The user to poutine",
                    type: 6,
                    required: false,
                },
            ],
        });
    }

    async run({ message, args }) {
      const user = args[0] ? await this.client.util.userQuery(args[0]) : message?.author;
      const member = await this.client.users.fetch(user);
      let avatar = member.displayAvatarURL({ size: 512, dynamic: false });
      let pngavatar = avatar.replace("webp", "png");
      const img = await new DIG.Poutine().getImage(pngavatar);
      const attach = new AttachmentBuilder(img, {name: "poutine.png"});
      let embed = this.client.util.embed()
          .setColor(this.client.config.Client.PrimaryColor)
          .setDescription(`Poutine ${member.username}`)
          .setImage("attachment://poutine.png")
      let xddata = message?.channel.send({ embeds: [embed], files: [attach] });
  }

  async exec({ interaction }) {
    const user = interaction?.options.getUser("user") || interaction?.user;
    const member = await this.client.users.fetch(user);
    let avatar = member.displayAvatarURL({ size: 512, dynamic: false });
    let pngavatar = avatar.replace("webp", "png");
    const img = await new DIG.Poutine().getImage(pngavatar);
    const attach = new AttachmentBuilder(img, {name: "poutine.png"});
    let embed = this.client.util.embed()
        .setColor(this.client.config.Client.PrimaryColor)
        .setDescription(`Poutine ${member.username}`)
        .setImage("attachment://poutine.png")
    await interaction?.deferReply();
    await interaction?.editReply({ embeds: [embed], files: [attach] });
}
};