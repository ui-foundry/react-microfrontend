import type { ReactNode } from "react";

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router";

declare global {
   var RemoteApps: { name: string; alias: string; entry: string }[];
}

/**
 * WrapModuleFederation is a React component that fetches the Module Federation URL
 * from a JSON file and renders the children components within a StrictMode context.
 *
 * @param {ReactNode} children - The child components to be rendered.
 */

export const WrapModuleFederation = async (children: ReactNode) => {
   try {
      const mdfUrl = await fetch("/mdf-url.json");
      if (!mdfUrl.ok) throw await mdfUrl.json();

      if (!globalThis.RemoteApps) {
         globalThis.RemoteApps = await mdfUrl.json();
      }

      const root = createRoot(document.getElementById("root") as HTMLElement);
      return root.render(
         <StrictMode>
            <BrowserRouter>{children}</BrowserRouter>
         </StrictMode>,
      );
   } catch (error) {
      // biome-ignore lint/suspicious/noConsole: <need error handling>
      console.error("Error fetching Module Federation URL:", error);
   }
};
