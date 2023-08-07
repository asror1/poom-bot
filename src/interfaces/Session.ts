import { CommandInteraction, User } from "discord.js";

/**
 * @interface Session - Represents a pomodoro session
*
 * @property {User} sessionOwer - The user who started the session
 * @property {User[]} sessionMembers - The users who joined someone else's session
 * @property {CommandInteraction} interaction - The interaction that started the session
 * @property {number} intervalId - The id of the interval that is running the session
 * @property {number} workDuraiton - The duration of the work period in miliseconds
 * @property {number} breakDuration - The duration of the break period in miliseconds
 *
 */
export interface Session {
  sessionOwer: User;
  sessionMembers: User[] | null;
  interaction: CommandInteraction;
  intervalId: number | any;
  workDuraiton: number;
  breakDuration: number;
}
