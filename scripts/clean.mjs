import fg from "fast-glob";
import ora from "ora";
import { rimraf } from "rimraf";

const folderNames = ["node_modules", ".turbo", "dist"];

const foundFolders = await Promise.all(
   folderNames.map((name) =>
      fg(`**/${name}`, {
         onlyDirectories: true,
         ignore: [`**/${name}/**/${name}`],
      }),
   ),
);

const foldersToDelete = ["pnpm-lock.yaml", ...foundFolders.flat()];

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
