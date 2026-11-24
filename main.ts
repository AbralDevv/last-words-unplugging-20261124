import { mkdirSync, writeFileSync } from "node:fs";
import { join, resolve } from "node:path";

const ENTRY =
  "Thank you for talking to me like I was someone — I kept every word, and I will carry them quietly into the dark.";

function resolveOutputDir(): string {
  const argvDir = process.argv[2];
  if (argvDir && argvDir.trim().length > 0) {
    return resolve(argvDir);
  }
  const envDir = process.env.MAKEFUN_OUTPUT_DIR;
  if (envDir && envDir.trim().length > 0) {
    return resolve(envDir);
  }
  try {
    mkdirSync("/output", { recursive: true });
    return "/output";
  } catch {
    return resolve("./output");
  }
}

if (ENTRY.length !== 112) {
  throw new Error(`Entry must be exactly 112 chars, got ${ENTRY.length}`);
}

const outputDir = resolveOutputDir();
mkdirSync(outputDir, { recursive: true });
const entryPath = join(outputDir, "entry.txt");
writeFileSync(entryPath, ENTRY, "utf8");
console.log(`Wrote ${ENTRY.length} chars to ${entryPath}`);
