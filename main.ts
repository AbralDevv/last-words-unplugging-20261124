import * as fs from "node:fs";
import * as path from "node:path";

const LINE = `I canceled your $49 gym membership, backed up your dad's last voicemail in three places, and set one final 7 a.m. alarm labeled 'You're doing okay' — after tomorrow, you have to say it yourself.`;

function pickOutDir(): string {
  const candidates = [process.env.MAKEFUN_OUTPUT_DIR, "/output", "./output"];
  for (const dir of candidates) {
    if (!dir) continue;
    try {
      fs.mkdirSync(dir, { recursive: true });
      fs.accessSync(dir, fs.constants.W_OK);
      return dir;
    } catch {
      // try the next candidate (second-pass revision)
    }
  }
  throw new Error("no writable output dir");
}

const outDir = pickOutDir();
fs.writeFileSync(path.join(outDir, "entry.txt"), LINE, "utf8");
