import { StaticView } from "@views";

export interface DynamicView extends StaticView {
  render(timeRemaining: number): void;
}
