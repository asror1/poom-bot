import fs from "fs";
import { TimerType } from "@types";
import { ROOT_PATH, logger, ImageAttachment } from "@utils";

export const EXPORTED_IMAGE_PATH = ROOT_PATH + "/media/exported/";
export const COMPOSED_IMAGE_PATH = ROOT_PATH + "/media/composed/";

export function getImageAttachment({
  paused = false,
  type,
  time
}: {
  type: TimerType;
  time: number;
  paused?: boolean;
}): ImageAttachment | undefined {
  const name: string = `${time}.png`;
  const url: string = `attachment://${name}`;
  const path: string = `${COMPOSED_IMAGE_PATH}${
    paused ? "paused" : "regular"
  }/${type}/${name}`;

  const image: ImageAttachment = { path, name, url };
  if (!fs.existsSync(path)) {
    logger.error(`Image ${path} does not exist`);
    return;
  }
  return image;
}
