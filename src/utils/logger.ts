import fs from "fs";
import { ROOT_PATH } from "@utils";
import dotenv from "dotenv";

dotenv.config();
dotenv.config({ path: `.env.${process.argv[2]}` });

const LOG_FILE = ROOT_PATH + "log.txt";

type Severity = "ERROR" | "WARN" | "INFO" | "DEBUG";

const LOG_LEVEL: Severity = (process.env.LOG_LEVEL as Severity) || "INFO";

function log(severity: Severity, message: any) {
  if (LOG_LEVEL !== severity && LOG_LEVEL !== "DEBUG" && severity !== "ERROR") return;
  fs.appendFile(
    LOG_FILE,
    `${new Date().toISOString()} [${severity}]: ${message} \n`,
    (err) => {
      if (err) console.error(err);
    }
  );
}
export const logger = {
  error: (message: any) => log("ERROR", message),
  warn: (message: any) => log("WARN", message),
  info: (message: any) => log("INFO", message),
  debug: (message: any) => log("DEBUG", message)
};
