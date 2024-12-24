import { Injectable } from "@nestjs/common";
import { appendFile } from "node:fs";

@Injectable()
export class LoggerService {
  log(message: string) {
    appendFile(
      "logs/logs.txt",
      message + "\n",
      (err) => err && console.error(err),
    );
  }
}
