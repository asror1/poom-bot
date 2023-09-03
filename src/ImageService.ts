import dotenv from "dotenv";
import fs from "fs";
import sharp from "sharp";
import { Image } from "./types/Image";

dotenv.config();

type ImageType = "work" | "break";

export class ImageService {
  static ROOT_PATH = __dirname + "..\\";
  static CACHE_PATH = "media\\cache\\";
  static IMAGE_PATH = "media\\exported\\";
  getImgPath(type: ImageType, time: number): Image {
    const fileName: string = `${type}_final${time}.png`;
    const cachedPath: string = this.getPath({ cached: true, filename: fileName });
    if (this.exists(cachedPath)) {
      return {
        absolutePath: cachedPath,
        fileName
      };
    }
    const bg = this.getPath({ filename: `poom_${type}_timer.png` });
    const fg = this.getPath({ filename: `poom${time}.png` });
    this.composeImg(bg, fg, cachedPath);
    return {
      absolutePath: cachedPath,
      fileName
    };
  }
  private getPath({
    cached = false,
    filename
  }: {
    cached?: boolean;
    filename: string;
  }): string {
    return `${ImageService.ROOT_PATH}${
      cached ? ImageService.CACHE_PATH : ImageService.IMAGE_PATH
    }${filename}`;
  }
  private exists(path: string): boolean {
    return fs.existsSync(path);
  }
  private composeImg(bgImg: string, fgImg: string, outPath: string): void {
    sharp(bgImg)
      .composite([
        {
          input: fgImg
        }
      ])
      .toFile(outPath, (err, info) => {
        if (err) {
          console.error(err);
        }
        console.log(info);
      });
  }
}
