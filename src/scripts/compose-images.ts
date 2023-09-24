import sharp from "sharp";
import fs from "fs";
import { TimerType } from "@types";
import { logger, COMPOSED_IMAGE_PATH, EXPORTED_IMAGE_PATH, ImageAttachment } from "@utils";

function create(bg: string, fg: string, out: string): void {
  sharp(bg)
    .composite([
      {
        input: fg
      }
    ])
    .toFile(out, (err, info) => {
      if (err) {
        logger.error(err);
      } else if (info) {
        logger.debug(`${out} ${JSON.stringify(info)}`);
      }
    });
}

type TimerBg = {
  type: TimerType;
  paused: boolean;
  image: ImageAttachment;
};
type TimerNumber = {
  path: string;
  time: number;
};

(function () {
  fs.readdir(EXPORTED_IMAGE_PATH, (err, files) => {
    if (err) {
      logger.error(err);
    } else {
      const backgrounds: Array<TimerBg> = [];
      const foregrounds: Array<TimerNumber> = [];
      files.forEach((file) => {
        const path: string = `${EXPORTED_IMAGE_PATH}/${file}`;
        if (/poom\d+\.png/.test(file)) {
          const matched: RegExpMatchArray | null = file.match(/\d+/);
          if (!matched) {
            logger.error(`No number found in file name (${file})`);
            return;
          }
          foregrounds.push({
            path,
            time: parseInt(matched[0])
          });
        } else if (/.*timer.*/.test(file)) {
          const type: RegExpMatchArray | null = file.match(/(work|rest)/);
          const paused: boolean = /.*paused.*/.test(file);
          if (!type) {
            logger.error(`No type found in file name (${file})`);
            return;
          }
          backgrounds.push({
            type: type[0] as TimerType,
            image: {
              path,
              name: file,
              url: ""
            },
            paused
          });
        }
      });
      logger.info(`Found ${backgrounds.length} backgrounds`);
      logger.info(`Found ${foregrounds.length} foregrounds`);
      backgrounds.forEach((bg) => {
        const dir: string = `${COMPOSED_IMAGE_PATH}/${bg.paused ? "paused" : "regular"}/${
          bg.type
        }`;
        if (!fs.existsSync(dir)) {
          fs.mkdirSync(dir, { recursive: true });
        }
        foregrounds.forEach((fg) => {
          const out: string = `${dir}/${fg.time}.png`;

          logger.debug("Creating " + out);
          create(bg.image.path, fg.path, out);
        });
      });
      logger.info(`Created ${backgrounds.length * foregrounds.length} images`);
    }
  });
})();
