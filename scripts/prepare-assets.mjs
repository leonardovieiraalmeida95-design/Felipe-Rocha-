import { existsSync, mkdirSync, cpSync } from "node:fs";
mkdirSync("public", { recursive: true });
for (const folder of ["assets", "img"]) if (existsSync(folder)) cpSync(folder, "public/" + folder, { recursive: true });
