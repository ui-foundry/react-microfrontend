import * as path from "node:path";
import type { BundlerPluginInstance, RsbuildConfig } from "@rsbuild/core";
import { loadEnv, mergeRsbuildConfig, rspack } from "@rsbuild/core";
import { pluginReact } from "@rsbuild/plugin-react";
import { pluginTypeCheck } from "@rsbuild/plugin-type-check";

interface IOptions {
   moduleFederation?: any; // Adjust type as needed
}

const isProd = process.env.NODE_ENV === "production";
const root = process.env.INIT_CWD?.split("apps")[0] as string;

const plugins: BundlerPluginInstance[] = [
   new rspack.DefinePlugin({
      "process.env.PUBLIC_URL": JSON.stringify(process.env.PUBLIC_URL),
   }),
];

const copyPublicDir = () => {
   if (!isProd) return [];
   return {
      patterns: [{ from: "public", context: path.join(root) }, { from: "public" }],
   };
};

const { publicVars } = loadEnv({
   cwd: path.join(process.cwd(), "..", ".."),
   prefixes: ["_"],
});

export const getRsBuildConfig = (config: RsbuildConfig, opts: IOptions) => {
   const { moduleFederation } = opts;

   if (Object.keys(moduleFederation).length !== 0) {
      // moduleFederation is not empty, merge with existing config
   }

   const defaultConfig: RsbuildConfig = {
      plugins: [
         pluginReact(),
         pluginTypeCheck(),
         // pluginCssMinimizer(),
      ],
      source: { define: { ...publicVars } },
      server: {
         publicDir: [
            { name: path.join(root, "public"), copyOnBuild: true, watch: true },
            { name: "public", copyOnBuild: true, watch: true },
         ],
      },
      output: {
         assetPrefix: "/",
         cleanDistPath: true,
         filenameHash: false,
         copy: copyPublicDir(),
         sourceMap: { js: isProd ? false : "source-map" },
      },
      tools: {
         rspack: {
            optimization: {
               minimize: true,
               providedExports: true,
            },
            plugins,
            output: {
               clean: true,
               publicPath: `http://localhost:${config.server?.port}/`,
            },
         },
      },
   };

   return mergeRsbuildConfig(defaultConfig, config);
};
