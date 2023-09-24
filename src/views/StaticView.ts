import {
  ActionRowBuilder,
  ButtonBuilder,
  EmbedBuilder,
  BufferResolvable,
  InteractionReplyOptions
} from "discord.js";

export interface StaticView extends InteractionReplyOptions {
  components: ActionRowBuilder<ButtonBuilder>[];
  ephemeral: boolean;
  embeds: EmbedBuilder[];
  files: BufferResolvable[];
}
