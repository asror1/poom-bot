import dotenv from "dotenv";
import fs from "fs";
import sharp from "sharp";

dotenv.config();

type TimerImageType = "work" | "break";

export class TimerImageService {
  static ROOT_PATH = __dirname + "..\\";
  static CACHE_PATH = "media\\cache\\";
  static IMAGE_PATH = "media\\exported\\";
  getTimerImage(type: TimerImageType, time: number): string {
    const filename = `${type}_final${time}.png`;
    const cachedPath = this.getPath({ cached: true, filename });
    if (this.isCached(cachedPath)) {
      return cachedPath;
    }
    const bg = this.getPath({ cached: false, filename: `poom_${type}_timer.png` });
    const fg = this.getPath({ cached: false, filename: `poom${time}.png` });
    this.composeAndCache(bg, fg, cachedPath);
    return cachedPath;
  }
  private getPath({ cached, filename }: { cached: boolean; filename: string }): string {
    return `${TimerImageService.ROOT_PATH}${
      cached ? TimerImageService.CACHE_PATH : TimerImageService.IMAGE_PATH
    }${filename}`;
  }
  private isCached(path: string): boolean {
    return fs.existsSync(path);
  }
  private composeAndCache(bg: string, fg: string, out: string): void {
    sharp(bg)
      .composite([
        {
          input: fg
        }
      ])
      .toFile(out, (err, info) => {
        if (err) {
          console.error(err);
        }
        console.log(info);
      });
  }
}
