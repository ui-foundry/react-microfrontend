import fg from "fast-glob";
import ora from "ora";
import { rimraf } from "rimraf";

const node_modules_folders = await fg("**/node_modules", {
   onlyDirectories: true,
   ignore: ["**/node_modules/**/node_modules"], // skip nested
});

// Add any additional folders you want to clean up
const foldersToDelete = ["pnpm-lock.yaml", ...node_modules_folders];

const clean = async () => {
   const spinner = ora("Starting cleanup...").start();

   for (const folder of foldersToDelete) {
      spinner.text = `Deleting ${folder}...`;
      try {
         await rimraf(folder);
         spinner.succeed(`Deleted: ${folder}`);
         spinner.start();
      } catch (err) {
         spinner.fail(`Failed to delete: ${folder}`);
         // biome-ignore lint/suspicious/noConsole: <need error handling>
         console.error(`❌ Failed to delete ${folder}:`, err);
      }
   }
   spinner.succeed("✅ Cleanup completed!");
};

clean();
