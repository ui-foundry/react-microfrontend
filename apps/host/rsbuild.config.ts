import { getRsBuildConfig } from "@repo/rsb-config/rsbuid-core";
import { defineConfig } from "@rsbuild/core";

export default defineConfig(
   getRsBuildConfig(
      {
         server: {
            port: 3000,
         },
      },
      {
         moduleFederation: {
            dts: false,
            manifest: false,
            name: "host",
         },
      },
   ),
);
