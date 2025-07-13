import chalk from "chalk";

const appSuccessMessage = (appName, path) => `
${chalk.green.bold(`\n✅ ${appName} App Created successfully in ${path} folder!`)}
${chalk.gray("Happy coding 🚀\n")}
`;

export default (plop) => {
   plop.setHelper("if_eq", function (a, b, options) {
      return a === b ? options.fn(this) : options.inverse(this);
   });

   plop.setGenerator("app", {
      description: "Create a new Application",
      prompts: [
         {
            type: "input",
            name: "name",
            message: "Please enter the app name:",
            validate: (input) => {
               if (!input || input.trim() === "") {
                  return "App name is required.";
               }
               return true;
            },
         },
         {
            type: "list",
            name: "type",
            message: "Please select the type of the app:",
            choices: ["host", "remote"],
            default: "remote",
         },
      ],

      actions: (data) => {
         const appName = plop.getHelper("kebabCase")(data.name);
         const destination = `apps/${appName}`;

         return [
            {
               type: "addMany",
               destination,
               base: "templates/app",
               templateFiles: "templates/app/**/*",
               globOptions: { dot: true },
            },
            () => appSuccessMessage(appName, destination),
         ];
      },
   });

   plop.setGenerator("component", {
      description: "Create a new component",
   });
};
