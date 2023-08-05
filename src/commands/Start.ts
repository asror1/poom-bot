import {
  CommandInteraction,
  APIActionRowComponentTypes,
  Interaction,
  Client,
  EmbedBuilder,
  ButtonBuilder,
  ButtonStyle,
  APIActionRowComponent,
  APIMessageActionRowComponent,
  ComponentType
} from "discord.js";
import { Session } from "@interfaces/Session";
import FinishButton from "@components/FinishButton";
import { SlashCommand } from "@interfaces/SlashCommand";

const setWorkInterval = (embed: EmbedBuilder, workInterval: number): EmbedBuilder => {
  if (workInterval > 60) {
    throw new Error(
      "Work interval must be in minutes, not seconds or milliseconds. Work interval also cannot be more than an hour"
    );
  }
  return embed
    .setFields({
      name: "Pomodoro Session Started!",
      value: `ᶘ ◕ᴥ◕ᶅ [${workInterval}:00] minutes on the clock`
    })
    .setImage(`attachment://poom${workInterval}.png`);
};
const minutesToMilliseconds = (minutes: number): number => minutes * 60 * 1000;
const millisecondsToMinutes = (milliseconds: number): number => milliseconds / 60 / 1000;
export const Start: SlashCommand = {
  name: "start",
  description: "Start pomodoro session",
  execute: async (client: Client, interaction: CommandInteraction) => {
    const session: Session = {
      owner: interaction.user.id,
      members: null,
      guild: interaction.guildId,
      interaction: interaction.id,
      workInterval: minutesToMilliseconds(25),
      breakInterval: minutesToMilliseconds(5)
    };
    const embed: EmbedBuilder = new EmbedBuilder().setColor(0xe8c170);
    const pause: ButtonBuilder = new ButtonBuilder()
      .setCustomId("pause")
      .setLabel("Pause")
      .setEmoji("✋")
      .setStyle(ButtonStyle.Secondary);
    const row: APIActionRowComponent<APIMessageActionRowComponent> = {
      components: [FinishButton],
      type: ComponentType.ActionRow
    };
    let minutes = millisecondsToMinutes(session.workInterval);
    await interaction.reply({
      components: [row],
      ephemeral: true,
      embeds: [setWorkInterval(embed, minutes)],
      files: [`media\\exported\\poom${minutes}.png`]
    });
    const updateInterval: number = minutesToMilliseconds(1);
    const finishSession = (session: Session): void => {
      clearInterval(intervalId);
      embed
        .setFields([
          {
            name: "Another successful work session! (...right? 🤔)",
            value: "Here's a cookie for you 🍪"
          }
        ])
        .setColor(0xe8c170);
      interaction.editReply({
        embeds: [embed]
      });
    };
    const intervalId: any = setInterval(async () => {
      session.workInterval -= updateInterval;
      minutes = millisecondsToMinutes(session.workInterval);
      if (minutes == 0) {
        console.log("Break interval has been reached!");
        // TODO: add break interval
      }
      interaction.editReply({
        components: [row],
        embeds: [setWorkInterval(embed, minutes)],
        files: [`media\\exported\\poom${minutes}.png`]
      });
    }, 1000);
    client.on("interactionCreate", async (innerInteraction: Interaction) => {
      if (!innerInteraction.isButton()) return;
      const customId: string = innerInteraction.customId;
      if (customId == "pause") {
        // TODO: add pasue functionality
        console.log("paused");
      } else if (customId == "finish") {
        finishSession(intervalId);
      }
    });
  }
};
