import { ActionRowBuilder, ButtonBuilder, BufferResolvable, EmbedBuilder } from "discord.js";
import { StaticView, footer } from "@views";

export class FeedbackView implements StaticView {
  components: ActionRowBuilder<ButtonBuilder>[];
  ephemeral: boolean = true;
  embeds: EmbedBuilder[];
  files: BufferResolvable[];
  constructor() {
    this.components = [];
    this.files = [];
    this.embeds = [
      new EmbedBuilder()
        .setColor(0x7a4841)
        .setFields({
          name: "Submit Feedback",
          value:
            "If you have any improvement suggestions, feature requests, or if you would like to report a bug, please feel free to submit your feedback to the link above by opening up a new issue. You could use an issue template to streamline your process for submitting feedback"
        })
        .setFooter(footer)
        .setDescription("https://github.com/asror1/poom-bot/issues")
        .setURL("https://github.com/asror1/poom-bot/issues")
        .setThumbnail(
          "https://media.discordapp.net/attachments/897902979619893288/1155299689101524992/poom.png?width=864&height=864"
        )
    ];
  }
}
