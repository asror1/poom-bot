import {
  InteractionReplyOptions,
  APIActionRowComponent,
  APIButtonComponent,
  EmbedBuilder,
  BufferResolvable,
  ButtonBuilder,
  ButtonStyle
} from "discord.js";

const finishButton = new ButtonBuilder()
  .setCustomId("finish")
  .setLabel("Finish")
  .setEmoji("🏁")
  .setStyle(ButtonStyle.Primary);
const pauseButton = new ButtonBuilder()
  .setCustomId("pause")
  .setLabel("Pause")
  .setEmoji("✋")
  .setStyle(ButtonStyle.Danger);
const resumeButton = new ButtonBuilder()
  .setCustomId("resume")
  .setLabel("Resume")
  .setEmoji("🏃")
  .setStyle(ButtonStyle.Secondary);
export class PomodoroView implements InteractionReplyOptions {
  components?: Array<APIActionRowComponent<APIButtonComponent>>;
  ephemeral?: boolean;
  embeds?: Array<EmbedBuilder>;
  files?: Array<BufferResolvable>;

  private readonly getEmbed: (time: number) => EmbedBuilder;

  constructor({ name, color }: { name: string; color: number }) {
    this.ephemeral = true;
    const embed: EmbedBuilder = new EmbedBuilder().setColor(color);
    this.getEmbed = (time: number): EmbedBuilder => {
      return embed.setFields([
        {
          name: name,
          value: `\` ${time} ${time > 1 ? "minutes" : "minute"} \` remaining`
        }
      ]);
    };
  }
  render(time: number): void {
    if (time > 60 || time < 1) {
      throw new Error("Invalid duration, must be between 1 and 60 minutes");
    }
    //.setImage(`attachment://poom_work_${minsRemaining}.png`);

    this.components = [];
    this.ephemeral = true;
    this.embeds = [this.getEmbed(time)];
    this.files = [`media\\exported\\poom_work_${time}.png`];
  }
}
