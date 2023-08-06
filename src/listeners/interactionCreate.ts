import { CommandInteraction, Client, Interaction, ButtonInteraction } from "discord.js";
import commands from "@commands/index";
import { Maybe } from "../types/Maybe";
import { SlashCommand, Session } from "@interfaces/index";
import { FinishButton } from "@components/FinishButton";
import { SessionStore } from "@data/SessionStore";

export const interactionCreate = (client: Client): void => {
  client.on("interactionCreate", async (interaction: Interaction) => {
    if (interaction.isCommand() || interaction.isChatInputCommand()) {
      await handleSlashCommand(client, interaction);
    } else if (interaction.isButton()) {
      await handleFinishButton(client, interaction);
    }
  });
};

const handleSlashCommand = async (
  client: Client,
  interaction: CommandInteraction
): Promise<void> => {
  const slashCommand: Maybe<SlashCommand> = commands.find(
    (c) => c.name === interaction.commandName
  );

  if (!slashCommand) {
    interaction.followUp({ content: "An error has occurred" });
    return;
  }

  slashCommand.execute(client, interaction);
};
const handleFinishButton = async (
  _client: Client,
  interaction: ButtonInteraction
): Promise<void> => {
  const session: Maybe<Session> = SessionStore.get(interaction.user.id);
  if (session === undefined) return;
  FinishButton.execute(session);
};
