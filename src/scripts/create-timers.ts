import sharp from "sharp";
import fs from "fs";
import { TimerType } from "src/types/TimerType";
import { Image } from "src/types/Image";
import { log, COMPOSED_TIMER_PATH, EXPORTED_IMAGE_PATH } from "src/utils";

function create(bg: string, fg: string, out: string): void {
  sharp(bg)
    .composite([
      {
        input: fg
      }
    ])
    .toFile(out, (err, info) => {
      if (err) {
        log("ERROR", err);
      } else if (info) {
        log("INFO", info);
      }
    });
}

type TimerBg = {
  type: TimerType;
  image: Image;
};
type TimerNumber = {
  path: string;
  time: number;
};

(function () {
  fs.readdir(EXPORTED_IMAGE_PATH, (err, files) => {
    if (err) {
      log("ERROR", err);
    } else {
      const backgrounds: Array<TimerBg> = [];
      const foregrounds: Array<TimerNumber> = [];
      files.forEach((file) => {
        const path: string = `${EXPORTED_IMAGE_PATH}\\${file}`;
        if (/poom\d+\.png/.test(file)) {
          const matched: RegExpMatchArray | null = file.match(/\d+/);
          if (!matched) {
            log("ERROR", `No number found in file name (${file})`);
            return;
          }
          foregrounds.push({
            path,
            time: parseInt(matched[0])
          });
        } else if (/.*timer.*/.test(file)) {
          const matched: RegExpMatchArray | null = file.match(/(work|rest)/);
          if (!matched) {
            log("ERROR", `No type found in file name (${file})`);
            return;
          }
          backgrounds.push({
            type: matched[0] as TimerType,
            image: {
              path,
              name: file
            }
          });
        }
      });
      log("INFO", `Found ${backgrounds.length} backgrounds`);
      log("INFO", `Found ${foregrounds.length} foregrounds`);
      backgrounds.forEach((bg) => {
        const dir: string = `${COMPOSED_TIMER_PATH}\\${bg.type}`;
        if (!fs.existsSync(dir)) {
          fs.mkdirSync(dir);
        }
        foregrounds.forEach((fg) => {
          const out: string = `${dir}\\final${fg.time}.png`;

          log("INFO", "Creating " + out);
          create(bg.image.path, fg.path, out);
        });
      });
    }
  });
})();
