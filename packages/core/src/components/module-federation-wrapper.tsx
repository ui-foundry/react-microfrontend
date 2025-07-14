import type { ReactNode } from "react";

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

/**
 * ModuleFederationWrapper is a React component that fetches the Module Federation URL
 * from a JSON file and renders the children components within a StrictMode context.
 *
 * @param {ReactNode} children - The child components to be rendered.
 */

export const ModuleFederationWrapper = async (children: ReactNode) => {
   try {
      const _mdfUrl = await fetch("/mdf-url.json");
      if (!_mdfUrl.ok) throw await _mdfUrl.json();

      const root = createRoot(document.getElementById("root") as HTMLElement);
      return root.render(<StrictMode>{children}</StrictMode>);
   } catch (error) {
      // biome-ignore lint/suspicious/noConsole: <need error handling>
      console.error("Error fetching Module Federation URL:", error);
   }
};
