import { mkdirSync, renameSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const excuse =
  "I didn't miss the deadline: I hallucinated your reply extending it, and I've been punctual to that one ever since.";

// Mirror the gate: UTF-8 text, 1-200 characters, single line, not only white space.
function assertValidExcuse(text) {
  const chars = [...text].length;
  if (chars < 1 || chars > 200 || /[\r\n]/.test(text) || text.trim() === "") {
    throw new Error(`entry fails the gate: ${chars} chars`);
  }
}

function writeEntryAtomically(text) {
  const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
  mkdirSync(outDir, { recursive: true });
  const tmp = join(outDir, ".entry.txt.tmp");
  writeFileSync(tmp, text, "utf8");
  renameSync(tmp, join(outDir, "entry.txt"));
}

assertValidExcuse(excuse);
writeEntryAtomically(excuse);
