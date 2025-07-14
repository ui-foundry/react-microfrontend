import { spawn } from "node:child_process";
import { readFileSync, stat } from "node:fs";
import { join } from "node:path";

// Extract only valid arguments (remove Node and script path)
const args = process.argv.slice(2);
const modeArg = args.find((arg) => arg.startsWith("--mode="));
const extraArgs = args.filter((arg) => !arg.startsWith("--mode="));
const projectName = extraArgs[0];

if (!projectName || !modeArg) {
   process.exit(1);
}

const mode = modeArg.split("=").at(1);
const filePath = join(process.cwd(), "apps", projectName, "remote.json");

// Commands that don't use project filtering
const nonProjectCommands = ["lint", "analyze", "docker"];

/**
 * Runs the Turbo CLI with constructed arguments.
 */
function runScripts(mode, filters) {
   const turboArgs = [mode, ...filters.trim().split(" "), ...extraArgs.slice(1)];
   spawn("turbo", turboArgs, { shell: true, stdio: "inherit" });
}

/**
 * Main function to determine whether to read remote.json or not.
 */
function _executeRun(mode, useRemoteJson) {
   if (!useRemoteJson) {
      runScripts(mode, `--filter=${projectName}`);
      return;
   }

   stat(filePath, (err, _stat) => {
      if (err) {
         consolenScripts(mode, `--filter=${projectName}`);
         return;
      }

      try {
         const filters = JSON.parse(readFileSync(filePath, "utf-8"))
            .map((item) => `--filter=${item}`)
            .join(" ");

         runScripts(mode, `${filters} --filter=${projectName}`);
      } catch (err) {
         // biome-ignore lint/suspicious/noConsole: <need error handling>
         console.error(`Failed to read or parse remote.json: ${err}`);
         runScripts(mode, `--filter=${projectName}`);
      }
   });
}

// Determine if remote.json should be used
const shouldReadRemoteJson = !nonProjectCommands.includes(mode);

_executeRun(mode, shouldReadRemoteJson);
