import { StaticView } from "./StaticView";

export interface DynamicView extends StaticView {
  render(timeRemaining: number): void;
}
