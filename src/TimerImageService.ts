import dotenv from "dotenv";
import fs from "fs";
import sharp from "sharp";

dotenv.config();

export class ImageService {
  static CACHE_PATH = "media\\cache\\";
  static IMAGE_PATH = "media\\exported\\";
  getTimerImage(type: "work" | "break", time: number): string {
    const filename = `${type}_final${time}.png`;
    const cachedPath = this.getCachedPath(filename);
    if (this.isCached(cachedPath)) {
      return cachedPath;
    }
    return "";
  }
  private getCachedPath(filename: string): string {
    const rootPath = __dirname + "..\\";
    return `${rootPath}${ImageService.CACHE_PATH}${filename}`;
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
          console.log(err);
        }
        console.log(info);
      });
  }
}
