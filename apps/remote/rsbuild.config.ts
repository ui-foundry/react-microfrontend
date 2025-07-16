import { getRsBuildConfig } from "@repo/rsb-config/rsbuid-core";
import { defineConfig } from "@rsbuild/core";

export default defineConfig(
   getRsBuildConfig(
      { server: { port: 3001 } },
      {
         moduleFederation: {
            dts: false,
            manifest: false,
            name: "remote",
            exposes: {
               "./App": "./src/App.tsx",
            },
            filename: "remote-entry.js",
         },
      },
   ),
);
